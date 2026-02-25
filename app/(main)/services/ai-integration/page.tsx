import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AiIntServiceContent } from "./ai-int-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Agent & AI Integration | Creative Quality Marketing",
  description:
    "Agent and AI integration services for embedding practical AI assistants into day-to-day business workflows.",
  path: "/services/ai-integration",
  keywords: ["AI agents for business", "AI assistant integration", "AI workflow integration"],
});

export default function AiIntegrationPage() {
  return <AiIntServiceContent />;
}
