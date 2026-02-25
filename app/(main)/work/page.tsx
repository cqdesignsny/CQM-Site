import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { WorkContent } from "./work-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies | Creative Quality Marketing",
  description:
    "See how Creative Quality Marketing helps brands grow through AI-powered digital marketing and content production.",
  path: "/work",
  keywords: ["marketing case studies", "client work", "digital marketing results"],
});

/**
 * Work/Case Studies Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function WorkPage() {
  return <WorkContent />;
}
