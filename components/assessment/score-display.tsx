"use client";

import { useEffect, useState } from "react";
import type { Locale, CategoryScore } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import {
  getScoreLabel,
  getScoreColor,
} from "@/lib/assessment/scoring";
import { CATEGORIES } from "@/lib/proposals/services-data";

interface Props {
  overallScore: number;
  categoryScores: CategoryScore[];
  locale: Locale;
}

export function ScoreDisplay({ overallScore, categoryScores, locale }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1500;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * overallScore));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    // Trigger bar animations after a small delay
    const timer = setTimeout(() => setBarsAnimated(true), 200);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [overallScore]);

  const label = getScoreLabel(overallScore, locale);
  const scoreColor = getScoreColor(overallScore);

  return (
    <div>
      {/* Overall score */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          {t("assessment.overallScore", locale)}
        </p>
        <div className={`mt-4 text-7xl font-black ${scoreColor}`}>
          {animatedScore}
        </div>
        <p className="mt-1 text-sm text-white/40">/ 100</p>

        {/* Overall progress bar */}
        <div className="mx-auto mt-5 max-w-xs">
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-red-600 transition-all duration-[1500ms] ease-out"
              style={{ width: barsAnimated ? `${overallScore}%` : "0%" }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-white/30">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        <span
          className={`mt-5 inline-block rounded-full border px-4 py-1.5 text-sm font-semibold ${scoreColor} border-current/20`}
        >
          {label}
        </span>
      </div>

      {/* Category breakdown */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="mb-5 text-sm font-semibold text-white">
          {t("assessment.breakdown", locale)}
        </h3>
        <div className="space-y-4">
          {categoryScores.map((cs, i) => {
            const cat = CATEGORIES.find((c) => c.id === cs.category);
            if (!cat) return null;
            return (
              <div key={cs.category}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-white/70">
                    <span>{cat.icon}</span>
                    {locale === "es" ? cat.name_es : locale === "fr" ? cat.name_fr : cat.name}
                  </span>
                  <span className="text-sm font-medium text-white/50">
                    {cs.percentage}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-red-600 transition-all duration-[1200ms] ease-out"
                    style={{
                      width: barsAnimated ? `${cs.percentage}%` : "0%",
                      transitionDelay: barsAnimated ? `${i * 80}ms` : "0ms",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
