"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";

export function WorkContent() {
  const { t } = useLanguage();

  const clientSpotlights = [
    {
      name: "Advanced Skin Medspa",
      logo: "/images/asm.webp",
      focusKey: "work.spot.asm.focus",
      serviceKeys: ["work.spot.asm.s1", "work.spot.asm.s2", "work.spot.asm.s3"],
      impactKey: "work.spot.asm.impact",
    },
    {
      name: "SaGrah Beauty",
      logo: "/images/sagrah-beauty.webp",
      focusKey: "work.spot.sagrah.focus",
      serviceKeys: ["work.spot.sagrah.s1", "work.spot.sagrah.s2", "work.spot.sagrah.s3"],
      impactKey: "work.spot.sagrah.impact",
    },
    {
      name: "Urban Flooring",
      logo: "/images/urban-flooring.webp",
      focusKey: "work.spot.urban.focus",
      serviceKeys: ["work.spot.urban.s1", "work.spot.urban.s2", "work.spot.urban.s3"],
      impactKey: "work.spot.urban.impact",
    },
    {
      name: "Hudson Valley Podcasting",
      logo: "/images/hvp.webp",
      focusKey: "work.spot.hvp.focus",
      serviceKeys: ["work.spot.hvp.s1", "work.spot.hvp.s2", "work.spot.hvp.s3"],
      impactKey: "work.spot.hvp.impact",
    },
    {
      name: "Mark Viera",
      logo: "/images/markviera.webp",
      focusKey: "work.spot.mark.focus",
      serviceKeys: ["work.spot.mark.s1", "work.spot.mark.s2", "work.spot.mark.s3"],
      impactKey: "work.spot.mark.impact",
    },
    {
      name: "Wrecktified",
      logo: "/images/wrecktified.webp",
      focusKey: "work.spot.wreck.focus",
      serviceKeys: ["work.spot.wreck.s1", "work.spot.wreck.s2", "work.spot.wreck.s3"],
      impactKey: "work.spot.wreck.impact",
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
                  <p className="text-sm text-primary">{t(client.focusKey)}</p>
                </div>
              </div>

              <ul className="mb-4 flex flex-wrap gap-2">
                {client.serviceKeys.map((key) => (
                  <li
                    key={key}
                    className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium"
                  >
                    {t(key)}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground">{t(client.impactKey)}</p>
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

        <CTABanner variant="full" />
      </div>
    </div>
  );
}
