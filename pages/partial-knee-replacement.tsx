import TreatmentPage from "@/pages/[treatment]";
import { treatmentContent } from "@/lib/treatmentContent";

const content = treatmentContent["partial-knee-replacement"];

export default function Page() {
  return <TreatmentPage content={content} />;
}
