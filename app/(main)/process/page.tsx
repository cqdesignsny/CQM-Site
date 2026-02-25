import { Metadata } from "next";
import Link from "next/link";
import { Bot, CheckCircle2, Compass, Rocket, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Process | Creative Quality Marketing",
  description:
    "A clear, AI-enhanced marketing process built for execution, optimization, and measurable growth.",
  path: "/process",
  keywords: ["marketing process", "agency workflow", "AI marketing framework"],
});

export default function ProcessPage() {
  const processSteps = [
    {
      number: "01",
      title: "Discovery & Clarity",
      summary:
        "We align goals, audiences, offers, and current performance before touching execution.",
      details: [
        "Business and audience intake",
        "Channel and funnel review",
        "Gap and opportunity map",
      ],
    },
    {
      number: "02",
      title: "AI-Enhanced Strategy",
      summary:
        "We build a practical roadmap using AI-assisted planning and human strategic review.",
      details: [
        "Priority channel plan",
        "Messaging and offer framework",
        "90-day execution timeline",
      ],
    },
    {
      number: "03",
      title: "Campaign Execution",
      summary:
        "We launch across web, SEO, paid ads, social, email, and content with clear priorities.",
      details: [
        "Creative production and deployment",
        "Tracking and QA setup",
        "Cross-channel coordination",
      ],
    },
    {
      number: "04",
      title: "Optimization & Scale",
      summary:
        "We improve performance weekly and scale what works with less guesswork.",
      details: [
        "Testing and iteration cycles",
        "Budget and focus reallocation",
        "Monthly reporting and roadmap updates",
      ],
    },
  ];

  const workingStyle = [
    "Clear priorities, no busywork",
    "Consistent check-ins and transparent reporting",
    "AI for speed, human quality control for final output",
    "Focused on revenue outcomes, not vanity metrics",
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="brand-section-title mb-3">How We Work</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, Interactive, and Built to Scale
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            We kept this process visually clear and easy to follow, while adding
            enough interaction to drill into each step without overwhelming you.
          </p>
        </div>

        <section className="mb-14 grid gap-4">
          {processSteps.map((step, index) => (
            <details
              key={step.number}
              className="group rounded-xl border bg-white/95 p-5 open:border-red-300 open:shadow-lg md:p-6"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold">{step.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{step.summary}</p>
                  </div>
                </div>
                <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                  View Details
                </span>
              </summary>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {step.details.map((item) => (
                  <div key={item} className="rounded-md border bg-red-50/60 p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </section>

        <section className="mb-14 brand-dark-panel p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-red-300" />
            <h2 className="text-2xl font-semibold">Our Working Style</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {workingStyle.map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-md border border-white/10 bg-white/5 p-3 text-sm text-white/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-panel p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">Want This Process Applied to Your Brand?</h2>
          <p className="mb-6 text-muted-foreground">
            We&apos;ll walk you through the exact steps we&apos;d use for your
            business and show where AI and automation can create immediate leverage.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                Book a Strategy Call
                <Compass className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">
                View Plans
                <Rocket className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/services">
                Explore Services
                <Wrench className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
