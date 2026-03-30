import { Metadata } from "next";
import { HowMarketingWorksContent } from "./how-marketing-works-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "How Marketing Works | The Marketing Funnel Explained | Creative Quality Marketing",
  description:
    "Learn how the marketing funnel works, why most businesses only cover half of it, and how CQM builds full funnel strategies that actually get results.",
  path: "/how-marketing-works",
  keywords: [
    "marketing funnel explained",
    "how marketing works",
    "digital marketing strategy",
    "full funnel marketing",
    "marketing agency Newburgh NY",
  ],
});

export default function HowMarketingWorksPage() {
  return <HowMarketingWorksContent />;
}
