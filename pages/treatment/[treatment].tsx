import type { GetStaticPaths, GetStaticProps } from "next";
import TreatmentPage from "@/components/TreatmentPage/TreatmentPage";
import { getTreatments, getTreatment, getTreatmentSummaries } from "@/lib/cms";
import type { TreatmentContent } from "@/lib/treatmentContent";
import type { Treatment } from "@/lib/site";

export const getStaticPaths: GetStaticPaths = async () => {
  const treatments = await getTreatments();
  return {
    paths: Object.keys(treatments).map((treatment) => ({ params: { treatment } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ content: TreatmentContent; treatments: Treatment[] }> = async ({ params }) => {
  const slug = typeof params?.treatment === "string" ? params.treatment : "";
  const [content, treatments] = await Promise.all([getTreatment(slug), getTreatmentSummaries()]);
  if (!content) return { notFound: true };
  return { props: { content, treatments } };
};

export default TreatmentPage;
