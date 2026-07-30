import TreatmentPage from "@/pages/[treatment]";
import { treatmentContent } from "@/lib/treatmentContent";

const content = treatmentContent["fracture-trauma-treatment"];

export default function Page() {
  return <TreatmentPage content={content} />;
}
