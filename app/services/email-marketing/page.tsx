import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Email Marketing Services | Creative Quality Marketing",
  description:
    "Email marketing strategy and automation for lead nurture, retention, and repeat revenue growth.",
  path: "/services/email-marketing",
  keywords: ["email marketing agency", "email automation", "Klaviyo services"],
});

export default function EmailMarketingServicePage() {
  return (
    <ServicePageTemplate
      serviceName="Email Marketing"
      headline="Email Systems That Nurture and Convert"
      description="From lifecycle automations to monthly campaigns, we help you turn your list into a predictable growth channel."
      path="/services/email-marketing"
      highlights={[
        "Lifecycle Automation",
        "Campaign Strategy + Copy",
        "Segmentation and Testing",
      ]}
      outcomes={[
        "Higher open and click-through rates",
        "Stronger lead nurturing and conversion flow",
        "Improved customer retention and repeat sales",
        "Cleaner segmentation and personalization",
        "Better attribution to offers and campaigns",
        "Consistent month-over-month email performance",
      ]}
      deliverables={[
        {
          title: "Strategy & Automation",
          description:
            "Lifecycle systems that run in the background and support revenue goals.",
          items: [
            "Audience segmentation and messaging map",
            "Welcome and nurture automation sequences",
            "Abandonment and re-engagement flows",
            "Deliverability and platform configuration checks",
          ],
        },
        {
          title: "Campaign Operations",
          description:
            "A repeatable monthly campaign cadence with ongoing optimization.",
          items: [
            "Monthly campaign planning and deployment",
            "Subject line and copy testing",
            "Performance monitoring and improvements",
            "Monthly reporting with next actions",
          ],
        },
      ]}
      processSteps={[
        {
          step: "Audience & Offer Mapping",
          description:
            "We map key segments and align messaging to each stage of your customer journey.",
        },
        {
          step: "Flow Buildout",
          description:
            "We implement lifecycle automations that support lead nurture and retention goals.",
        },
        {
          step: "Campaign Cadence",
          description:
            "We execute regular campaigns tied to offers, launches, and seasonal opportunities.",
        },
        {
          step: "Testing & Optimization",
          description:
            "We optimize subject lines, messaging, and segmentation based on real performance data.",
        },
      ]}
      tiers={[
        {
          name: "Startup",
          price: "Starting at $750/mo",
          description: "Best for foundational lifecycle setup",
          features: [
            "Core automation flow setup",
            "Monthly campaign support",
            "Basic segmentation structure",
            "Performance dashboard reporting",
          ],
        },
        {
          name: "Growth",
          price: "Starting at $1,500/mo",
          description: "Best for active lead and customer nurturing",
          features: [
            "Expanded automation map",
            "Increased campaign frequency",
            "A/B testing cadence",
            "Monthly strategy reviews",
          ],
        },
        {
          name: "Scale",
          price: "Starting at $3,000/mo",
          description: "Best for high-volume and multi-offer brands",
          features: [
            "Advanced segmentation architecture",
            "Complex flow build and refinement",
            "Cross-channel automation support",
            "Priority optimization cycles",
          ],
        },
      ]}
      faqs={[
        {
          question: "Which email platforms do you support?",
          answer:
            "We support major platforms like Klaviyo, Mailchimp, HubSpot, ActiveCampaign, and similar systems.",
        },
        {
          question: "Do you handle strategy and copywriting?",
          answer:
            "Yes. We handle lifecycle strategy, campaign planning, and copywriting aligned to your brand voice.",
        },
        {
          question: "Can you improve deliverability?",
          answer:
            "Yes. We review list health, domain setup, and sending practices to improve inbox placement.",
        },
        {
          question: "How often should campaigns be sent?",
          answer:
            "Cadence depends on audience behavior and offer complexity. We create a sustainable rhythm and optimize over time.",
        },
      ]}
    />
  );
}
