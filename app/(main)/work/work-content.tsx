"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";

export function WorkContent() {
  const { t } = useLanguage();

  const clientSpotlights = [
    {
      name: "Advanced Skin Medspa",
      logo: "/images/asm.webp",
      focus: "Brand visibility and lead generation",
      services: ["Website updates", "Local SEO", "Social content"],
      impact: "Created a clearer online presence and a stronger patient acquisition flow.",
    },
    {
      name: "SaGrah Beauty",
      logo: "/images/sagrah-beauty.webp",
      focus: "E-commerce growth and content consistency",
      services: ["Website support", "Email campaigns", "Creative production"],
      impact: "Built a more consistent launch cadence with better conversion-focused content.",
    },
    {
      name: "Urban Flooring",
      logo: "/images/urban-flooring.webp",
      focus: "Local demand capture",
      services: ["SEO support", "Paid search", "Landing page optimization"],
      impact: "Improved visibility for high-intent local searches and quote requests.",
    },
    {
      name: "Hudson Valley Podcasting",
      logo: "/images/hvp.webp",
      focus: "Media production and audience growth",
      services: ["Studio production", "Video edits", "Distribution workflows"],
      impact: "Expanded content output and streamlined publishing across major channels.",
    },
    {
      name: "Mark Viera",
      logo: "/images/markviera.webp",
      focus: "Brand storytelling and campaign content",
      services: ["Photography", "Video production", "Social campaign assets"],
      impact: "Delivered reusable media assets for ongoing audience engagement.",
    },
    {
      name: "Wrecktified",
      logo: "/images/wrecktified.webp",
      focus: "Performance-focused digital presence",
      services: ["Website support", "Paid ads", "Content strategy"],
      impact: "Improved campaign clarity with a stronger conversion path for prospects.",
    },
  ];

  const industryKeys = [
    "work.ind.health",
    "work.ind.beauty",
    "work.ind.home",
    "work.ind.personal",
    "work.ind.professional",
    "work.ind.media",
    "work.ind.retail",
    "work.ind.ecommerce",
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          {t("work.badge")}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("work.heading")}
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          {t("work.description")}
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
            <h2 className="text-2xl font-semibold">{t("work.aiAdvantage")}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {(["work.ai1", "work.ai2", "work.ai3", "work.ai4"] as const).map((key) => (
              <p key={key} className="rounded-lg border bg-background p-4 text-sm">
                {t(key)}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold">{t("work.industries.title")}</h2>
          <div className="flex flex-wrap gap-2">
            {industryKeys.map((key) => (
              <span
                key={key}
                className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
              >
                {t(key)}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">{t("work.cta.title")}</h2>
          <p className="mb-6 text-muted-foreground">{t("work.cta.desc")}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                {t("work.cta.startProject")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">
                {t("work.cta.exploreServices")}
                <BadgeCheck className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
