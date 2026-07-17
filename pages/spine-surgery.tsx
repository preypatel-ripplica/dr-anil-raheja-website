import type { Metadata } from "next";
import TreatmentLayout from "@/components/TreatmentLayout/TreatmentLayout";
import { treatmentContent } from "@/lib/treatmentContent";

const content = treatmentContent["spine-surgery"];

export const metadata: Metadata = {
  title: content.title,
  description: content.subtitle,
};

export default function Page() {
  return <TreatmentLayout content={content} />;
}
