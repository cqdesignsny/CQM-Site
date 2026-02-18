import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Agent & AI Integration | Creative Quality Marketing",
  description:
    "Agent and AI integration services for embedding practical AI assistants into day-to-day business workflows.",
  path: "/services/ai-integration",
  keywords: ["AI agents for business", "AI assistant integration", "AI workflow integration"],
});

export default function AiIntegrationPage() {
  return (
    <ServicePageTemplate
      serviceName="Agent & AI Integration"
      headline="Integrate AI Agents Into Real Business Workflows"
      description="We help you deploy practical AI assistants for sales, content, support, and internal operations with clear guardrails and team adoption."
      path="/services/ai-integration"
      highlights={[
        "Use-Case and Workflow Mapping",
        "Agent Setup + System Integration",
        "Governance, QA, and Team Enablement",
      ]}
      outcomes={[
        "Faster response and follow-up workflows",
        "Better access to internal knowledge",
        "Consistent team execution standards",
        "Reduced process bottlenecks",
        "Improved cross-channel coordination",
        "Scalable client delivery systems",
      ]}
      deliverables={[
        {
          title: "Integration Planning",
          description:
            "We define where AI agents should fit and how they should behave.",
          items: [
            "Use-case and workflow mapping",
            "Prompt and behavior framework",
            "Data source and process alignment",
            "Risk and quality guardrails",
          ],
        },
        {
          title: "Deployment & Adoption",
          description:
            "We launch assistants and make sure your team can use them confidently.",
          items: [
            "Agent setup and tool integration",
            "Workflow testing and tuning",
            "Team training and enablement",
            "Ongoing performance optimization",
          ],
        },
      ]}
      processSteps={[
        {
          step: "Define Use Cases",
          description:
            "We identify high-impact workflows where AI agents can reduce friction and save time.",
        },
        {
          step: "Design Agent Behavior",
          description:
            "We structure prompts, data access, and output standards to keep responses reliable.",
        },
        {
          step: "Integrate Into Systems",
          description:
            "We connect agents to your workflows and tools with testing for quality and reliability.",
        },
        {
          step: "Enable Team Adoption",
          description:
            "We train your team, monitor outcomes, and iterate based on real-world usage.",
        },
      ]}
      tiers={[
        {
          name: "Startup",
          price: "Starting at $750/mo",
          description: "Initial assistant integration for one core workflow",
          features: [
            "Use-case definition",
            "Baseline agent setup and prompts",
            "Basic deployment support",
            "Monthly performance review",
          ],
        },
        {
          name: "Growth",
          price: "Starting at $1,500/mo",
          description: "Multi-use workflow integration support",
          features: [
            "Multiple agent workflows",
            "Process tuning and optimization",
            "Team onboarding support",
            "Ongoing QA refinements",
          ],
        },
        {
          name: "Scale",
          price: "Starting at $3,000/mo",
          description: "Advanced cross-functional integration",
          features: [
            "Cross-team workflow integrations",
            "Custom governance standards",
            "Advanced quality assurance",
            "Priority support and iteration",
          ],
        },
      ]}
      faqs={[
        {
          question: "What types of AI agents can you implement?",
          answer:
            "We support sales assistants, content assistants, SOP assistants, and workflow-specific agents tailored to your operations.",
        },
        {
          question: "How do you maintain quality and brand consistency?",
          answer:
            "We define behavior rules, prompts, and review checkpoints so outputs stay aligned to your standards.",
        },
        {
          question: "Can we start small and expand later?",
          answer:
            "Yes. We typically start with one high-impact use case and expand after proving operational value.",
        },
        {
          question: "Will this replace our team?",
          answer:
            "No. The goal is to amplify your team by automating repetitive tasks and speeding up execution quality.",
        },
      ]}
    />
  );
}
