import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PaidAdsServiceContent } from "./paid-ads-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Paid Ads Management | CQM",
  description:
    "Paid ads strategy and management for Google, Meta, and LinkedIn focused on efficient lead generation and ROI. Serving Newburgh NY and the Hudson Valley.",
  path: "/services/paid-ads",
  keywords: [
    "paid ads Newburgh NY",
    "Google Ads agency Hudson Valley",
    "PPC management near me",
    "hire paid ads agency",
    "Meta ads management",
    "Facebook ads agency Hudson Valley",
    "small business PPC services",
    "Google Ads management Newburgh",
    "paid advertising agency near me",
    "LinkedIn ads management",
  ],
});

export default function PaidAdsServicePage() {
  return <PaidAdsServiceContent />;
}
