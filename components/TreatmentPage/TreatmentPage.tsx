import Head from "next/head";
import TreatmentLayout from "@/components/TreatmentLayout/TreatmentLayout";
import type { TreatmentContent } from "@/lib/treatmentContent";
import type { Treatment } from "@/lib/site";
import {
  breadcrumbSchema,
  canonicalUrl,
  faqSchema,
  jsonLd,
  treatmentSchema,
} from "@/lib/seo";
import { treatmentHref } from "@/lib/site";

export default function TreatmentPage({ content, treatments = [] }: { content: TreatmentContent; treatments?: Treatment[] }) {
  return (
    <>
      <Head>
        <title>{content.seoTitle || content.title}</title>
        <meta name="description" content={content.metaDescription || content.subtitle} />
        {content.keywords && <meta name="keywords" content={content.keywords} />}
        <link rel="canonical" href={canonicalUrl(content.canonicalPath || treatmentHref(content.slug))} />
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
      <TreatmentLayout content={content} treatments={treatments} />
    </>
  );
}
