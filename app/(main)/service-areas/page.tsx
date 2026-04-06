import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ServiceAreasContent } from "./service-areas-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Service Areas | Marketing Agency | Hudson Valley NY",
  description:
    "Creative Quality Marketing serves businesses in Newburgh, Beacon, Poughkeepsie, Middletown, and across the Hudson Valley. Digital marketing, SEO, web design, and more.",
  path: "/service-areas",
  keywords: [
    "marketing agency Newburgh NY",
    "digital marketing Hudson Valley",
    "SEO services Orange County NY",
    "web design Dutchess County",
    "marketing agency near me",
    "social media marketing Ulster County",
    "advertising agency Middletown NY",
    "marketing company Beacon NY",
    "digital marketing Poughkeepsie NY",
    "marketing agency Rockland County",
  ],
});

export default function ServiceAreasPage() {
  return <ServiceAreasContent />;
}
