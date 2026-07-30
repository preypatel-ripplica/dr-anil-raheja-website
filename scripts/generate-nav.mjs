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
const hiddenTreatments = new Set(["knee-arthroscopy", "shoulder-arthroscopy"]);

// Local menu used when USE_CMS=false in .env.local (mirrors lib/site.ts data).
const localMenu = [
  { label: "Hip Replacement Surgery", href: "/treatment/hip-replacement-surgery" },
  { label: "Knee Replacement Surgery", href: "/treatment/knee-replacement-surgery" },
  { label: "Spine Surgery", href: "/treatment/spine-surgery" },
  { label: "Arthroscopic Surgery", href: "/treatment/arthroscopic-surgery" },
  { label: "Arthritis Treatment", href: "/treatment/arthritis-treatment" },
  { label: "Partial Knee Replacement", href: "/treatment/partial-knee-replacement" },
  { label: "Sports Injury & Conservative Care", href: "/treatment/sports-injury-conservative-care" },
  { label: "Fracture & Trauma Treatment", href: "/treatment/fracture-trauma-treatment" },
];

const apiBase = () => {
  if (!CMS_API_URL) return "";
  try {
    return new URL(CMS_API_URL).origin;
  } catch {
    return CMS_API_URL.replace(/\/$/, "");
  }
};

async function cmsPost(endpoint, body = {}) {
  if (!CMS_API_URL || !CMS_API_TOKEN) return null;
  const res = await fetch(`${apiBase()}/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CMS_API_TOKEN}`,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) return null;
  return res.json();
}

function writeLocalMenu(reason) {
  fs.writeFileSync(outFile, JSON.stringify(localMenu, null, 2) + "\n");
  console.warn(`${reason} — nav-treatments.json written from local menu`);
}

async function main() {
  if (process.env.USE_CMS === "false") {
    writeLocalMenu("USE_CMS=false");
    return;
  }
  let items = [];
  try {
    const user = await cmsPost("user.me");
    const userId = user?.user_id ?? user?.id;
    const collections = await cmsPost("collection.list", userId ? { user_id: userId } : {});
    const treatmentCollection = Array.isArray(collections)
      ? collections.find((c) => c.slug === "treatments" || c.collection_slug === "treatments" || c.name === "treatments")
      : null;
    const collectionId = treatmentCollection?.collection_id ?? treatmentCollection?.id;
    if (collectionId) {
      const data = await cmsPost("entry.list", { collection_id: collectionId });
      const entries = Array.isArray(data) ? data : data?.entries || data?.data || data?.items || [];
      items = entries
        .map((item) => {
          const e = item.entry || item;
          if (!e?.slug || !e?.title || hiddenTreatments.has(e.slug)) return null;
          // menu label: explicit `short` field if set, else title without the SEO tail
          const label = e.short || e.title.replace(/\s+in\s+Delhi\s*$/i, "");
          return { label, href: `/treatment/${e.slug}`, order: Number(e.order) || 0 };
        })
        .filter(Boolean)
        .sort((a, b) => a.order - b.order)
        .map(({ label, href }) => ({ label, href }));
    }
  } catch {
    // Fall through to local menu.
  }

  if (items.length) {
    fs.writeFileSync(outFile, JSON.stringify(items, null, 2) + "\n");
    console.log(`nav-treatments.json written: ${items.length} treatment(s)`);
  } else {
    writeLocalMenu("CMS empty or unreachable");
  }
}

main();
