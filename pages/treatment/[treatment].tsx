import type { GetStaticPaths, GetStaticProps } from "next";
import TreatmentPage from "../[treatment]";
import { getTreatments, getTreatment } from "@/lib/cms";
import type { TreatmentContent } from "@/lib/treatmentContent";

export const getStaticPaths: GetStaticPaths = async () => {
  const treatments = await getTreatments();
  return {
    paths: Object.keys(treatments).map((treatment) => ({ params: { treatment } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ content: TreatmentContent }> = async ({ params }) => {
  const slug = typeof params?.treatment === "string" ? params.treatment : "";
  const content = await getTreatment(slug);
  if (!content) return { notFound: true };
  return { props: { content } };
};

export default TreatmentPage;
