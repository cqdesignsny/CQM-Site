import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AboutContent } from "./about-content";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Creative Quality Marketing",
  description:
    "Meet the Creative Quality Marketing team, our story, core values, and AI-powered approach to growth.",
  path: "/about",
  keywords: ["about creative quality marketing", "marketing agency team", "agency core values"],
});

/**
 * About Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function AboutPage() {
  return <AboutContent />;
}
