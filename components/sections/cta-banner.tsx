"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Layers } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";

/**
 * CTABanner — Reusable site-wide CTA section that funnels visitors
 * toward the Marketing Assessment and Proposal Builder.
 *
 * Variants:
 *  - "full" (default): Two cards side-by-side (assessment + builder)
 *  - "compact": Single-row inline CTA
 *  - "assessment": Assessment-only CTA
 *  - "builder": Builder-only CTA
 */
interface Props {
  variant?: "full" | "compact" | "assessment" | "builder";
  className?: string;
}

export function CTABanner({ variant = "full", className = "" }: Props) {
  const { t } = useLanguage();

  const handleClick = (destination: string) => {
    track("cta_click", { cta_type: "cta_banner", location: destination });
  };

  if (variant === "compact") {
    return (
      <section className={`border-t border-white/10 bg-gradient-to-r from-red-950/30 via-black to-red-950/30 ${className}`}>
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
          <p className="text-lg font-semibold text-white">
            {t("cta.readyToGrow")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/assessment"
              onClick={() => handleClick("assessment")}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <BarChart3 className="h-4 w-4" />
              {t("cta.takeAssessment")}
            </Link>
            <Link
              href="/proposals"
              onClick={() => handleClick("proposals")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Layers className="h-4 w-4" />
              {t("cta.buildPackage")}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "assessment") {
    return (
      <section className={`bg-gradient-to-br from-red-950/20 to-black ${className}`}>
        <div className="container mx-auto px-4 py-16 text-center">
          <BarChart3 className="mx-auto mb-4 h-10 w-10 text-red-400" />
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
            {t("cta.findOutWhatsMissing")}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-white/60">
            {t("cta.assessmentDesc")}
          </p>
          <Link
            href="/assessment"
            onClick={() => handleClick("assessment")}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            {t("cta.takeQuiz")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  if (variant === "builder") {
    return (
      <section className={`bg-gradient-to-br from-zinc-900 to-black ${className}`}>
        <div className="container mx-auto px-4 py-16 text-center">
          <Layers className="mx-auto mb-4 h-10 w-10 text-red-400" />
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
            {t("cta.buildPackage")}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-white/60">
            {t("cta.builderDesc")}
          </p>
          <Link
            href="/proposals"
            onClick={() => handleClick("proposals")}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            {t("cta.buildProposal")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  // variant === "full" — the default two-card layout
  return (
    <section className={`bg-gradient-to-b from-zinc-950 to-black ${className}`}>
      <div className="container mx-auto px-4 py-16 md:py-20">
        <h2 className="mb-3 text-center text-2xl font-bold text-white sm:text-3xl">
          {t("cta.readyToGrow")}
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-white/60">
          {t("cta.findOutWhatsMissing")}
        </p>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* Assessment Card */}
          <Link
            href="/assessment"
            onClick={() => handleClick("assessment")}
            className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-red-500/30 hover:bg-red-600/5"
          >
            <BarChart3 className="mb-4 h-8 w-8 text-red-400 transition-transform group-hover:scale-110" />
            <h3 className="mb-2 text-lg font-semibold text-white">
              {t("cta.takeAssessment")}
            </h3>
            <p className="mb-4 text-sm text-white/50">
              {t("cta.assessmentDesc")}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-red-400 transition-colors group-hover:text-red-300">
              {t("cta.takeQuiz")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Builder Card */}
          <Link
            href="/proposals"
            onClick={() => handleClick("proposals")}
            className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-red-500/30 hover:bg-red-600/5"
          >
            <Layers className="mb-4 h-8 w-8 text-red-400 transition-transform group-hover:scale-110" />
            <h3 className="mb-2 text-lg font-semibold text-white">
              {t("cta.buildPackage")}
            </h3>
            <p className="mb-4 text-sm text-white/50">
              {t("cta.builderDesc")}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-red-400 transition-colors group-hover:text-red-300">
              {t("cta.buildProposal")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
