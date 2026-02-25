import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesContent } from "./services-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Services | Creative Quality Marketing",
  description:
    "AI-powered digital marketing services including websites, SEO, paid ads, social media, email, video, and AI integration.",
  path: "/services",
  keywords: ["digital marketing services", "AI marketing services", "agency services"],
});

/**
 * Services Hub Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function ServicesPage() {
  return <ServicesContent />;
}
