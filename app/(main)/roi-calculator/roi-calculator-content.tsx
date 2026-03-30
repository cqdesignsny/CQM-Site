"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Calculator,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { CTABanner } from "@/components/sections/cta-banner";

/* ------------------------------------------------------------------ */
/*  Industry Benchmarks                                                */
/* ------------------------------------------------------------------ */

type Industry =
  | "restaurants"
  | "beauty"
  | "homeServices"
  | "ecommerce"
  | "professional"
  | "other";

const INDUSTRY_BENCHMARKS: Record<
  Industry,
  { cpaMin: number; cpaMax: number; budgetPercent: number }
> = {
  restaurants: { cpaMin: 30, cpaMax: 50, budgetPercent: 0.08 },
  beauty: { cpaMin: 40, cpaMax: 80, budgetPercent: 0.1 },
  homeServices: { cpaMin: 50, cpaMax: 100, budgetPercent: 0.1 },
  ecommerce: { cpaMin: 20, cpaMax: 60, budgetPercent: 0.12 },
  professional: { cpaMin: 80, cpaMax: 150, budgetPercent: 0.12 },
  other: { cpaMin: 40, cpaMax: 80, budgetPercent: 0.1 },
};

const INDUSTRY_KEYS: Industry[] = [
  "restaurants",
  "beauty",
  "homeServices",
  "ecommerce",
  "professional",
  "other",
];

/* ------------------------------------------------------------------ */
/*  Animated Number Component                                          */
/* ------------------------------------------------------------------ */

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => {
    const num = Math.max(0, v);
    if (decimals > 0) return num.toFixed(decimals);
    return Math.round(num).toLocaleString();
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <span className="tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Dollar Input Component                                             */
/* ------------------------------------------------------------------ */

function DollarInput({
  label,
  value,
  onChange,
  min = 0,
  max = 1000000,
  step = 100,
  id,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white/80">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white/5 px-4 py-3 transition-all ${
          focused
            ? "border-red-500 ring-1 ring-red-500/30"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <DollarSign className="h-5 w-5 shrink-0 text-red-400" />
        <input
          id={id}
          type="number"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          min={min}
          max={max}
          step={step}
          className="w-full bg-transparent text-xl font-semibold text-white outline-none placeholder:text-white/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="0"
        />
      </div>
      {/* Slider */}
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full cursor-pointer accent-red-500"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-white/30">
        <span>${min.toLocaleString()}</span>
        <span>${max.toLocaleString()}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result Card Component                                              */
/* ------------------------------------------------------------------ */

function ResultCard({
  icon: Icon,
  label,
  children,
  color = "white",
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  color?: "white" | "green" | "amber" | "red";
}) {
  const colorMap = {
    white: "border-white/10 bg-white/5",
    green: "border-emerald-500/30 bg-emerald-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
    red: "border-red-500/30 bg-red-500/5",
  };
  const iconColor = {
    white: "text-red-400",
    green: "text-emerald-400",
    amber: "text-amber-400",
    red: "text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl border p-5 transition-all ${colorMap[color]}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <Icon className={`h-5 w-5 ${iconColor[color]}`} />
        <span className="text-sm font-medium text-white/60">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{children}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Content                                                       */
/* ------------------------------------------------------------------ */

export function ROICalculatorContent() {
  const { t } = useLanguage();
  const resultsRef = useRef<HTMLDivElement>(null);

  /* --- Inputs --- */
  const [revenueGoal, setRevenueGoal] = useState(10000);
  const [customerValue, setCustomerValue] = useState(500);
  const [currentSpend, setCurrentSpend] = useState(0);
  const [industry, setIndustry] = useState<Industry>("other");
  const [selectOpen, setSelectOpen] = useState(false);

  /* Track calculator usage */
  const hasInteracted = useRef(false);
  useEffect(() => {
    if (!hasInteracted.current && (revenueGoal !== 10000 || customerValue !== 500 || currentSpend !== 0 || industry !== "other")) {
      hasInteracted.current = true;
      track("button_click", { cta_type: "roi_calculator", action: "first_interaction" });
    }
  }, [revenueGoal, customerValue, currentSpend, industry]);

  /* --- Calculations --- */
  const results = useMemo(() => {
    const bench = INDUSTRY_BENCHMARKS[industry];
    const customersNeeded = customerValue > 0 ? Math.ceil(revenueGoal / customerValue) : 0;
    const avgCPA = (bench.cpaMin + bench.cpaMax) / 2;
    const recommendedBudget = Math.max(
      revenueGoal * bench.budgetPercent,
      customersNeeded * avgCPA
    );
    const estimatedNewCustomers =
      currentSpend > 0 ? Math.floor(currentSpend / avgCPA) : 0;
    const revenueFromNewCustomers = estimatedNewCustomers * customerValue;
    const roi =
      currentSpend > 0
        ? ((revenueFromNewCustomers - currentSpend) / currentSpend) * 100
        : 0;

    const budgetGap = recommendedBudget - currentSpend;
    const missedCustomers = budgetGap > 0 ? Math.floor(budgetGap / avgCPA) : 0;
    const missedRevenue = missedCustomers * customerValue;

    let status: "underspending" | "close" | "overspending" = "underspending";
    if (currentSpend >= recommendedBudget * 0.8) status = "close";
    if (currentSpend >= recommendedBudget) status = "overspending";

    return {
      customersNeeded,
      recommendedBudget: Math.round(recommendedBudget),
      cpaMin: bench.cpaMin,
      cpaMax: bench.cpaMax,
      avgCPA: Math.round(avgCPA),
      roi: Math.round(roi),
      budgetGap: Math.round(Math.max(0, budgetGap)),
      missedRevenue: Math.round(missedRevenue),
      status,
      estimatedNewCustomers,
    };
  }, [revenueGoal, customerValue, currentSpend, industry]);

  return (
    <div className="min-h-screen bg-black">
      {/* ======================== HERO ======================== */}
      <section className="relative overflow-hidden border-b border-white/5">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />
        </div>

        <div className="container relative mx-auto px-4 pb-12 pt-24 text-center md:pb-16 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
              <Calculator className="h-4 w-4" />
              {t("roi.badge")}
            </div>
            <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t("roi.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              {t("roi.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======================== CALCULATOR ======================== */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          {/* --- Input Panel --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="mb-1 text-xl font-bold text-white">
                {t("roi.inputsTitle")}
              </h2>
              <p className="text-sm text-white/50">{t("roi.inputsSubtitle")}</p>
            </div>

            <DollarInput
              id="revenue-goal"
              label={t("roi.revenueGoal")}
              value={revenueGoal}
              onChange={setRevenueGoal}
              min={0}
              max={500000}
              step={1000}
            />

            <DollarInput
              id="customer-value"
              label={t("roi.customerValue")}
              value={customerValue}
              onChange={setCustomerValue}
              min={0}
              max={50000}
              step={50}
            />

            <DollarInput
              id="current-spend"
              label={t("roi.currentSpend")}
              value={currentSpend}
              onChange={setCurrentSpend}
              min={0}
              max={100000}
              step={100}
            />

            {/* Industry Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                {t("roi.industry")}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSelectOpen(!selectOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-lg font-semibold text-white transition-all hover:border-white/20 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/30"
                >
                  <span>{t(`roi.industry.${industry}`)}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-white/40 transition-transform ${
                      selectOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {selectOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-20 mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 py-1 shadow-2xl"
                  >
                    {INDUSTRY_KEYS.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setIndustry(key);
                          setSelectOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${
                          industry === key
                            ? "bg-red-500/10 text-red-400"
                            : "text-white/80"
                        }`}
                      >
                        {t(`roi.industry.${key}`)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* --- Results Panel --- */}
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="mb-1 text-xl font-bold text-white">
                {t("roi.resultsTitle")}
              </h2>
              <p className="text-sm text-white/50">{t("roi.resultsSubtitle")}</p>
            </div>

            {/* Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard icon={Users} label={t("roi.customersNeeded")}>
                <AnimatedNumber value={results.customersNeeded} suffix={` ${t("roi.perMonth")}`} />
              </ResultCard>

              <ResultCard icon={Target} label={t("roi.recommendedBudget")}>
                <AnimatedNumber value={results.recommendedBudget} prefix="$" suffix={` ${t("roi.perMonth")}`} />
              </ResultCard>

              <ResultCard icon={DollarSign} label={t("roi.estimatedCPA")}>
                <span>
                  ${results.cpaMin} &ndash; ${results.cpaMax}
                </span>
              </ResultCard>

              <ResultCard
                icon={TrendingUp}
                label={t("roi.expectedROI")}
                color={
                  currentSpend === 0
                    ? "white"
                    : results.roi >= 200
                    ? "green"
                    : results.roi >= 100
                    ? "amber"
                    : "red"
                }
              >
                {currentSpend > 0 ? (
                  <AnimatedNumber value={results.roi} suffix="%" />
                ) : (
                  <span className="text-lg text-white/40">{t("roi.enterSpend")}</span>
                )}
              </ResultCard>
            </div>

            {/* ======================== GAP ANALYSIS ======================== */}
            <motion.div
              key={`${results.status}-${results.budgetGap}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl border p-6 ${
                results.status === "underspending"
                  ? "border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-900/5"
                  : results.status === "close"
                  ? "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-900/5"
                  : "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-900/5"
              }`}
            >
              <div className="mb-3 flex items-center gap-2">
                {results.status === "underspending" ? (
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                ) : results.status === "close" ? (
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                )}
                <h3 className="font-semibold text-white">
                  {t("roi.gapAnalysis")}
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                {/* Spend comparison */}
                <p className="text-white/80">
                  {t("roi.youreSpending")}{" "}
                  <span className="font-bold text-white">
                    ${currentSpend.toLocaleString()}
                  </span>
                  .{" "}
                  {t("roi.youShouldSpend")}{" "}
                  <span className="font-bold text-white">
                    ${results.recommendedBudget.toLocaleString()}
                  </span>
                  .
                  {results.budgetGap > 0 && (
                    <>
                      {" "}
                      {t("roi.thatsAGap")}{" "}
                      <span className="font-bold text-red-400">
                        ${results.budgetGap.toLocaleString()}
                      </span>
                      .
                    </>
                  )}
                </p>

                {/* Status message */}
                {results.status === "underspending" && results.missedRevenue > 0 && (
                  <p className="font-medium text-red-300">
                    {t("roi.leavingOnTable")}{" "}
                    <span className="text-lg font-bold text-red-400">
                      ${results.missedRevenue.toLocaleString()}
                    </span>{" "}
                    {t("roi.everyMonth")}
                  </p>
                )}

                {results.status === "close" && (
                  <p className="font-medium text-amber-300">
                    {t("roi.almostThere")}
                  </p>
                )}

                {results.status === "overspending" && (
                  <p className="font-medium text-emerald-300">
                    {t("roi.goodNews")}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Quick CTA inside results */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposals"
                onClick={() =>
                  track("cta_click", {
                    cta_type: "roi_calculator",
                    location: "results_panel",
                    destination: "proposals",
                  })
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                {t("roi.ctaBuildPlan")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/assessment"
                onClick={() =>
                  track("cta_click", {
                    cta_type: "roi_calculator",
                    location: "results_panel",
                    destination: "assessment",
                  })
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("roi.ctaGetAssessment")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================== BOTTOM CTA ======================== */}
      <CTABanner />
    </div>
  );
}
