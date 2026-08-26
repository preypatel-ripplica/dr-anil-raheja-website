import fs from "fs";
import path from "path";
import { getCollectionEntries, loadEnv, treatmentsCollectionSlug } from "./cms-prebuild.mjs";

// -----------------------------------------------------------------------------
// Prebuild: fetch treatments from the CMS and write lib/nav-treatments.json,
// which lib/site.ts imports to build the "Specialities & Services" dropdown.
// Runs via the build/dev npm scripts (Node doesn't auto-load .env.local).
// -----------------------------------------------------------------------------

const outFile = path.join(process.cwd(), "lib", "nav-treatments.json");
const hiddenTreatments = new Set();

async function main() {
  loadEnv();
  if (process.env.USE_CMS === "false") throw new Error("USE_CMS=false is not allowed for treatment navigation");
  if (!process.env.CMS_API_URL || !(process.env.CMS_ACCESS_TOKEN || process.env.CMS_API_TOKEN)) {
    throw new Error("CMS_API_URL and CMS_ACCESS_TOKEN are required for treatment navigation");
  }
  let items = [];
  const entries = await getCollectionEntries(treatmentsCollectionSlug);
  if (!entries.length) throw new Error(`CMS collection "${treatmentsCollectionSlug}" has no entries`);

  items = entries
    .map((item) => {
      const e = item.entry || item;
      if (!e?.slug || !e?.title || hiddenTreatments.has(e.slug)) return null;
      const label = e.short || e.title.replace(/\s+in\s+Delhi\s*$/i, "");
      return { label, href: `/treatment/${e.slug}`, order: Number(e.order) || 0 };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)
    .map(({ label, href }) => ({ label, href }));
  if (!items.length) throw new Error(`CMS collection "${treatmentsCollectionSlug}" did not contain valid nav entries`);

  fs.writeFileSync(outFile, JSON.stringify(items, null, 2) + "\n");
  console.log(`nav-treatments.json written from CMS "${treatmentsCollectionSlug}": ${items.length} treatment(s)`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
