"use client";

import Link from "next/link";
import { ArrowRight, Brain, Camera, Megaphone, PenTool, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";

export function CareersContent() {
  const { t } = useLanguage();

  const roleAreas = [
    { icon: Megaphone, titleKey: "careers.role.performance", descKey: "careers.role.performance.desc" },
    { icon: PenTool, titleKey: "careers.role.creative", descKey: "careers.role.creative.desc" },
    { icon: Camera, titleKey: "careers.role.production", descKey: "careers.role.production.desc" },
    { icon: Workflow, titleKey: "careers.role.operations", descKey: "careers.role.operations.desc" },
  ];

  const expectationKeys = ["careers.exp1", "careers.exp2", "careers.exp3", "careers.exp4"];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          {t("careers.badge")}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("careers.heading")}
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          {t("careers.description")}
        </p>

        <section className="mb-14 rounded-xl border bg-muted/30 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{t("careers.howWeWork")}</h2>
          </div>
          <p className="text-muted-foreground">{t("careers.howWeWork.desc")}</p>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-semibold">{t("careers.roles")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {roleAreas.map((role) => {
              const Icon = role.icon;
              return (
                <article key={role.titleKey} className="rounded-lg border p-5">
                  <Icon className="mb-3 h-5 w-5 text-primary" />
                  <h3 className="mb-2 font-semibold">{t(role.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(role.descKey)}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-semibold">{t("careers.expectations")}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {expectationKeys.map((key) => (
              <div key={key} className="rounded-md border p-4 text-sm">
                {t(key)}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">{t("careers.cta.title")}</h2>
          <p className="mb-6 text-muted-foreground">
            {t("careers.cta.desc1")}{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary hover:underline"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                {t("careers.cta.contactTeam")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">{t("careers.cta.learnAboutUs")}</Link>
            </Button>
          </div>
        </section>

        <CTABanner variant="compact" />
      </div>
    </div>
  );
}
