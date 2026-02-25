import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ProcessContent } from "./process-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Process | Creative Quality Marketing",
  description:
    "A clear, AI-enhanced marketing process built for execution, optimization, and measurable growth.",
  path: "/process",
  keywords: ["marketing process", "agency workflow", "AI marketing framework"],
});

export default function ProcessPage() {
  return <ProcessContent />;
}
