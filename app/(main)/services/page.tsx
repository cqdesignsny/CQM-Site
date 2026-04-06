import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesContent } from "./services-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Digital Marketing Services | CQM",
  description:
    "AI-powered digital marketing services including websites, SEO, paid ads, social media, email, video, and AI integration. Serving Newburgh NY and the Hudson Valley.",
  path: "/services",
  keywords: [
    "digital marketing services Newburgh NY",
    "marketing agency Hudson Valley",
    "digital marketing agency near me",
    "hire marketing agency Newburgh",
    "small business marketing services",
    "AI marketing agency",
    "full service marketing company",
    "web and SEO services Hudson Valley",
    "marketing company near me",
    "affordable marketing agency Newburgh NY",
  ],
});

/**
 * Services Hub Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function ServicesPage() {
  return <ServicesContent />;
}
