import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies | Creative Quality Marketing",
  description:
    "See how Creative Quality Marketing helps brands grow through AI-powered digital marketing and content production.",
  path: "/work",
  keywords: ["marketing case studies", "client work", "digital marketing results"],
});

/**
 * Work/Case Studies Listing Page
 * TODO: Add filtering by industry, service type
 * TODO: Connect to CMS for case study data
 */
export default function WorkPage() {
  const clientSpotlights = [
    {
      name: "Advanced Skin Medspa",
      logo: "/images/asm.webp",
      focus: "Brand visibility and lead generation",
      services: ["Website updates", "Local SEO", "Social content"],
      impact:
        "Created a clearer online presence and a stronger patient acquisition flow.",
    },
    {
      name: "SaGrah Beauty",
      logo: "/images/sagrah-beauty.webp",
      focus: "E-commerce growth and content consistency",
      services: ["Website support", "Email campaigns", "Creative production"],
      impact:
        "Built a more consistent launch cadence with better conversion-focused content.",
    },
    {
      name: "Urban Flooring",
      logo: "/images/urban-flooring.webp",
      focus: "Local demand capture",
      services: ["SEO support", "Paid search", "Landing page optimization"],
      impact:
        "Improved visibility for high-intent local searches and quote requests.",
    },
    {
      name: "Hudson Valley Podcasting",
      logo: "/images/hvp.webp",
      focus: "Media production and audience growth",
      services: ["Studio production", "Video edits", "Distribution workflows"],
      impact:
        "Expanded content output and streamlined publishing across major channels.",
    },
    {
      name: "Mark Viera",
      logo: "/images/markviera.webp",
      focus: "Brand storytelling and campaign content",
      services: ["Photography", "Video production", "Social campaign assets"],
      impact:
        "Delivered reusable media assets for ongoing audience engagement.",
    },
    {
      name: "Wrecktified",
      logo: "/images/wrecktified.webp",
      focus: "Performance-focused digital presence",
      services: ["Website support", "Paid ads", "Content strategy"],
      impact:
        "Improved campaign clarity with a stronger conversion path for prospects.",
    },
  ];

  const industries = [
    "Health & Wellness",
    "Beauty & Skincare",
    "Home Services",
    "Personal Brands",
    "Professional Services",
    "Media & Podcasting",
    "Local Retail",
    "E-commerce",
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          Client Work
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Real Brands, Real Execution, Smarter Systems
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          We partner with businesses across industries to design growth systems
          that blend creativity, AI-assisted workflows, and consistent execution.
        </p>

        <section className="mb-14 grid gap-5 md:grid-cols-2">
          {clientSpotlights.map((client) => (
            <Link
              key={client.name}
              href={`/contact?client=${encodeURIComponent(client.name)}`}
              className="group rounded-xl border bg-white/95 p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl md:p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={220}
                  height={100}
                  className="h-14 w-auto object-contain transition-transform group-hover:scale-105 md:h-16"
                />
                <div>
                  <h2 className="text-xl font-semibold">{client.name}</h2>
                  <p className="text-sm text-primary">{client.focus}</p>
                </div>
              </div>

              <ul className="mb-4 flex flex-wrap gap-2">
                {client.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium"
                  >
                    {service}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground">{client.impact}</p>
            </Link>
          ))}
        </section>

        <section className="mb-14 rounded-xl border bg-muted/30 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Our AI + Human Advantage</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <p className="rounded-lg border bg-background p-4 text-sm">
              AI speeds up research, planning, and reporting so we move faster.
            </p>
            <p className="rounded-lg border bg-background p-4 text-sm">
              Human strategy and creative direction keep brand quality high.
            </p>
            <p className="rounded-lg border bg-background p-4 text-sm">
              Cross-channel execution keeps web, SEO, paid, and content aligned.
            </p>
            <p className="rounded-lg border bg-background p-4 text-sm">
              Weekly optimization loops help us iterate based on performance.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold">Industries We Support</h2>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
              >
                {industry}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">
            Want to Build the Next Success Story?
          </h2>
          <p className="mb-6 text-muted-foreground">
            We&apos;ll review your current marketing setup and outline the fastest
            path to better visibility, leads, and content performance.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">
                Explore Services
                <BadgeCheck className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}


