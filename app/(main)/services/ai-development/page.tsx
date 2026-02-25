import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AiDevServiceContent } from "./ai-dev-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Development & Automation | Creative Quality Marketing",
  description:
    "AI development and automation services to reduce manual work, improve consistency, and scale operations.",
  path: "/services/ai-development",
  keywords: ["AI automation agency", "workflow automation", "AI systems implementation"],
});

export default function AiDevelopmentPage() {
  return <AiDevServiceContent />;
}
