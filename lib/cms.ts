import fs from "fs";
import path from "path";
import { articles as localArticles, type Article, type Block } from "@/lib/blog";
import {
  treatmentContent as localTreatments,
  type TreatmentContent,
  type Section,
} from "@/lib/treatmentContent";
import { featureVideos as localFeatured, shorts as localShorts } from "@/lib/content";

// -----------------------------------------------------------------------------
// Build-time CMS client — the CMS is the single source of truth.
// Only entries that exist in the CMS are rendered; nothing falls back to the
// hardcoded lib/ data. Runs only inside getStaticProps/getStaticPaths (Node).
//
// Toggle: set USE_CMS=false in .env.local to serve everything from the local
// hardcoded lib/ data instead of the CMS (no other changes needed).
// -----------------------------------------------------------------------------

const USE_CMS = process.env.USE_CMS !== "false";
const CMS_API_URL = process.env.CMS_API_URL;
const CMS_API_TOKEN = process.env.CMS_API_TOKEN;

async function cmsPost(endpoint: string, body: object): Promise<any | null> {
  if (!CMS_API_URL || !CMS_API_TOKEN) return null;
  try {
    const res = await fetch(`${CMS_API_URL}/api/${endpoint}`, {
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

async function fetchCollection(slug: string): Promise<any[]> {
  if (collectionCache.has(slug)) return collectionCache.get(slug)!;
  const data = await cmsPost("content.entries.list", { collection_slug: slug, page_size: 100 });
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
  const media = await cmsPost("content.media.get", { media_id: mediaId });
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
  if (field.name) {
    // `name` may be a bare filename or a full path like "/images/foo.png";
    // match on the basename so either form resolves to /public/images.
    const base = path.basename(field.name);
    if (base && fs.existsSync(path.join(process.cwd(), "public", "images", base))) {
      return `/images/${base}`;
    }
  }
  return fallback;
}

/** Strip undefined values so results are safe to pass through getStaticProps. */
function jsonClean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// ------------------------------- blogs ---------------------------------------

function normalizeBlocks(raw: any[]): Block[] {
  const blocks: Block[] = [];
  for (const b of raw || []) {
    if (!b || typeof b.type !== "string") continue;
    if (b.type === "list") blocks.push({ type: "list", items: (b.items || []).filter(Boolean) });
    else if (b.type === "lead" || b.type === "p" || b.type === "h")
      blocks.push({ type: b.type, text: b.text || "" });
  }
  return blocks;
}

/** Blog articles — CMS entries only, newest first. */
export async function getArticles(): Promise<Article[]> {
  if (!USE_CMS) return jsonClean(localArticles);
  const entries = await fetchCollection("blogs");
  const articles: Article[] = [];

  for (const item of entries) {
    const e = item.entry || item;
    if (!e?.slug || !e?.title) continue;
    articles.push({
      slug: e.slug,
      title: e.title,
      excerpt: e.excerpt || "",
      image: await resolveImage(e.hero_image),
      category: e.category || "",
      date: e.date || e.published || item.published_at || "",
      readMins: Number(e.readMins) || 5,
      source: e.source || "",
      related: e.related || "",
      body: normalizeBlocks(e.body),
      selfCheck: e.selfCheck?.items?.length ? e.selfCheck : undefined,
      seoTitle: e.seoTitle || e.title,
      metaDescription: e.metaDescription || e.excerpt || "",
    });
  }

  return jsonClean(articles.sort((x, y) => (y.date || "").localeCompare(x.date || "")));
}

// ----------------------------- treatments ------------------------------------

async function mapTreatment(item: any): Promise<TreatmentContent | null> {
  const e = item.entry || item;
  if (!e?.slug || !e?.title) return null;

  const sections: Section[] = [];
  for (const s of e.sections || []) {
    if (!s || typeof s.type !== "string") continue;
    if (s.type === "text") {
      sections.push({ type: "text", heading: s.heading || "", paragraphs: s.paragraphs || [] });
    } else if (s.type === "list") {
      sections.push({
        type: "list",
        heading: s.heading || "",
        ...(s.intro ? { intro: s.intro } : {}),
        items: s.items || [],
      });
    } else if (s.type === "imageText") {
      sections.push({
        type: "imageText",
        heading: s.heading || "",
        paragraphs: s.paragraphs || [],
        image: await resolveImage(s.image),
        imageSide: s.imageSide === "left" ? "left" : "right",
      });
    } else if (s.type === "cta") {
      sections.push({ type: "cta", heading: s.heading || "", text: s.text || "" });
    }
  }

  return {
    slug: e.slug,
    title: e.title,
    subtitle: e.subtitle || "",
    heroImage: await resolveImage(e.hero_image),
    facts: (e.facts || []).filter((f: any) => f?.label && f?.value),
    sections,
    faqs: e.faqs || [],
    seoTitle: e.seoTitle || e.title,
    metaDescription: e.metaDescription || e.subtitle || "",
  };
}

/** Treatment pages keyed by slug — CMS entries only. */
export async function getTreatments(): Promise<Record<string, TreatmentContent>> {
  if (!USE_CMS) return jsonClean(localTreatments);
  const entries = await fetchCollection("treatments");
  const result: Record<string, TreatmentContent> = {};
  for (const item of entries) {
    const t = await mapTreatment(item);
    if (t) result[t.slug] = t;
  }
  return jsonClean(result);
}

/** Returns null when the treatment has no CMS entry — the page then 404s. */
export async function getTreatment(slug: string): Promise<TreatmentContent | null> {
  return (await getTreatments())[slug] ?? null;
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