import { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing | Creative Quality Marketing",
  description:
    "Flexible growth plans from Creative Quality Marketing, including AI-powered strategy and execution support.",
  path: "/pricing",
  keywords: ["marketing pricing plans", "agency pricing", "digital marketing retainer"],
});

/**
 * Pricing Page - Overview of all service pricing
 */
export default function PricingPage() {
  const plans = [
    {
      name: "Startup",
      audience: "For businesses building their foundation",
      summary:
        "A focused plan to launch consistent marketing with clear strategy and early momentum.",
      startingAt: "Starting at $750/mo",
      includes: [
        "Business and marketing audit",
        "Core channel strategy",
        "Content and campaign support",
        "Monthly reporting and optimization",
      ],
    },
    {
      name: "Growth",
      audience: "For companies ready to accelerate",
      summary:
        "A multi-channel growth system with deeper creative support and faster optimization.",
      startingAt: "Starting at $1,500/mo",
      includes: [
        "Everything in Startup",
        "Expanded paid + SEO + social execution",
        "Faster testing and optimization cycles",
        "Priority communication and planning",
      ],
      highlight: true,
    },
    {
      name: "Scale",
      audience: "For brands scaling aggressively",
      summary:
        "A fully integrated model for advanced growth across strategy, creative, media, and AI systems.",
      startingAt: "Starting at $3,000/mo",
      includes: [
        "Everything in Growth",
        "High-output campaign and content production",
        "Cross-channel automation workflows",
        "Executive-level reporting and roadmap",
      ],
    },
  ];

  const additionalServices = [
    "Consulting and strategy intensives",
    "Website design and funnel builds",
    "E-commerce growth support",
    "Social media management",
    "Podcast and video production",
    "Print and brand collateral",
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Pricing & Plans
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Choose the Growth Plan That Matches Your Stage
          </h1>
          <p className="text-lg text-muted-foreground">
            Every plan combines strategy, creative execution, and AI-powered
            optimization workflows. Pricing is customized by scope so you only
            pay for what you need.
          </p>
        </div>

        <section className="mb-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-xl border p-6 ${
                plan.highlight ? "border-primary shadow-lg" : ""
              }`}
            >
              {plan.highlight && (
                <span className="mb-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h2 className="mb-1 text-2xl font-semibold">{plan.name}</h2>
              <p className="mb-3 text-sm font-medium text-primary">{plan.audience}</p>
              <p className="mb-2 text-xl font-bold text-foreground">{plan.startingAt}</p>
              <p className="mb-5 text-sm text-muted-foreground">{plan.summary}</p>
              <ul className="space-y-2">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mb-14 rounded-xl border bg-muted/30 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Additional Capabilities</h2>
          </div>
          <p className="mb-5 text-muted-foreground">
            Need something outside the core plans? We offer modular services
            that can be added as your marketing needs evolve.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((service) => (
              <div key={service} className="rounded-md border bg-background p-3 text-sm">
                {service}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">Need a Custom Quote?</h2>
          <p className="mb-6 text-muted-foreground">
            These are baseline starting prices. Final scope depends on add-ons,
            complexity, and the channels we activate for your business.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">Book a Strategy Call</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">Compare Services</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}


