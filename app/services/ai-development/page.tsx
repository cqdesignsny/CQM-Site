import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Development & Automation | Creative Quality Marketing",
  description:
    "AI development and automation services to reduce manual work, improve consistency, and scale operations.",
  path: "/services/ai-development",
  keywords: ["AI automation agency", "workflow automation", "AI systems implementation"],
});

export default function AiDevelopmentPage() {
  return (
    <ServicePageTemplate
      serviceName="AI Development & Automation"
      headline="Practical AI Workflows That Save Time and Improve Output"
      description="We design and implement AI-powered systems that remove repetitive work, tighten quality control, and help your team execute faster."
      path="/services/ai-development"
      highlights={[
        "Workflow Audits + Automation Mapping",
        "Prompt and Process Architecture",
        "Team Enablement and Optimization",
      ]}
      outcomes={[
        "Reduced manual admin workload",
        "Faster campaign and content execution",
        "More consistent output quality",
        "Clearer reporting and delivery workflows",
        "Scalable operations across team members",
        "Higher productivity on high-value tasks",
      ]}
      deliverables={[
        {
          title: "System Design",
          description:
            "We map your current process and design AI automation around real bottlenecks.",
          items: [
            "Current workflow audit",
            "Automation opportunity map",
            "Prompt and process architecture",
            "Tool stack and integration recommendations",
          ],
        },
        {
          title: "Implementation Support",
          description:
            "We deploy and tune your systems so they are usable by the team from day one.",
          items: [
            "Automation build and deployment",
            "Testing and quality validation",
            "Team handoff documentation",
            "Iteration and optimization support",
          ],
        },
      ]}
      processSteps={[
        {
          step: "Audit Current Workflow",
          description:
            "We identify repetitive bottlenecks, quality issues, and opportunities for AI leverage.",
        },
        {
          step: "Design the System",
          description:
            "We define the right prompts, logic, and tools for your team and objectives.",
        },
        {
          step: "Build & Launch",
          description:
            "We implement automations, test quality, and deploy with clear usage guidelines.",
        },
        {
          step: "Train & Improve",
          description:
            "We train your team and optimize workflows based on usage and performance data.",
        },
      ]}
      tiers={[
        {
          name: "Startup",
          price: "Starting at $750/mo",
          description: "Foundational automation support",
          features: [
            "Workflow assessment",
            "1-2 automation builds",
            "Basic process documentation",
            "Monthly optimization check-in",
          ],
        },
        {
          name: "Growth",
          price: "Starting at $1,500/mo",
          description: "Expanded AI operations system",
          features: [
            "Multi-workflow automation support",
            "Prompt and process library",
            "Regular optimization cycles",
            "Team enablement support",
          ],
        },
        {
          name: "Scale",
          price: "Starting at $3,000/mo",
          description: "Advanced implementation and support",
          features: [
            "Cross-team workflow systems",
            "Advanced QA and governance",
            "Higher complexity integrations",
            "Priority support and iteration",
          ],
        },
      ]}
      faqs={[
        {
          question: "Do we need to replace our existing tools?",
          answer:
            "Usually no. We start by integrating with your current stack and only recommend changes when there is clear upside.",
        },
        {
          question: "Will you train our team after implementation?",
          answer:
            "Yes. Every implementation includes handoff support so your team can confidently operate and improve the system.",
        },
        {
          question: "Is this only useful for marketing teams?",
          answer:
            "No. We can support operations, sales, customer communication, and internal documentation workflows too.",
        },
        {
          question: "Can we start with one workflow first?",
          answer:
            "Yes. Many clients start with one high-impact process, then expand after proving value.",
        },
      ]}
    />
  );
}
