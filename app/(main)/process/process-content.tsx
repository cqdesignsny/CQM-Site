"use client";

import Link from "next/link";
import { Bot, CheckCircle2, Compass, Rocket, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";

export function ProcessContent() {
  const { t } = useLanguage();

  const processSteps = [
    {
      number: "01",
      titleKey: "process.page.step1.title",
      summaryKey: "process.page.step1.summary",
      details: ["process.page.step1.d1", "process.page.step1.d2", "process.page.step1.d3"],
    },
    {
      number: "02",
      titleKey: "process.page.step2.title",
      summaryKey: "process.page.step2.summary",
      details: ["process.page.step2.d1", "process.page.step2.d2", "process.page.step2.d3"],
    },
    {
      number: "03",
      titleKey: "process.page.step3.title",
      summaryKey: "process.page.step3.summary",
      details: ["process.page.step3.d1", "process.page.step3.d2", "process.page.step3.d3"],
    },
    {
      number: "04",
      titleKey: "process.page.step4.title",
      summaryKey: "process.page.step4.summary",
      details: ["process.page.step4.d1", "process.page.step4.d2", "process.page.step4.d3"],
    },
  ];

  const workingStyleKeys = ["process.ws1", "process.ws2", "process.ws3", "process.ws4"];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="brand-section-title mb-3">{t("process.badge")}</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("process.heading")}
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {t("process.description")}
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
                    <h2 className="text-2xl font-semibold">{t(step.titleKey)}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t(step.summaryKey)}</p>
                  </div>
                </div>
                <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                  {t("process.viewDetails")}
                </span>
              </summary>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {step.details.map((key) => (
                  <div key={key} className="rounded-md border bg-red-50/60 p-3 text-sm">
                    {t(key)}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </section>

        <section className="mb-14 brand-dark-panel p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-red-300" />
            <h2 className="text-2xl font-semibold">{t("process.workingStyle")}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {workingStyleKeys.map((key) => (
              <div key={key} className="flex items-start gap-2 rounded-md border border-white/10 bg-white/5 p-3 text-sm text-white/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-panel p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">{t("process.cta.title")}</h2>
          <p className="mb-6 text-muted-foreground">{t("process.cta.desc")}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                {t("hero.cta1")}
                <Compass className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">
                {t("process.cta.viewPlans")}
                <Rocket className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/services">
                {t("about.cta.exploreServices")}
                <Wrench className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <CTABanner variant="full" />
      </div>
    </div>
  );
}
