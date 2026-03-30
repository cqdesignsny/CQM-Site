"use client";

import Link from "next/link";
import type { Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import { ArrowRight, Check, Star, Zap, Rocket } from "lucide-react";
import { PACKAGES } from "@/lib/proposals/services-data";

interface Props {
  recommendedServices: string[];
  assessmentId: string;
  locale: Locale;
  overallScore?: number;
}

/**
 * Recommends one of the 3 flagship plans based on overall score,
 * instead of listing individual services.
 *
 * Score ranges:
 *   0-40  = Startup (needs the basics)
 *   41-65 = Growth (has foundation, needs to scale)
 *   66+   = Scale (ready for full domination)
 */
function getRecommendedPlan(score: number) {
  if (score <= 40) return "startup";
  if (score <= 65) return "growth";
  return "scale";
}

const planIcons = {
  startup: Star,
  growth: Zap,
  scale: Rocket,
};

const planColors = {
  startup: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", icon: "bg-amber-500" },
  growth: { border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-400", icon: "bg-red-600" },
  scale: { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400", icon: "bg-violet-600" },
};

export function Recommendations({
  recommendedServices,
  assessmentId,
  locale,
  overallScore = 50,
}: Props) {
  const pt = (key: string) => t(key, locale);

  if (recommendedServices.length === 0) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
        <Check className="mx-auto mb-3 h-8 w-8 text-green-400" />
        <h3 className="text-lg font-semibold text-white">
          {pt("assessment.greatJob")}
        </h3>
        <p className="mt-2 text-sm text-white/50">
          {pt("assessment.greatJobDesc")}
        </p>
      </div>
    );
  }

  const recommendedPlanId = getRecommendedPlan(overallScore);
  const plan = PACKAGES.find((p) => p.id === recommendedPlanId);
  if (!plan) return null;

  const colors = planColors[recommendedPlanId as keyof typeof planColors];
  const Icon = planIcons[recommendedPlanId as keyof typeof planIcons];

  // Get localized plan info
  const planName = locale === "es" ? plan.name_es : locale === "fr" ? plan.name_fr : plan.name;
  const planDesc = locale === "es" ? plan.description_es : locale === "fr" ? plan.description_fr : plan.description;
  const planFeatures = locale === "es" ? plan.features_es : locale === "fr" ? plan.features_fr : plan.features;

  // Show all 3 plans but highlight the recommended one
  const allPlans = PACKAGES.map((p) => {
    const isRecommended = p.id === recommendedPlanId;
    const pColors = planColors[p.id as keyof typeof planColors];
    const PIcon = planIcons[p.id as keyof typeof planIcons];
    const pName = locale === "es" ? p.name_es : locale === "fr" ? p.name_fr : p.name;
    const pTagline = locale === "es" ? p.tagline_es : locale === "fr" ? p.tagline_fr : p.tagline;

    return { ...p, isRecommended, pColors, PIcon, pName, pTagline };
  });

  return (
    <div>
      <div className="mb-4">
        <h3 className="mb-1 text-base font-semibold text-white">
          {pt("assessment.recommendations")}
        </h3>
        <p className="text-xs text-white/40">
          {pt("assessment.basedOnAnswers")}
        </p>
      </div>

      <div className="space-y-3">
        {allPlans.map((p) => (
          <div
            key={p.id}
            className={`relative overflow-hidden rounded-xl border-2 p-5 transition-all ${
              p.isRecommended
                ? `${p.pColors.border} ${p.pColors.bg}`
                : "border-white/10 bg-white/[0.02] opacity-60"
            }`}
          >
            {p.isRecommended && (
              <div className={`absolute right-4 top-4 rounded-full ${p.pColors.icon} px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white`}>
                {locale === "es" ? "Recomendado" : locale === "fr" ? "Recommand\u00E9" : "Recommended"}
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${p.pColors.icon}`}>
                <p.PIcon className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-lg font-bold text-white">{p.pName}</h4>
                <p className="text-sm text-white/50">{p.pTagline}</p>
                <p className={`mt-1 text-2xl font-bold ${p.pColors.text}`}>
                  ${p.price.toLocaleString()}
                  <span className="text-sm font-normal text-white/30">
                    {locale === "es" ? "/mes" : locale === "fr" ? "/mois" : "/mo"}
                  </span>
                </p>
              </div>
            </div>

            {p.isRecommended && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {(locale === "es" ? p.features_es : locale === "fr" ? p.features_fr : p.features).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <Link
          href={`/proposals?from=assessment&id=${assessmentId}&package=${recommendedPlanId}`}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          {pt("assessment.buildPackage")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
