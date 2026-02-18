import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Social Media Services | Creative Quality Marketing",
  description:
    "Social media management and creative production for brands that want consistent output, audience growth, and measurable outcomes.",
  path: "/services/social-media",
  keywords: ["social media management", "content creation agency", "short-form video"],
});

export default function SocialMediaServicePage() {
  return (
    <ServicePageTemplate
      serviceName="Social Media Management"
      headline="Social Content Systems That Stay Consistent"
      description="We build practical content workflows that keep your brand active, credible, and visible across the platforms that matter to your audience."
      path="/services/social-media"
      highlights={[
        "Content Planning + Execution",
        "Short-Form Creative Support",
        "Engagement + Performance Reporting",
      ]}
      outcomes={[
        "Consistent brand presence across key platforms",
        "Stronger engagement quality with target audiences",
        "Cleaner creative direction and messaging",
        "Reliable monthly content cadence",
        "Higher trust through recurring content touchpoints",
        "Continuous improvement from performance insights",
      ]}
      deliverables={[
        {
          title: "Content & Creative",
          description:
            "A structured system for planning and producing platform-ready content.",
          items: [
            "Channel-specific strategy and content calendar",
            "Copywriting and creative direction support",
            "Short-form video and static content assets",
            "Monthly scheduling and publishing workflow",
          ],
        },
        {
          title: "Community & Analytics",
          description:
            "Engagement and reporting systems that connect output to business outcomes.",
          items: [
            "Community management workflows",
            "Performance tracking and reporting",
            "Monthly optimization recommendations",
            "Content testing and refinement plans",
          ],
        },
      ]}
      processSteps={[
        {
          step: "Brand & Audience Alignment",
          description:
            "We align your voice, positioning, and platform priorities to your business objectives.",
        },
        {
          step: "Monthly Content Planning",
          description:
            "We create practical content calendars with clear themes and deliverable formats.",
        },
        {
          step: "Production & Publishing",
          description:
            "We produce, review, and schedule assets with consistency and quality control.",
        },
        {
          step: "Review & Iterate",
          description:
            "We analyze reach, engagement, and conversions to improve the next content cycle.",
        },
      ]}
      tiers={[
        {
          name: "Startup",
          price: "Starting at $750/mo",
          description: "Best for brands building consistency",
          features: [
            "Monthly content calendar",
            "Core post production",
            "Scheduled publishing cadence",
            "Performance recap report",
          ],
        },
        {
          name: "Growth",
          price: "Starting at $1,500/mo",
          description: "Best for active audience growth",
          features: [
            "Expanded content output",
            "Short-form video support",
            "Community management support",
            "Monthly strategy calls",
          ],
        },
        {
          name: "Scale",
          price: "Starting at $3,000/mo",
          description: "Best for high-volume multi-channel brands",
          features: [
            "High-frequency publishing",
            "Campaign-level creative support",
            "Multi-platform reporting",
            "Priority collaboration",
          ],
        },
      ]}
      faqs={[
        {
          question: "Which platforms do you support?",
          answer:
            "We support the channels most relevant to your audience, commonly Instagram, Facebook, LinkedIn, TikTok, and YouTube Shorts.",
        },
        {
          question: "Do you create video content as part of this?",
          answer:
            "Yes. We can include short-form video production and combine it with our studio/video services when needed.",
        },
        {
          question: "Do you handle comments and DMs?",
          answer:
            "Yes, based on your plan scope. We can define response workflows and escalation paths for your team.",
        },
        {
          question: "How do you measure social media success?",
          answer:
            "We track engagement quality, audience relevance, traffic signals, and campaign-specific conversion behavior.",
        },
      ]}
    />
  );
}
