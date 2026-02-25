import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { StudioContent } from "./studio-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Podcast & Content Production Studio | Creative Quality Marketing",
  description:
    "Full-service podcast and video production studio. We shoot, edit, and distribute your content to major platforms including Spotify, Apple Podcasts, and YouTube.",
  path: "/studio",
  keywords: ["podcast studio Newburgh", "content production studio", "video podcast production"],
});

/**
 * Studio Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function StudioPage() {
  return <StudioContent />;
}
