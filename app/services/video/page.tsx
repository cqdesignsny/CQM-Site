import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Video Production Services | Creative Quality Marketing",
  description:
    "Professional video production from concept to delivery, including short-form and campaign-ready content.",
  path: "/services/video",
  keywords: ["video production agency", "brand video production", "short-form content"],
});

export default function VideoServicePage() {
  return (
    <ServicePageTemplate
      serviceName="Video Production"
      headline="Video Assets Built for Brand and Performance"
      description="We produce high-quality video content that gives your campaigns stronger creative and your brand a clearer story."
      path="/services/video"
      highlights={[
        "Pre-Production to Delivery",
        "Studio + On-Location Shoots",
        "Campaign and Social Cutdowns",
      ]}
      outcomes={[
        "Stronger brand storytelling and clarity",
        "Better creative performance in social and ads",
        "Higher engagement across key channels",
        "Reliable content production cadence",
        "More reusable sales and marketing assets",
        "Faster repurposing across platforms",
      ]}
      deliverables={[
        {
          title: "Pre-Production",
          description:
            "Planning and creative alignment before cameras roll.",
          items: [
            "Creative direction and concept planning",
            "Script support and shot planning",
            "Production timeline and logistics",
            "On-location or studio coordination",
          ],
        },
        {
          title: "Post-Production",
          description:
            "Editing workflows built for quality and usability across channels.",
          items: [
            "Professional editing and pacing",
            "Audio cleanup, color, and graphics",
            "Platform-specific cutdowns and versions",
            "Organized final delivery package",
          ],
        },
      ]}
      processSteps={[
        {
          step: "Creative Brief",
          description:
            "We align goals, audience, deliverables, and style direction for the project.",
        },
        {
          step: "Production Planning",
          description:
            "We finalize scripts, shot lists, and logistics to keep shoot days efficient.",
        },
        {
          step: "Capture & Edit",
          description:
            "We produce and edit footage into polished assets for each intended channel.",
        },
        {
          step: "Delivery & Repurposing",
          description:
            "We deliver clean final files and repurpose variants to maximize output value.",
        },
      ]}
      tiers={[
        {
          name: "Startup",
          price: "Starting at $750/mo",
          description: "Best for foundational recurring content support",
          features: [
            "Planned content capture sessions",
            "Core edit package",
            "Social-ready output formats",
            "Standard delivery timeline",
          ],
        },
        {
          name: "Growth",
          price: "Starting at $1,500/mo",
          description: "Best for campaign-focused video output",
          features: [
            "Campaign concept collaboration",
            "Multiple deliverables per cycle",
            "Editing and revision support",
            "Cross-channel format variants",
          ],
        },
        {
          name: "Scale",
          price: "Starting at $3,000/mo",
          description: "Best for high-frequency production needs",
          features: [
            "Monthly content planning",
            "Recurring production cadence",
            "Advanced post-production workflow",
            "Priority turnaround support",
          ],
        },
      ]}
      faqs={[
        {
          question: "Do you handle scripting and creative direction?",
          answer:
            "Yes. We support concept development, scripting direction, and production planning end-to-end.",
        },
        {
          question: "Can one shoot produce multiple assets?",
          answer:
            "Yes. We routinely repurpose one shoot into long-form, short-form, and platform-specific content variants.",
        },
        {
          question: "Do you only film in your studio?",
          answer:
            "No. We support both studio and on-location productions based on the project goals.",
        },
        {
          question: "What is typical turnaround time?",
          answer:
            "Depending on scope and revision cycles, standard projects are often delivered in about 1-3 weeks.",
        },
      ]}
    />
  );
}
