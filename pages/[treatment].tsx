import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import TreatmentLayout from "@/components/TreatmentLayout/TreatmentLayout";
import type { TreatmentContent } from "@/lib/treatmentContent";
import { getTreatment, getTreatments } from "@/lib/cms";

// One route for every treatment in the CMS, so adding a treatment there gives it
// a page automatically — no new file needed. Static routes (/about-us, /blogs …)
// still take precedence over this dynamic segment.
export const getStaticPaths: GetStaticPaths = async () => {
  const treatments = await getTreatments();
  return {
    paths: Object.keys(treatments).map((treatment) => ({ params: { treatment } })),
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
      </Head>
      <TreatmentLayout content={content} />
    </>
  );
}
