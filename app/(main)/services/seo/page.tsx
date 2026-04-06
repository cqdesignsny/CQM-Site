import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SeoServiceContent } from "./seo-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "SEO Services | CQM",
  description:
    "Technical, local, and content-focused SEO services to increase qualified traffic and long-term search visibility. Serving Newburgh NY and the Hudson Valley.",
  path: "/services/seo",
  keywords: [
    "SEO services Newburgh NY",
    "SEO agency Hudson Valley",
    "local SEO services near me",
    "small business SEO",
    "SEO company near me",
    "hire SEO agency",
    "technical SEO services",
    "Google ranking help Newburgh",
    "search engine optimization Hudson Valley",
    "affordable SEO for small business",
  ],
});

export default function SeoServicePage() {
  return <SeoServiceContent />;
}
