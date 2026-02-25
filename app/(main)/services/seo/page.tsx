import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SeoServiceContent } from "./seo-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "SEO Services | Creative Quality Marketing",
  description:
    "Technical, local, and content-focused SEO services to increase qualified traffic and long-term search visibility.",
  path: "/services/seo",
  keywords: ["local SEO agency", "technical SEO", "search engine optimization"],
});

export default function SeoServicePage() {
  return <SeoServiceContent />;
}
