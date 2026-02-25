import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ResourcesContent } from "./resources-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources | Creative Quality Marketing",
  description:
    "Marketing guides, checklists, and AI-first frameworks to help your business grow.",
  path: "/resources",
  keywords: ["marketing resources", "AI marketing guides", "affiliate marketing tools"],
});

/**
 * Resources Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function ResourcesPage() {
  return <ResourcesContent />;
}
