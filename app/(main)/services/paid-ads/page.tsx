import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PaidAdsServiceContent } from "./paid-ads-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Paid Ads Services | Creative Quality Marketing",
  description:
    "Paid ads strategy and management for Google, Meta, and LinkedIn focused on efficient lead generation and ROI.",
  path: "/services/paid-ads",
  keywords: ["Google Ads management", "Meta ads agency", "PPC services"],
});

export default function PaidAdsServicePage() {
  return <PaidAdsServiceContent />;
}
