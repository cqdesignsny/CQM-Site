import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SEO Services | Creative Quality Marketing",
  description:
    "Technical, local, and content-focused SEO services to increase qualified traffic and long-term search visibility.",
  path: "/services/seo",
  keywords: ["local SEO agency", "technical SEO", "search engine optimization"],
});

export default function SeoServicePage() {
  return (
    <ServicePageTemplate
      serviceName="SEO"
      headline="SEO That Drives Qualified Traffic, Not Guesswork"
      description="We combine technical fixes, local visibility, and content strategy into a focused roadmap that compounds over time."
      path="/services/seo"
      highlights={[
        "Technical + Local SEO",
        "Monthly Priorities and Reporting",
        "AI-Assisted Research with Human Strategy",
      ]}
      outcomes={[
        "Higher local and organic visibility",
        "Improved rankings for high-intent keywords",
        "More qualified traffic from search",
        "Stronger technical site health",
        "Content that matches user intent",
        "Sustainable long-term growth",
      ]}
      deliverables={[
        {
          title: "Foundation & Strategy",
          description:
            "We identify the biggest ranking opportunities and build a practical plan.",
          items: [
            "Technical + on-page SEO audit",
            "Keyword and intent mapping",
            "Site architecture and internal linking recommendations",
            "Google Business Profile and local profile optimization",
          ],
        },
        {
          title: "Execution & Iteration",
          description:
            "We prioritize and implement what moves visibility and conversions.",
          items: [
            "Priority fix implementation support",
            "Page optimization and content briefs",
            "Backlink profile monitoring",
            "Monthly reporting with next-step priorities",
          ],
        },
      ]}
      processSteps={[
        {
          step: "Audit & Baseline",
          description:
            "We analyze your current rankings, page health, competitors, and local visibility baseline.",
        },
        {
          step: "Roadmap Build",
          description:
            "We sequence technical, on-page, and content priorities by impact and effort.",
        },
        {
          step: "Monthly Execution",
          description:
            "We implement in focused sprints and keep improvements aligned to measurable goals.",
        },
        {
          step: "Reporting & Refinement",
          description:
            "You get clear reporting, insight into wins, and updated priorities every cycle.",
        },
      ]}
      tiers={[
        {
          name: "Local Focus",
          price: "Starting at $750/mo",
          description: "Best for single-location and service-area businesses",
          features: [
            "Foundational SEO audit",
            "Local optimization support",
            "Monthly optimization cycles",
            "Performance reporting",
          ],
        },
        {
          name: "Growth",
          price: "Starting at $1,500/mo",
          description: "Best for teams ready to scale search visibility",
          features: [
            "Technical + on-page optimization",
            "Content strategy and page updates",
            "Keyword movement tracking",
            "Monthly strategic review",
          ],
        },
        {
          name: "Scale",
          price: "Starting at $3,000/mo",
          description: "Best for complex sites and multi-market expansion",
          features: [
            "Advanced SEO roadmap",
            "Multi-location strategy support",
            "Executive-level reporting",
            "Priority implementation support",
          ],
        },
      ]}
      faqs={[
        {
          question: "How soon should we expect SEO results?",
          answer:
            "Most businesses see early movement in 2-3 months, with stronger compounding gains between months 4-6 and beyond.",
        },
        {
          question: "Do you handle local SEO and Google Business Profile?",
          answer:
            "Yes. Local SEO is a core part of our process, including GBP optimization and location-focused page strategy.",
        },
        {
          question: "Can SEO work alongside paid ads?",
          answer:
            "Yes. Paid ads can capture short-term demand while SEO builds long-term visibility and lower-cost acquisition.",
        },
        {
          question: "Do you provide SEO content strategy too?",
          answer:
            "Yes. We provide content mapping, briefs, and page optimization guidance tied to intent and business goals.",
        },
      ]}
    />
  );
}
