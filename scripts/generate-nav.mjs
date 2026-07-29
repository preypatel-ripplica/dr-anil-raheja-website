import fs from "fs";
import path from "path";

// -----------------------------------------------------------------------------
// Prebuild: fetch treatments from the CMS and write lib/nav-treatments.json,
// which lib/site.ts imports to build the "Specialities & Services" dropdown.
// Runs via the build/dev npm scripts (Node doesn't auto-load .env.local).
// -----------------------------------------------------------------------------

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([\w.]+)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const { CMS_API_URL, CMS_API_TOKEN } = process.env;
const outFile = path.join(process.cwd(), "lib", "nav-treatments.json");

// Local menu used when USE_CMS=false in .env.local (mirrors lib/site.ts data).
const localMenu = [
  { label: "Hip Replacement Surgery", href: "/hip-replacement-surgery" },
  { label: "Knee Replacement Surgery", href: "/knee-replacement-surgery" },
  { label: "Spine Surgery", href: "/spine-surgery" },
  { label: "Arthroscopic Surgery", href: "/arthroscopic-surgery" },
  { label: "Arthritis Treatment", href: "/arthritis-treatment" },
];

async function main() {
  if (process.env.USE_CMS === "false") {
    fs.writeFileSync(outFile, JSON.stringify(localMenu, null, 2) + "\n");
    console.log("USE_CMS=false — nav-treatments.json written from local menu");
    return;
  }
  let items = [];
  try {
    const res = await fetch(`${CMS_API_URL}/api/content.entries.list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ collection_slug: "treatments", page_size: 100 }),
    });
    if (res.ok) {
      const data = await res.json();
      const entries = Array.isArray(data) ? data : data.entries || data.data || data.items || [];
      items = entries
        .map((item) => {
          const e = item.entry || item;
          if (!e?.slug || !e?.title) return null;
          // menu label: explicit `short` field if set, else title without the SEO tail
          const label = e.short || e.title.replace(/\s+in\s+Delhi\s*$/i, "");
          return { label, href: `/${e.slug}`, order: Number(e.order) || 0 };
        })
        .filter(Boolean)
        .sort((a, b) => a.order - b.order)
        .map(({ label, href }) => ({ label, href }));
    }
  } catch {
    // CMS unreachable — keep whatever nav-treatments.json already exists
  }

  if (items.length) {
    fs.writeFileSync(outFile, JSON.stringify(items, null, 2) + "\n");
    console.log(`nav-treatments.json written: ${items.length} treatment(s)`);
  } else {
    console.warn("nav-treatments.json NOT updated (CMS empty or unreachable)");
  }
}

main();