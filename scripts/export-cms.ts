import fs from "fs";
import path from "path";
import { treatmentContent } from "@/lib/treatmentContent";

// Explicit nav/display order for the treatments collection.
const order: Record<string, number> = {
  "hip-replacement-surgery": 1,
  "knee-replacement-surgery": 2,
  "partial-knee-replacement": 3,
  "spine-surgery": 4,
  "arthroscopic-surgery": 5,
  "knee-arthroscopy": 6,
  "shoulder-arthroscopy": 7,
  "sports-injury-conservative-care": 8,
  "fracture-trauma-treatment": 9,
  "arthritis-treatment": 10,
};

// menu label (matches the "short" used in code)
const short: Record<string, string> = {
  "hip-replacement-surgery": "Hip Replacement",
  "knee-replacement-surgery": "Knee Replacement",
  "partial-knee-replacement": "Partial Knee",
  "spine-surgery": "Spine Surgery",
  "arthroscopic-surgery": "Arthroscopy",
  "knee-arthroscopy": "Knee Arthroscopy",
  "shoulder-arthroscopy": "Shoulder Arthroscopy",
  "sports-injury-conservative-care": "Sports Injury",
  "fracture-trauma-treatment": "Fracture & Trauma",
  "arthritis-treatment": "Arthritis Care",
};

const outDir = path.join(process.cwd(), "cms-import");
fs.mkdirSync(outDir, { recursive: true });

// Every image becomes a { media_id, name, alt_text } object. media_id is left
// blank for the editor to fill after picking the image in the CMS; the source
// path is written into `name` so the image is easy to locate.
const img = (srcPath: string, alt: string) => ({
  media_id: "",
  name: srcPath,
  alt_text: alt,
});

for (const [slug, t] of Object.entries(treatmentContent)) {
  const sections = t.sections.map((s) =>
    s.type === "imageText"
      ? { ...s, image: img(s.image, s.heading) }
      : s
  );

  const entry = {
    id: slug,
    slug: t.slug,
    short: short[slug] ?? "",
    order: order[slug] ?? 99,
    title: t.title,
    subtitle: t.subtitle,
    seoTitle: (t as { seoTitle?: string }).seoTitle ?? t.title,
    metaDescription: (t as { metaDescription?: string }).metaDescription ?? t.subtitle,
    hero_image: img(t.heroImage, t.title),
    facts: t.facts,
    sections,
    faqs: t.faqs ?? [],
  };
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(entry, null, 2) + "\n");
}
console.log("Wrote " + Object.keys(treatmentContent).length + " entries to cms-import/");
