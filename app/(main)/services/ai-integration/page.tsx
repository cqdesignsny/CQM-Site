import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AiIntServiceContent } from "./ai-int-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Integration Services | CQM",
  description:
    "Agent and AI integration services for embedding practical AI assistants into day-to-day business workflows. Serving Newburgh NY and the Hudson Valley.",
  path: "/services/ai-integration",
  keywords: [
    "AI integration Newburgh NY",
    "AI agent services Hudson Valley",
    "AI integration agency near me",
    "hire AI integration company",
    "AI assistant for business",
    "AI workflow integration",
    "business AI agents",
    "AI chatbot integration",
    "small business AI integration",
    "AI consulting services near me",
  ],
});

export default function AiIntegrationPage() {
  return <AiIntServiceContent />;
}
