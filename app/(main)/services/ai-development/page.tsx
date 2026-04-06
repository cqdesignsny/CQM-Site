import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AiDevServiceContent } from "./ai-dev-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Development & Automation | CQM",
  description:
    "AI development and automation services to reduce manual work, improve consistency, and scale operations. Serving Newburgh NY and the Hudson Valley.",
  path: "/services/ai-development",
  keywords: [
    "AI development Newburgh NY",
    "AI automation agency Hudson Valley",
    "AI services near me",
    "hire AI developer",
    "workflow automation agency",
    "business AI automation",
    "AI systems implementation",
    "small business AI solutions",
    "AI development company near me",
    "custom AI automation services",
  ],
});

export default function AiDevelopmentPage() {
  return <AiDevServiceContent />;
}
