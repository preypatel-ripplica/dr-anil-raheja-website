import TreatmentPage from "@/pages/[treatment]";
import { treatmentContent } from "@/lib/treatmentContent";

const content = treatmentContent["sports-injury-conservative-care"];

export default function Page() {
  return <TreatmentPage content={content} />;
}
