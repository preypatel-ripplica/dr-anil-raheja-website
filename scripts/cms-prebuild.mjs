import fs from "fs";
import path from "path";

export const treatmentsCollectionSlug = "treatment-new";
export const blogsCollectionSlug = "blogs-new";

export function loadEnv() {
  for (const envFile of [".env", ".env.local"]) {
    const envPath = path.join(process.cwd(), envFile);
    if (!fs.existsSync(envPath)) continue;
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const m = line.match(/^([\w.]+)\s*=\s*(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  }
}

function apiBase() {
  const { CMS_API_URL } = process.env;
  if (!CMS_API_URL) return "";
  try {
    return new URL(CMS_API_URL).origin;
  } catch {
    return CMS_API_URL.replace(/\/$/, "");
  }
}

export async function cmsPost(endpoint, body = {}) {
  const { CMS_API_URL } = process.env;
  const token = process.env.CMS_API_TOKEN;
  if (!CMS_API_URL || !token) return null;
  try {
    const res = await fetch(`${apiBase()}/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function entriesFrom(data) {
  return Array.isArray(data) ? data : data?.entries || data?.data || data?.items || [];
}

export async function getCollectionEntries(slug) {
  const data = await cmsPost("content.entries.list", { collection_slug: slug, page_size: 100 });
  if (!data) throw new Error(`CMS collection "${slug}" not found or CMS request failed`);
  return entriesFrom(data);
}
