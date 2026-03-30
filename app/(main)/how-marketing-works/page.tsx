import { Metadata } from "next";
import { HowMarketingWorksContent } from "./how-marketing-works-content";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "How Marketing Works | Full Funnel Strategy | CQM",
  description:
    "Learn how the marketing funnel works, why most businesses only cover half of it, and how CQM builds full funnel strategies that actually get results.",
  path: "/how-marketing-works",
  keywords: [
    "marketing funnel explained",
    "how marketing works",
    "digital marketing strategy",
    "full funnel marketing",
    "marketing agency Newburgh NY",
  ],
});

export default function HowMarketingWorksPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "How Marketing Works",
        item: `${siteConfig.url}/how-marketing-works`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HowMarketingWorksContent />
    </>
  );
}
