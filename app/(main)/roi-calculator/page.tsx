import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ROICalculatorContent } from "./roi-calculator-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Marketing ROI Calculator | Creative Quality Marketing",
  description:
    "Find out how much you should be spending on marketing and what kind of return to expect. Free ROI calculator with industry benchmarks for restaurants, beauty, home services, e-commerce, and more.",
  path: "/roi-calculator",
  keywords: [
    "marketing ROI calculator",
    "marketing budget calculator",
    "cost per acquisition",
    "marketing spend calculator",
    "small business marketing budget",
  ],
});

export default function ROICalculatorPage() {
  return <ROICalculatorContent />;
}
