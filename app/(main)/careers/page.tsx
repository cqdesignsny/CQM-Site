import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CareersContent } from "./careers-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers | Creative Quality Marketing",
  description:
    "Explore careers at Creative Quality Marketing. Join an AI-forward team building measurable growth for client brands.",
  path: "/careers",
  keywords: ["marketing careers", "creative agency jobs", "AI marketing team"],
});

/**
 * Careers Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function CareersPage() {
  return <CareersContent />;
}
