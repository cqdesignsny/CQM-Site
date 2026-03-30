import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ROICalculatorContent } from "./roi-calculator-content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Marketing ROI Calculator | Free Budget Tool | CQM",
  description:
    "Find out how much you should spend on marketing and what return to expect. Free ROI calculator with industry benchmarks for 12 industries.",
  path: "/roi-calculator",
  keywords: [
    "marketing ROI calculator",
    "marketing budget calculator",
    "cost per acquisition",
    "marketing spend calculator",
    "small business marketing budget",
  ],
});

export default function ROICalculatorPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing ROI Calculator",
    url: `${siteConfig.url}/roi-calculator`,
    description:
      "Free marketing ROI calculator with industry benchmarks. Calculates budget breakdown, cost per acquisition, and expected return for 12 industries.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

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
        name: "Marketing ROI Calculator",
        item: `${siteConfig.url}/roi-calculator`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ROICalculatorContent />
    </>
  );
}
