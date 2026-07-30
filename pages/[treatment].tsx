import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import TreatmentLayout from "@/components/TreatmentLayout/TreatmentLayout";
import type { TreatmentContent } from "@/lib/treatmentContent";
import { getTreatment, getTreatments } from "@/lib/cms";
import {
  breadcrumbSchema,
  canonicalUrl,
  faqSchema,
  jsonLd,
  treatmentSchema,
} from "@/lib/seo";
import { treatmentHref } from "@/lib/site";

const staticTreatmentPages = new Set([
  "partial-knee-replacement",
  "sports-injury-conservative-care",
  "fracture-trauma-treatment",
]);

// One route for every treatment in the CMS, so adding a treatment there gives it
// a page automatically — no new file needed. Static routes (/about-us, /blogs …)
// still take precedence over this dynamic segment.
export const getStaticPaths: GetStaticPaths = async () => {
  const treatments = await getTreatments();
  return {
    paths: Object.keys(treatments)
      .filter((treatment) => !staticTreatmentPages.has(treatment))
      .map((treatment) => ({ params: { treatment } })),
    // `output: "export"` requires every path to be known at build time.
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ content: TreatmentContent }> = async ({ params }) => {
  const slug = typeof params?.treatment === "string" ? params.treatment : "";
  const content = await getTreatment(slug);
  if (!content) return { notFound: true };
  return { props: { content } };
};

export default function TreatmentPage({ content }: { content: TreatmentContent }) {
  return (
    <>
      <Head>
        <title>{content.seoTitle || content.title}</title>
        <meta name="description" content={content.metaDescription || content.subtitle} />
        <link rel="canonical" href={canonicalUrl(treatmentHref(content.slug))} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([
              treatmentSchema(content),
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Treatments", path: "/" },
                { name: content.title, path: treatmentHref(content.slug) },
              ]),
              faqSchema(content.faqs),
            ].filter(Boolean) as object[]),
          }}
        />
      </Head>
      <TreatmentLayout content={content} />
    </>
  );
}
