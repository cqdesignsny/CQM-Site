import { buildPageMetadata } from "@/lib/seo";
import { MarketingAssessment } from "@/components/assessment/marketing-assessment";

export const metadata = buildPageMetadata({
  title: "Free Marketing Assessment | Grade Your Marketing | CQM",
  description:
    "Take our free 10 question marketing assessment. Get your score, find gaps in your funnel, and see exactly what to fix first.",
  path: "/assessment",
  keywords: [
    "free marketing assessment",
    "marketing quiz",
    "marketing funnel assessment",
    "marketing score",
    "digital marketing audit",
  ],
});

export default function AssessmentPage() {
  return <MarketingAssessment />;
}
