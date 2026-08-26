import fs from "fs";
import path from "path";
import { blogsCollectionSlug, getCollectionEntries, loadEnv, treatmentsCollectionSlug } from "./cms-prebuild.mjs";

const siteUrl = "https://www.dranilraheja.com";
const locales = ["en", "hi", "ar", "ru"];
const defaultLocale = "en";

const fixedRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about-us", changefreq: "monthly", priority: "0.8" },
  { path: "/contact-us", changefreq: "monthly", priority: "0.8" },
  { path: "/blogs", changefreq: "weekly", priority: "0.7" },
  { path: "/photo-gallery", changefreq: "monthly", priority: "0.5" },
  { path: "/our-videos", changefreq: "monthly", priority: "0.5" },
  { path: "/patient-testimonials", changefreq: "monthly", priority: "0.6" },
];

function localize(route, locale) {
  if (locale === defaultLocale) return route;
  return route === "/" ? `/${locale}` : `/${locale}${route}`;
}

function absolute(route) {
  return `${siteUrl}${route}`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function entry(route, locale) {
  const alternates = locales
    .map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(absolute(localize(route.path, locale)))}" />`)
    .join("\n");
  return [
    "  <url>",
    `    <loc>${escapeXml(absolute(localize(route.path, locale)))}</loc>`,
    alternates,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(route.path))}" />`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

async function main() {
  loadEnv();
  if (process.env.USE_CMS === "false") throw new Error("USE_CMS=false is not allowed for sitemap generation");

  const [blogEntries, treatmentEntries] = await Promise.all([
    getCollectionEntries(blogsCollectionSlug),
    getCollectionEntries(treatmentsCollectionSlug),
  ]);

  const blogRoutes = blogEntries
    .map((item) => item.entry || item)
    .filter((entry) => entry?.slug)
    .map((blog) => ({
      path: `/blogs/${blog.slug}`,
      changefreq: "monthly",
      priority: "0.6",
    }));

  const treatmentRoutes = treatmentEntries
    .map((item) => item.entry || item)
    .filter((entry) => entry?.slug)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .map((treatment) => ({
      path: `/treatment/${treatment.slug}`,
      changefreq: "monthly",
      priority: "0.9",
    }));

  const routes = [...fixedRoutes, ...treatmentRoutes, ...blogRoutes];
  const localizedEntries = routes.flatMap((route) => locales.map((locale) => entry(route, locale)));
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    localizedEntries.join("\n"),
    "</urlset>",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
  console.log(`sitemap.xml written: ${localizedEntries.length} URL(s) from ${routes.length} CMS/static route(s)`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
