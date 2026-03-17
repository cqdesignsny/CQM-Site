"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";

export function PricingContent() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
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

        {/* Two paths */}
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          {/* Assessment Path */}
          <div className="group rounded-2xl border-2 border-white/10 bg-gradient-to-br from-zinc-900 to-black p-8 transition-all hover:border-red-500/30">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20">
              <Target className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">
              {t("pricing.path1.title")}
            </h2>
            <p className="mb-6 text-white/60">
              {t("pricing.path1.desc")}
            </p>
            <ul className="mb-8 space-y-3">
              {["pricing.path1.b1", "pricing.path1.b2", "pricing.path1.b3"].map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-white/70">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {t(key)}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="w-full">
              <Link href="/assessment">
                {t("cta.takeAssessment")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Proposal Builder Path */}
          <div className="group rounded-2xl border-2 border-white/10 bg-gradient-to-br from-zinc-900 to-black p-8 transition-all hover:border-red-500/30">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20">
              <Zap className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">
              {t("pricing.path2.title")}
            </h2>
            <p className="mb-6 text-white/60">
              {t("pricing.path2.desc")}
            </p>
            <ul className="mb-8 space-y-3">
              {["pricing.path2.b1", "pricing.path2.b2", "pricing.path2.b3"].map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-white/70">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {t(key)}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              <Link href="/proposals">
                {t("cta.buildPackage")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-xl border bg-muted/30 p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-bold">{t("pricing.bottomCTA.title")}</h2>
          <p className="mb-6 text-muted-foreground">{t("pricing.bottomCTA.desc")}</p>
          <Button asChild size="lg">
            <Link href="/contact">
              {t("nav.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
