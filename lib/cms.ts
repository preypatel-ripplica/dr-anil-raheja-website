import fs from "fs";
import path from "path";
import { articles as localArticles, type Article, type Block } from "@/lib/blog";
import {
  type TreatmentContent,
  type Section,
  type TreatmentPlanner,
} from "@/lib/treatmentContent";
import { featureVideos as localFeatured, shorts as localShorts } from "@/lib/content";
import type { Treatment } from "@/lib/site";

// -----------------------------------------------------------------------------
// Build-time CMS client — the CMS is the single source of truth.
// Only entries that exist in the CMS are rendered; nothing falls back to the
// hardcoded lib/ data. Runs only inside getStaticProps/getStaticPaths (Node).
//
// Treatment pages must come from the CMS. If the CMS is unavailable or the
// treatment collection is empty, build/dev should fail instead of rendering old
// local content.
// -----------------------------------------------------------------------------

const USE_CMS = process.env.USE_CMS !== "false";
const CMS_API_URL = process.env.CMS_API_URL;
const CMS_API_TOKEN = process.env.CMS_ACCESS_TOKEN || process.env.CMS_API_TOKEN;
const TREATMENTS_COLLECTION_SLUG = "treatment-new";
const BLOGS_COLLECTION_SLUG = "blogs-new";
const HIDDEN_TREATMENTS = new Set<string>();

function apiBase(): string {
  if (!CMS_API_URL) return "";
  try {
    return new URL(CMS_API_URL).origin;
  } catch {
    return CMS_API_URL.replace(/\/$/, "");
  }
}

async function cmsPost(endpoint: string, body: object): Promise<any | null> {
  if (!CMS_API_URL || !CMS_API_TOKEN) return null;
  const endpointMap: Record<string, string> = {
    "content.entries.list": "entry.list",
    "content.media.get": "media.list",
  };
  const apiEndpoint = endpointMap[endpoint] ?? endpoint;
  try {
    const res = await fetch(`${apiBase()}/api/${apiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const collectionCache = new Map<string, any[]>();
const cmsCollectionsCache = new Map<string, any[]>();

async function getCmsUser(): Promise<any | null> {
  return cmsPost("user.me", {});
}

async function getCmsCollections(): Promise<any[]> {
  if (cmsCollectionsCache.has("all")) return cmsCollectionsCache.get("all")!;
  const user = await getCmsUser();
  const userId = user?.user_id ?? user?.id;
  const collections = await cmsPost("collection.list", userId ? { user_id: userId } : {});
  const list = Array.isArray(collections) ? collections : [];
  cmsCollectionsCache.set("all", list);
  return list;
}

async function fetchCollection(slug: string): Promise<any[]> {
  if (collectionCache.has(slug)) return collectionCache.get(slug)!;
  const collections = await getCmsCollections();
  const collection = collections.find((c) => c.slug === slug || c.collection_slug === slug || c.name === slug);
  const collectionId = collection?.collection_id ?? collection?.id;
  const data = collectionId
    ? await cmsPost("entry.list", { collection_id: collectionId })
    : await cmsPost("content.entries.list", { collection_slug: slug, page_size: 100 });
  const entries =
    data == null ? [] : Array.isArray(data) ? data : data.entries || data.data || data.items || [];
  collectionCache.set(slug, entries);
  return entries;
}

// ------------------------------- media ---------------------------------------

async function downloadTo(url: string, absPath: string): Promise<boolean> {
  try {
    const res = await fetch(url, { headers: { "ngrok-skip-browser-warning": "true" } });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
    fs.writeFileSync(absPath, buf);
    return true;
  } catch {
    return false;
  }
}

const mediaCache = new Map<string, string | null>();

/** Resolve a CMS media_id to a local /public path, downloading it at build time. */
async function mediaToLocalPath(mediaId: string): Promise<string | null> {
  if (mediaCache.has(mediaId)) return mediaCache.get(mediaId) ?? null;
  let result: string | null = null;
  const user = await getCmsUser();
  const userId = user?.user_id ?? user?.id;
  const mediaList = await cmsPost("media.list", userId ? { user_id: userId } : {});
  const media = Array.isArray(mediaList)
    ? mediaList.find((m) => m.media_id === mediaId || m.id === mediaId)
    : null;
  if (media) {
    const ext = path.extname(media.filename || media.name || "") || ".jpg";
    const localPath = `/cms-images/${mediaId}${ext}`;
    const absPath = path.join(process.cwd(), "public", "cms-images", `${mediaId}${ext}`);
    if (fs.existsSync(absPath)) {
      result = localPath;
    } else {
      const signedUrl = media.download_url ?? media.preview_url ?? media.url;
      if (signedUrl && (await downloadTo(signedUrl, absPath))) result = localPath;
    }
  }
  mediaCache.set(mediaId, result);
  return result;
}

type CmsImage = { media_id?: string; name?: string; alt_text?: string } | string | null | undefined;

/**
 * CMS image field -> local image path. If the media_id is missing or the
 * download fails, falls back to a same-named file in /public/images so a
 * half-filled entry never produces a broken image.
 */
async function resolveImage(field: CmsImage, fallback = ""): Promise<string> {
  if (!field) return fallback;
  if (typeof field === "string") return field || fallback;
  if (field.media_id) {
    const local = await mediaToLocalPath(field.media_id);
    if (local) return local;
  }
  if (field.name && fs.existsSync(path.join(process.cwd(), "public", "images", field.name))) {
    return `/images/${field.name}`;
  }
  return fallback;
}

/** Strip undefined values so results are safe to pass through getStaticProps. */
function jsonClean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function visibleTreatments(source: Record<string, TreatmentContent>): Record<string, TreatmentContent> {
  return Object.fromEntries(Object.entries(source).filter(([slug]) => !HIDDEN_TREATMENTS.has(slug)));
}

// ------------------------------- blogs ---------------------------------------

function normalizeBlocks(raw: any[]): Block[] {
  const blocks: Block[] = [];
  for (const b of raw || []) {
    if (typeof b === "string") {
      if (b.trim()) blocks.push({ type: "p", text: b });
      continue;
    }
    if (!b || typeof b.type !== "string") continue;
    if (b.type === "list") blocks.push({ type: "list", items: (b.items || []).filter(Boolean) });
    else if (b.type === "lead" || b.type === "p" || b.type === "h")
      blocks.push({ type: b.type, text: b.text || "" });
  }
  return blocks;
}

function normalizeArticleBlocks(entry: any): Block[] {
  if (Array.isArray(entry.body) && entry.body.length) return normalizeBlocks(entry.body);

  const blocks: Block[] = [];
  const intro = entry.content?.intro || entry.intro;
  if (intro) blocks.push({ type: "lead", text: intro });

  for (const block of entry.content?.blocks || []) {
    if (!block) continue;
    const heading = block.heading || block.title || "";
    if (heading) blocks.push({ type: "h", text: heading });

    for (const paragraph of block.paragraphs || []) {
      if (paragraph) blocks.push({ type: "p", text: paragraph });
    }

    const listItems = block.list?.items || block.items || [];
    if (listItems.length) blocks.push({ type: "list", items: listItems.filter(Boolean) });
  }

  return blocks;
}

function relatedTreatmentSlug(entry: any): string {
  if (entry.related) return entry.related;
  const firstTreatmentHref = entry.internalLinks?.treatments?.find((link: any) => link?.href)?.href || "";
  const slug = firstTreatmentHref.split("/").filter(Boolean).pop();
  return slug || "";
}

function normalizeFaqs(raw: any[]): { q: string; a: string }[] {
  return (raw || [])
    .map((faq) => {
      const question = faq?.q || faq?.question || "";
      const answer = faq?.a || faq?.answer || "";
      const text = Array.isArray(answer) ? answer.filter(Boolean).join("\n\n") : answer;
      return question && text ? { q: question, a: text } : null;
    })
    .filter(Boolean) as { q: string; a: string }[];
}

/** Blog articles — CMS entries only, newest first. */
export async function getArticles(): Promise<Article[]> {
  if (!USE_CMS) return jsonClean(localArticles);
  const entries = await fetchCollection(BLOGS_COLLECTION_SLUG);
  if (!entries.length) throw new Error(`CMS collection "${BLOGS_COLLECTION_SLUG}" is empty or unavailable`);
  const articles: Article[] = [];

  for (const item of entries) {
    const e = item.entry || item;
    if (!e?.slug || !e?.title) continue;
    articles.push({
      slug: e.slug,
      title: e.title,
      excerpt: e.excerpt || "",
      image: await resolveImage(e.hero_image || e.heroImage || e.image, "/images/optimized/blog-thr-1200.jpg"),
      category: e.category || "",
      date: e.date || e.publishedAt || e.published || item.published_at || "",
      readMins: Number(e.readMins || e.readingTime || String(e.readTime || "").match(/\d+/)?.[0]) || 5,
      source: e.source || e.canonicalPath || "",
      related: relatedTreatmentSlug(e),
      body: normalizeArticleBlocks(e),
      faqs: normalizeFaqs(e.faqs),
      selfCheck: e.selfCheck?.items?.length ? e.selfCheck : undefined,
      seoTitle: e.seoTitle || e.title,
      metaDescription: e.metaDescription || e.excerpt || "",
    });
  }

  if (!articles.length) throw new Error(`CMS collection "${BLOGS_COLLECTION_SLUG}" has no valid blog entries`);
  return jsonClean(articles.sort((x, y) => (y.date || "").localeCompare(x.date || "")));
}

// ----------------------------- treatments ------------------------------------

async function mapTreatment(item: any): Promise<TreatmentContent | null> {
  const e = item.entry || item;
  if (!e?.slug || !e?.title) return null;

  const sections: Section[] = [];
  const contentImage = await resolveImage(e.content_image || e.contentImage);
  const rawSections = e.sections || e.content?.blocks || [];
  for (const s of rawSections) {
    if (!s || typeof s.type !== "string") continue;
    if (s.type === "image") {
      if (contentImage) {
        sections.push({
          type: "image",
          heading: s.heading || "",
          image: contentImage,
          alt: e.content_image?.alt_text || e.contentImage?.alt_text || e.title,
        });
      }
    } else if (s.type === "section" || s.type === "text") {
      if (s.list?.items?.length) {
        sections.push({
          type: "list",
          heading: s.heading || "",
          intro: (s.paragraphs || []).join("\n\n"),
          items: s.list.items || [],
        });
      } else {
        sections.push({ type: "text", heading: s.heading || "", paragraphs: s.paragraphs || [] });
      }
    } else if (s.type === "list") {
      sections.push({
        type: "list",
        heading: s.heading || "",
        ...(s.intro ? { intro: s.intro } : {}),
        items: s.items || s.list?.items || [],
      });
    } else if (s.type === "imageText") {
      sections.push({
        type: "imageText",
        heading: s.heading || "",
        paragraphs: s.paragraphs || [],
        image: await resolveImage(s.image),
        imageSide: s.imageSide === "left" ? "left" : "right",
      });
    }
  }

  const planner = e.treatmentPlanner as TreatmentPlanner | undefined;

  return {
    id: e.id,
    slug: e.slug,
    short: e.short,
    order: Number(e.order) || 0,
    title: e.title,
    description: e.description,
    canonicalPath: e.canonicalPath,
    category: e.category,
    readTime: e.readTime,
    excerpt: e.excerpt,
    author: e.author,
    authorImage: await resolveImage(e.authorImage, e.authorImage || ""),
    publishedAt: e.publishedAt,
    publishedLabel: e.publishedLabel,
    subtitle: e.subtitle || e.heroSubtitle || e.excerpt || e.description || "",
    heroImage: await resolveImage(e.hero_image || e.heroImage),
    heroAlt: e.hero_image?.alt_text || e.heroAlt || e.bannerAlt,
    contentImage,
    contentImageAlt: e.content_image?.alt_text || e.contentImage?.alt_text,
    cardAlt: e.cardAlt,
    bannerAlt: e.bannerAlt,
    tags: e.tags || [],
    facts: (e.facts || []).filter((f: any) => f?.label && f?.value),
    sections,
    faqs: normalizeFaqs(e.faqs),
    treatmentPlanner: planner?.steps?.length ? planner : undefined,
    seoTitle: e.seoTitle || e.title,
    metaDescription: e.metaDescription || e.description || e.heroSubtitle || e.subtitle || "",
    keywords: e.keywords,
  };
}

/** Treatment pages keyed by slug. CMS is required; no local fallback. */
export async function getTreatments(): Promise<Record<string, TreatmentContent>> {
  if (!USE_CMS) throw new Error("USE_CMS=false is not allowed for treatments.");
  if (!CMS_API_URL || !CMS_API_TOKEN) throw new Error("CMS_API_URL and CMS_ACCESS_TOKEN are required for treatments.");
  const entries = await fetchCollection(TREATMENTS_COLLECTION_SLUG);
  if (!entries.length) throw new Error(`CMS collection "${TREATMENTS_COLLECTION_SLUG}" has no treatment entries.`);
  const result: Record<string, TreatmentContent> = {};
  for (const item of entries) {
    const t = await mapTreatment(item);
    if (t && !HIDDEN_TREATMENTS.has(t.slug)) result[t.slug] = t;
  }
  if (!Object.keys(result).length) throw new Error(`CMS collection "${TREATMENTS_COLLECTION_SLUG}" did not contain valid treatment entries.`);
  return jsonClean(visibleTreatments(result));
}

/** Returns null when the treatment has no CMS entry — the page then 404s. */
export async function getTreatment(slug: string): Promise<TreatmentContent | null> {
  return (await getTreatments())[slug] ?? null;
}

export async function getTreatmentSummaries(): Promise<Treatment[]> {
  const treatments = Object.values(await getTreatments()).sort((a, b) => (a.order || 0) - (b.order || 0));
  return treatments.map((t) => ({
    slug: t.slug,
    title: t.title,
    short: t.short || t.title.replace(/\s+in\s+Delhi\s*$/i, ""),
    excerpt: t.excerpt || t.description || t.subtitle,
    image: t.heroImage,
  }));
}

// ------------------------------- videos --------------------------------------

export type VideoItem = { id: string; title: string };

function youtubeId(input: string): string | null {
  if (!input) return null;
  const s = String(input).trim();
  if (/^[\w-]{6,20}$/.test(s)) return s;
  const m = s.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,20})/);
  return m ? m[1] : null;
}

/** VideoCard renders /images/yt/<id>.jpg — fetch the YouTube thumb for new videos. */
async function ensureThumb(id: string): Promise<void> {
  const abs = path.join(process.cwd(), "public", "images", "yt", `${id}.jpg`);
  if (fs.existsSync(abs)) return;
  for (const q of ["hqdefault", "mqdefault", "0"]) {
    if (await downloadTo(`https://i.ytimg.com/vi/${id}/${q}.jpg`, abs)) return;
  }
}

/** Videos — CMS entries only, split into featured and shorts, sorted by order. */
export async function getVideos(): Promise<{ featured: VideoItem[]; shorts: VideoItem[] }> {
  if (!USE_CMS) {
    return {
      featured: localFeatured.map((id) => ({ id, title: "Dr. Anil Raheja video" })),
      shorts: localShorts.map((id) => ({ id, title: "Dr. Anil Raheja short" })),
    };
  }
  const entries = await fetchCollection("video");
  const featured: (VideoItem & { order: number })[] = [];
  const shorts: (VideoItem & { order: number })[] = [];

  for (const item of entries) {
    const e = item.entry || item;
    const id = youtubeId(e?.videoUrl || e?.videoId || "");
    if (!id) continue;
    const isShort = e.kind === "short" || (!e.kind && /\/shorts\//.test(e.videoUrl || ""));
    (isShort ? shorts : featured).push({
      id,
      title: e.title || (isShort ? "Dr. Anil Raheja short" : "Dr. Anil Raheja video"),
      order: Number(e.order) || 0,
    });
  }

  featured.sort((a, b) => a.order - b.order);
  shorts.sort((a, b) => a.order - b.order);

  const result = {
    featured: featured.map(({ id, title }) => ({ id, title })),
    shorts: shorts.map(({ id, title }) => ({ id, title })),
  };

  await Promise.all([...result.featured, ...result.shorts].map((v) => ensureThumb(v.id)));
  return result;
}
