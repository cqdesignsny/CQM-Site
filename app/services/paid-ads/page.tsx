import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Paid Ads Services | Creative Quality Marketing",
  description:
    "Paid ads strategy and management for Google, Meta, and LinkedIn focused on efficient lead generation and ROI.",
  path: "/services/paid-ads",
  keywords: ["Google Ads management", "Meta ads agency", "PPC services"],
});

export default function PaidAdsServicePage() {
  return (
    <ServicePageTemplate
      serviceName="Paid Ads"
      headline="Paid Ads That Convert Into Real Pipeline"
      description="We build and optimize paid campaigns with clear tracking, disciplined testing, and budget decisions tied to qualified leads."
      path="/services/paid-ads"
      highlights={[
        "Google + Meta + LinkedIn",
        "Tracking-First Campaign Setup",
        "Weekly Optimization Loops",
      ]}
      outcomes={[
        "Faster lead generation from paid channels",
        "Lower cost per qualified lead over time",
        "Improved audience quality and targeting",
        "Clearer attribution and conversion tracking",
        "Better landing page conversion support",
        "Reliable month-over-month performance insights",
      ]}
      deliverables={[
        {
          title: "Campaign Setup & Strategy",
          description:
            "A structured launch process that sets campaigns up for measurable performance.",
          items: [
            "Offer and funnel strategy",
            "Audience research and account architecture",
            "Ad creative direction and copywriting",
            "Tracking setup and conversion event mapping",
          ],
        },
        {
          title: "Optimization & Reporting",
          description:
            "Weekly refinements and clear reporting to scale what is working.",
          items: [
            "Bid, audience, and creative optimization",
            "A/B testing roadmap and execution",
            "Budget pacing and spend allocation",
            "Monthly reports with strategy updates",
          ],
        },
      ]}
      processSteps={[
        {
          step: "Strategy & Tracking",
          description:
            "We define goals, audience segments, and measurement setup before campaign launch.",
        },
        {
          step: "Build & Launch",
          description:
            "We deploy campaigns with clean structure, creative hypotheses, and clear KPIs.",
        },
        {
          step: "Optimize Weekly",
          description:
            "We refine targeting, bids, creative, and landing pages based on performance signals.",
        },
        {
          step: "Scale Winners",
          description:
            "We reallocate budget toward top-performing campaigns and expand proven opportunities.",
        },
      ]}
      tiers={[
        {
          name: "Startup",
          price: "Starting at $750/mo",
          description: "Best for focused single-channel lead generation",
          features: [
            "Single-channel campaign management",
            "Core tracking setup",
            "Creative and copy support",
            "Monthly reporting",
          ],
        },
        {
          name: "Growth",
          price: "Starting at $1,500/mo",
          description: "Best for multi-campaign growth and optimization",
          features: [
            "Multi-audience campaign system",
            "Weekly optimization support",
            "Structured testing roadmap",
            "Monthly strategy sessions",
          ],
        },
        {
          name: "Scale",
          price: "Starting at $3,000/mo",
          description: "Best for multi-platform expansion at volume",
          features: [
            "Cross-platform campaign management",
            "Advanced attribution support",
            "Performance dashboards",
            "Priority growth support",
          ],
        },
      ]}
      faqs={[
        {
          question: "Which ad platforms do you support?",
          answer:
            "We typically manage Google Ads, Meta Ads, and LinkedIn Ads, based on where your audience is most likely to convert.",
        },
        {
          question: "Is media spend included in your management fee?",
          answer:
            "No. Ad spend is paid directly from your ad accounts. Our fee covers strategy, execution, and optimization.",
        },
        {
          question: "How quickly can we launch campaigns?",
          answer:
            "Most campaigns can launch in 1-3 weeks depending on creative readiness, offer clarity, and tracking requirements.",
        },
        {
          question: "Can you help improve landing pages too?",
          answer:
            "Yes. We can optimize current landing pages or guide dedicated builds to improve conversion rates.",
        },
      ]}
    />
  );
}
