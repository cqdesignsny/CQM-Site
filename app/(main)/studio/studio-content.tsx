"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function StudioContent() {
  const { t } = useLanguage();

  const packages = [
    {
      nameKey: "studio.pkg1.name",
      priceKey: "studio.pkg1.price",
      descKey: "studio.pkg1.desc",
      includes: ["studio.pkg1.i1", "studio.pkg1.i2", "studio.pkg1.i3", "studio.pkg1.i4"],
    },
    {
      nameKey: "studio.pkg2.name",
      priceKey: "studio.pkg2.price",
      descKey: "studio.pkg2.desc",
      includes: ["studio.pkg2.i1", "studio.pkg2.i2", "studio.pkg2.i3", "studio.pkg2.i4", "studio.pkg2.i5"],
    },
    {
      nameKey: "studio.pkg3.name",
      priceKey: "studio.pkg3.price",
      descKey: "studio.pkg3.desc",
      includes: ["studio.pkg3.i1", "studio.pkg3.i2", "studio.pkg3.i3", "studio.pkg3.i4", "studio.pkg3.i5", "studio.pkg3.i6"],
    },
  ];

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

      {/* Packages */}
      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-bold">{t("studio.packages")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={pkg.nameKey}
              className={`rounded-lg border p-6 ${
                index === 1
                  ? "border-primary bg-white shadow-lg"
                  : "bg-white/95 hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              {index === 1 && (
                <span className="mb-4 inline-flex rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                  {t("studio.mostRequested")}
                </span>
              )}
              <h3 className="mb-2 text-2xl font-bold">{t(pkg.nameKey)}</h3>
              <div className="mb-2 text-3xl font-bold">{t(pkg.priceKey)}</div>
              <p className="mb-6 text-sm text-muted-foreground">{t(pkg.descKey)}</p>
              <ul className="mb-6 space-y-2">
                {pkg.includes.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {t(key)}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant="outline">
                {t("studio.bookSession")}
              </Button>
            </div>
          ))}
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
              Calendly booking widget will be embedded here
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Add your Calendly URL to .env.local: NEXT_PUBLIC_CALENDLY_URL
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/contact">{t("studio.cta.contact")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
