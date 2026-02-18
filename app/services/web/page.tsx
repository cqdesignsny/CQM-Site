import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Web Development Services | Creative Quality Marketing",
  description:
    "Custom web development services focused on speed, conversion, SEO structure, and long-term scalability.",
  path: "/services/web",
  keywords: [
    "web development agency",
    "business website design",
    "conversion-focused websites",
  ],
});

export default function WebDevelopmentPage() {
  return (
    <ServicePageTemplate
      serviceName="Web Development"
      headline="Websites That Look Premium and Convert"
      description="We design and build modern websites that are fast, conversion-ready, and easy for your team to manage as your business grows."
      path="/services/web"
      highlights={[
        "Custom Design + Development",
        "SEO-Ready Site Structure",
        "Conversion-Focused UX",
      ]}
      outcomes={[
        "Stronger first impression and brand trust",
        "Higher conversion rates from core pages",
        "Better mobile usability across devices",
        "Faster page speed and cleaner performance",
        "Improved technical SEO foundation",
        "Scalable architecture for future growth",
      ]}
      deliverables={[
        {
          title: "Design & Build",
          description:
            "A complete website experience tailored to your offer and audience.",
          items: [
            "Custom page layouts and UX flow",
            "Responsive development for all devices",
            "CMS setup for easy content updates",
            "E-commerce or lead form integration",
          ],
        },
        {
          title: "Optimization & Launch",
          description:
            "Launch support with performance, security, and visibility in mind.",
          items: [
            "Technical SEO foundation setup",
            "Core Web Vitals and speed optimizations",
            "Analytics and conversion tracking",
            "Post-launch support and QA",
          ],
        },
      ]}
      processSteps={[
        {
          step: "Discovery & Planning",
          description:
            "We align on goals, offers, target audience, and the conversion path before design starts.",
        },
        {
          step: "Design & Prototyping",
          description:
            "We build page direction and visual system so content and user flow are clear from the first click.",
        },
        {
          step: "Development & QA",
          description:
            "We implement with modern tooling, test across devices, and validate performance/accessibility.",
        },
        {
          step: "Launch & Iterate",
          description:
            "After launch, we monitor behavior and improve pages based on data and user feedback.",
        },
      ]}
      tiers={[
        {
          name: "Starter",
          price: "$5,000+",
          description: "Best for new brands or focused brochure websites",
          features: [
            "Up to 5 core pages",
            "Responsive custom design",
            "Basic CMS integration",
            "Contact and lead capture setup",
            "Foundational SEO setup",
          ],
        },
        {
          name: "Growth",
          price: "$12,000+",
          description: "Best for growing businesses with more complex needs",
          features: [
            "Up to 15 custom pages",
            "Advanced CMS architecture",
            "E-commerce or funnel integration",
            "Performance and conversion optimization",
            "90-day post-launch support",
          ],
        },
        {
          name: "Scale",
          price: "Custom",
          description: "Best for larger organizations and complex ecosystems",
          features: [
            "High-complexity page systems",
            "Advanced integrations and automation",
            "Multi-team workflow support",
            "Ongoing optimization retainers",
            "Priority support structure",
          ],
        },
      ]}
      faqs={[
        {
          question: "How long does a website project usually take?",
          answer:
            "Most standard projects run between 4-10 weeks depending on page count, content readiness, and integration complexity.",
        },
        {
          question: "Can my team edit content after launch?",
          answer:
            "Yes. We set up a manageable CMS structure and provide guidance so your team can make updates confidently.",
        },
        {
          question: "Do you support hosting and maintenance too?",
          answer:
            "Yes. We can guide hosting setup and offer maintenance support for security, updates, and ongoing improvements.",
        },
        {
          question: "Can this be paired with SEO and paid ads?",
          answer:
            "Absolutely. We frequently pair web builds with SEO and ad campaigns to improve both traffic and conversions.",
        },
      ]}
    />
  );
}
