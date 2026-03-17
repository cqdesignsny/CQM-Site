"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";

export function StudioContent() {
  const { t } = useLanguage();

  const workflowSteps = [
    { titleKey: "studio.wf1.title", descKey: "studio.wf1.desc" },
    { titleKey: "studio.wf2.title", descKey: "studio.wf2.desc" },
    { titleKey: "studio.wf3.title", descKey: "studio.wf3.desc" },
    { titleKey: "studio.wf4.title", descKey: "studio.wf4.desc" },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="brand-section-title mb-3">{t("studio.badge")}</p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("studio.heading")}
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          {t("studio.description")}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="#book-tour">{t("studio.tourBtn")}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://hvpodcasting.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("studio.hvpBtn")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Packages CTA */}
      <section className="mb-20">
        <div className="rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-950/20 to-black/40 p-8 text-center md:p-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold">{t("studio.packages")}</h2>
            <p className="mb-8 text-muted-foreground">
              {t("studio.packagesCTADesc")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/proposals">
                  {t("cta.buildPackage")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">{t("studio.bookSession")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Tour Gallery */}
      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-bold">{t("studio.tour")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-muted" />
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-bold">{t("studio.workflow.title")}</h2>
        <div className="space-y-6">
          {workflowSteps.map((item) => (
            <div key={item.titleKey} className="rounded-lg border p-6">
              <h3 className="mb-2 text-lg font-semibold">{t(item.titleKey)}</h3>
              <p className="text-muted-foreground">{t(item.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section id="book-tour" className="rounded-lg border bg-muted/30 p-8 md:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">{t("studio.cta.title")}</h2>
          <p className="mb-6 text-muted-foreground">{t("studio.cta.desc")}</p>
          <div className="mb-6 rounded-lg border bg-background p-8">
            <p className="text-sm text-muted-foreground">
              {t("common.calendlyPlaceholder")}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {t("common.calendlyEnvHint")}
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/contact">{t("studio.cta.contact")}</Link>
          </Button>
        </div>
      </section>

      <CTABanner variant="compact" />
    </div>
  );
}
