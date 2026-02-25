import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PricingContent } from "./pricing-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing | Creative Quality Marketing",
  description:
    "Flexible growth plans from Creative Quality Marketing, including AI-powered strategy and execution support.",
  path: "/pricing",
  keywords: ["marketing pricing plans", "agency pricing", "digital marketing retainer"],
});

/**
 * Pricing Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function PricingPage() {
  return <PricingContent />;
}
