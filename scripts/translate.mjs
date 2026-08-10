import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const memoryFile = path.join(root, ".cache", "translation-memory.json");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const refresh = args.includes("--refresh");
const scopeArg = args.find((arg) => arg.startsWith("--scope="));
const scopes = new Set((scopeArg?.split("=")[1] || "shared-ui,home,about,blog,treatments").split(","));
const localeArg = args.find((arg) => arg.startsWith("--locale="));
const locales = (localeArg ? [localeArg.split("=")[1]] : ["hi", "ar", "ru"]).filter((locale) => ["hi", "ar", "ru"].includes(locale));
const languageNames = { hi: "Hindi", ar: "Arabic", ru: "Russian" };
function collectFiles(directory, result = []) {
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) collectFiles(relative, result);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) result.push(relative);
  }
  return result;
}

const sourceFiles = [
  ...collectFiles("components").map((file) => ["shared-ui", file]),
  ...collectFiles("pages").map((file) => [
    file.includes("blogs") ? "blog" : file.includes("about-us") ? "about" : file.includes("treatment") || file.includes("[treatment]") ? "treatments" : "home",
    file,
  ]),
  ["home", "lib/content.ts"],
  ["shared-ui", "lib/site.ts"],
  ["blog", "lib/blog.ts"],
  ["treatments", "lib/treatmentContent.ts"],
];

function normalize(value) { return String(value).replace(/\s+/g, " ").trim(); }
function key(value) { return crypto.createHash("sha256").update(normalize(value)).digest("hex").slice(0, 16); }
function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}
loadEnv(path.join(root, ".env.local"));
loadEnv(path.join(root, ".env"));

const memory = fs.existsSync(memoryFile) ? JSON.parse(fs.readFileSync(memoryFile, "utf8")) : {};
const strings = new Map();
function addString(value, scope) {
  const normalized = normalize(value);
  if (!normalized || normalized.length < 3) return;
  if (/^(?:https?:|mailto:|tel:|\/?(?:images|cms-images|blogs|treatment)\/|[\w-]+\.(?:png|jpg|jpeg|svg|webp))/.test(normalized)) return;
  if (/^[+\d\s,().-]+$/.test(normalized) || /@[\w.-]+\.[A-Za-z]{2,}/.test(normalized)) return;
  if (/[{}<>]/.test(normalized)) return;
  strings.set(normalized, scope);
}

function collectStaticStrings(content, scope) {
  for (const match of content.matchAll(/(["'])([^\n]*?)\1/g)) {
    const value = match[2].replace(/\\(["'])/g, "$1");
    const before = content.slice(Math.max(0, match.index - 80), match.index);
    if (/\b(?:t|d|label|title|subtitle|description|excerpt|heading|prompt|text|q|a|note|intro|helper|question|name|value|items|outcomes|bring):\s*$/.test(before)) addString(value, scope);
    else if (/\s/.test(value) && !/[\/\\]/.test(value)) addString(value, scope);
  }
}

for (const [scope, relative] of sourceFiles) {
  if (!scopes.has(scope)) continue;
  const content = fs.readFileSync(path.join(root, relative), "utf8");
  for (const match of content.matchAll(/>([^<>]{2,})<|(?:title|description|subtitle|excerpt|heading|label|prompt|text|q|a|note|intro|helper|question):\s*(["'])([^\n]*?)\2/g)) {
    const value = normalize((match[1] || match[3] || "").replace(/\{[^{}]*\}/g, ""));
    if (value && !/[{}<>]/.test(value) && !/^[A-Za-z_][\w.-]*\//.test(value)) strings.set(value, scope);
  }
  collectStaticStrings(content, scope);
}

async function collectCmsStrings() {
  if (!process.env.CMS_API_URL || !process.env.CMS_API_TOKEN) return;
  const base = (() => { try { return new URL(process.env.CMS_API_URL).origin; } catch { return process.env.CMS_API_URL.replace(/\/$/, ""); } })();
  const post = async (endpoint, body) => {
    const mapped = endpoint === "content.entries.list" ? "entry.list" : endpoint;
    const response = await fetch(`${base}/api/${mapped}`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${process.env.CMS_API_TOKEN}`, "ngrok-skip-browser-warning": "true" },
      body: JSON.stringify(body),
    });
    if (!response.ok) return null;
    return response.json();
  };
  const user = await post("user.me", {});
  const userId = user?.user_id ?? user?.id;
  const collections = await post("collection.list", userId ? { user_id: userId } : {});
  for (const collectionName of ["blogs", "treatments", "video"]) {
    const collection = (Array.isArray(collections) ? collections : []).find((item) => item.slug === collectionName || item.collection_slug === collectionName || item.name === collectionName);
    const collectionId = collection?.collection_id ?? collection?.id;
    const data = collectionId ? await post("entry.list", { collection_id: collectionId }) : await post("content.entries.list", { collection_slug: collectionName, page_size: 100 });
    const entries = Array.isArray(data) ? data : data?.entries || data?.data || data?.items || [];
    const scope = collectionName === "blogs" ? "blog" : collectionName === "treatments" ? "treatments" : "shared-ui";
    const walk = (value, keyName = "") => {
      if (typeof value === "string") {
        if (!/^(?:slug|id|url|href|image|media|date|published|readmins|readingtime)$/i.test(keyName)) addString(value, scope);
      } else if (Array.isArray(value)) value.forEach((item) => walk(item, keyName));
      else if (value && typeof value === "object") Object.entries(value).forEach(([key, item]) => walk(item, key));
    };
    entries.forEach((entry) => walk(entry));
  }
}

await collectCmsStrings();

const missing = [];
for (const [english, scope] of strings) {
  const entry = memory[key(english)] || { en: english };
  memory[key(english)] = entry;
  for (const locale of locales) if (refresh || !entry[locale]) missing.push({ english, scope, locale });
}

const byLocale = Object.groupBy ? Object.groupBy(missing, (item) => item.locale) : locales.reduce((all, locale) => ({ ...all, [locale]: missing.filter((item) => item.locale === locale) }), {});
for (const locale of locales) {
  const items = byLocale[locale] || [];
  const relevant = items.filter((item) => scopes.has(item.scope));
  console.log(`${languageNames[locale]}: ${relevant.length} missing strings`);
}

if (dryRun) {
  console.log(`Dry run complete. Missing translations: ${missing.length}`);
  process.exit(missing.length ? 1 : 0);
}

if (!missing.length) {
  fs.mkdirSync(path.dirname(memoryFile), { recursive: true });
  fs.writeFileSync(memoryFile, `${JSON.stringify(memory, null, 2)}\n`);
  console.log("Translation memory is complete.");
  process.exit(0);
}

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is required to generate missing translations. Use --dry-run to inspect coverage.");
  process.exit(1);
}

const model = process.env.GEMINI_TRANSLATION_MODEL || process.env.GEMINI_MODEL || "gemini-2.5-flash";
const batchSize = Number(process.env.TRANSLATION_BATCH_SIZE || 40);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestGemini(prompt) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (response.ok) return response.json();
    const errorText = await response.text();
    if (response.status !== 429 || attempt === 4) throw new Error(`Gemini request failed: ${response.status} ${errorText}`);
    const retrySeconds = Number(errorText.match(/retryDelay.*?(\d+)s/)?.[1] || 45);
    console.log(`Gemini quota reached; waiting ${retrySeconds}s before retrying.`);
    await sleep((retrySeconds + 2) * 1000);
  }
}

for (const locale of locales) {
  const items = (byLocale[locale] || []).filter((item) => scopes.has(item.scope));
  for (let index = 0; index < items.length; index += batchSize) {
    const batch = items.slice(index, index + batchSize);
    const prompt = `You are a professional native ${languageNames[locale]} translator for a medical website in India. Translate each English string into natural, fluent ${languageNames[locale]} that a real patient would understand. Do not translate word-for-word or produce awkward machine-like phrasing.\n\nReturn only a JSON array of strings with exactly the same item count and order. Preserve the meaning, tone, punctuation, line-break intent, and any inline spacing. Keep doctor names, hospital/brand names, URLs, slugs, IDs, email addresses, phone numbers, medical abbreviations such as DAA, and all numbers and units unchanged. Never move a plus sign before a number: 25,000+ must remain 25,000+. Do not add Markdown, HTML, explanations, or quotation marks.\n\n${JSON.stringify(batch.map((item) => item.english))}`;
    const body = await requestGemini(prompt);
    const raw = body.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const translations = JSON.parse(raw.replace(/^```json\s*|\s*```$/g, ""));
    if (!Array.isArray(translations) || translations.length !== batch.length) throw new Error("Gemini returned an unexpected translation count");
    batch.forEach((item, itemIndex) => { memory[key(item.english)][locale] = String(translations[itemIndex]); });
    fs.mkdirSync(path.dirname(memoryFile), { recursive: true });
    fs.writeFileSync(memoryFile, `${JSON.stringify(memory, null, 2)}\n`);
    console.log(`Saved ${locale} batch ${index + 1}-${index + batch.length}`);
  }
}
