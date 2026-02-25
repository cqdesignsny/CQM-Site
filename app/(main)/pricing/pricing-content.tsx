"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";

export function PricingContent() {
  const { t } = useLanguage();

  const plans = [
    {
      nameKey: "pricing.plan.startup",
      audienceKey: "pricing.plan.startup.audience",
      summaryKey: "pricing.plan.startup.summary",
      priceKey: "pricing.plan.startup.price",
      includes: [
        "pricing.plan.startup.i1",
        "pricing.plan.startup.i2",
        "pricing.plan.startup.i3",
        "pricing.plan.startup.i4",
      ],
    },
    {
      nameKey: "pricing.plan.growth",
      audienceKey: "pricing.plan.growth.audience",
      summaryKey: "pricing.plan.growth.summary",
      priceKey: "pricing.plan.growth.price",
      includes: [
        "pricing.plan.growth.i1",
        "pricing.plan.growth.i2",
        "pricing.plan.growth.i3",
        "pricing.plan.growth.i4",
      ],
      highlight: true,
    },
    {
      nameKey: "pricing.plan.scale",
      audienceKey: "pricing.plan.scale.audience",
      summaryKey: "pricing.plan.scale.summary",
      priceKey: "pricing.plan.scale.price",
      includes: [
        "pricing.plan.scale.i1",
        "pricing.plan.scale.i2",
        "pricing.plan.scale.i3",
        "pricing.plan.scale.i4",
      ],
    },
  ];

  const additionalServices = [
    "pricing.additional.s1",
    "pricing.additional.s2",
    "pricing.additional.s3",
    "pricing.additional.s4",
    "pricing.additional.s5",
    "pricing.additional.s6",
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            {t("pricing.badge")}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("pricing.heading")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("pricing.description")}
          </p>
        </div>

        <section className="mb-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.nameKey}
              className={`rounded-xl border p-6 ${
                plan.highlight ? "border-primary shadow-lg" : ""
              }`}
            >
              {plan.highlight && (
                <span className="mb-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  {t("pricing.popular")}
                </span>
              )}
              <h2 className="mb-1 text-2xl font-semibold">{t(plan.nameKey)}</h2>
              <p className="mb-3 text-sm font-medium text-primary">{t(plan.audienceKey)}</p>
              <p className="mb-2 text-xl font-bold text-foreground">{t(plan.priceKey)}</p>
              <p className="mb-5 text-sm text-muted-foreground">{t(plan.summaryKey)}</p>
              <ul className="space-y-2">
                {plan.includes.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mb-14 rounded-xl border bg-muted/30 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{t("pricing.additional.title")}</h2>
          </div>
          <p className="mb-5 text-muted-foreground">
            {t("pricing.additional.desc")}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((key) => (
              <div key={key} className="rounded-md border bg-background p-3 text-sm">
                {t(key)}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">{t("pricing.customQuote.title")}</h2>
          <p className="mb-6 text-muted-foreground">
            {t("pricing.customQuote.desc")}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">{t("hero.cta1")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">{t("pricing.compareServices")}</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
