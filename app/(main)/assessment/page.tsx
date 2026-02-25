import { buildPageMetadata } from "@/lib/seo";
import { MarketingAssessment } from "@/components/assessment/marketing-assessment";

export const metadata = buildPageMetadata({
  title: "Marketing Assessment",
  description:
    "Take our free marketing assessment to find out how your business marketing stacks up. Get a personalized score and recommendations.",
  path: "/assessment",
});

export default function AssessmentPage() {
  return <MarketingAssessment />;
}
