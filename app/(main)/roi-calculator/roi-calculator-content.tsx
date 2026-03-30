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
  Megaphone,
  Wrench,
  Monitor,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { CTABanner } from "@/components/sections/cta-banner";

/* ------------------------------------------------------------------ */
/*  Industry Benchmarks (CPAs raised ~25% to reflect 2026 ad costs)    */
/* ------------------------------------------------------------------ */

type Industry =
  | "restaurants"
  | "beauty"
  | "homeServices"
  | "ecommerce"
  | "professional"
  | "healthcare"
  | "fitness"
  | "automotive"
  | "realestate"
  | "legal"
  | "education"
  | "other";

interface IndustryBenchmark {
  cpaMin: number;
  cpaMax: number;
  budgetPercent: number;
  adSpendRatio: number; // percentage of budget that goes to ad spend (rest is labor/agency)
}

const INDUSTRY_BENCHMARKS: Record<Industry, IndustryBenchmark> = {
  restaurants:    { cpaMin: 38,  cpaMax: 63,  budgetPercent: 0.08, adSpendRatio: 0.45 },
  beauty:         { cpaMin: 50,  cpaMax: 100, budgetPercent: 0.10, adSpendRatio: 0.40 },
  homeServices:   { cpaMin: 63,  cpaMax: 125, budgetPercent: 0.10, adSpendRatio: 0.50 },
  ecommerce:      { cpaMin: 25,  cpaMax: 75,  budgetPercent: 0.12, adSpendRatio: 0.55 },
  professional:   { cpaMin: 100, cpaMax: 188, budgetPercent: 0.12, adSpendRatio: 0.40 },
  healthcare:     { cpaMin: 75,  cpaMax: 150, budgetPercent: 0.10, adSpendRatio: 0.45 },
  fitness:        { cpaMin: 44,  cpaMax: 88,  budgetPercent: 0.10, adSpendRatio: 0.45 },
  automotive:     { cpaMin: 63,  cpaMax: 125, budgetPercent: 0.08, adSpendRatio: 0.55 },
  realestate:     { cpaMin: 88,  cpaMax: 175, budgetPercent: 0.12, adSpendRatio: 0.50 },
  legal:          { cpaMin: 125, cpaMax: 250, budgetPercent: 0.12, adSpendRatio: 0.45 },
  education:      { cpaMin: 50,  cpaMax: 100, budgetPercent: 0.10, adSpendRatio: 0.40 },
  other:          { cpaMin: 50,  cpaMax: 100, budgetPercent: 0.10, adSpendRatio: 0.45 },
};

const INDUSTRY_KEYS: Industry[] = [
  "restaurants",
  "beauty",
  "fitness",
  "homeServices",
  "healthcare",
  "automotive",
  "realestate",
  "ecommerce",
  "professional",
  "legal",
  "education",
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

  const [currentRevenue, setCurrentRevenue] = useState(5000);
  const [revenueGoal, setRevenueGoal] = useState(10000);
  const [customerValue, setCustomerValue] = useState(500);
  const [currentSpend, setCurrentSpend] = useState(0);
  const [industry, setIndustry] = useState<Industry>("other");
  const [selectOpen, setSelectOpen] = useState(false);

  const hasInteracted = useRef(false);
  useEffect(() => {
    if (!hasInteracted.current && (currentRevenue !== 5000 || revenueGoal !== 10000 || customerValue !== 500 || currentSpend !== 0 || industry !== "other")) {
      hasInteracted.current = true;
      track("button_click", { cta_type: "roi_calculator", action: "first_interaction" });
    }
  }, [currentRevenue, revenueGoal, customerValue, currentSpend, industry]);

  const results = useMemo(() => {
    const bench = INDUSTRY_BENCHMARKS[industry];
    const growthNeeded = Math.max(0, revenueGoal - currentRevenue);
    const newCustomersNeeded = customerValue > 0 ? Math.ceil(growthNeeded / customerValue) : 0;
    const avgCPA = (bench.cpaMin + bench.cpaMax) / 2;

    // Recommended budget driven by MULTIPLE factors, not just a flat %:
    //
    // 1. Acquisition cost: how much it costs to get the new customers you need
    const acquisitionBudget = newCustomersNeeded * avgCPA;
    //
    // 2. Maintenance budget: you still need to spend to KEEP current customers
    //    and maintain brand presence (typically 3-5% of current revenue)
    const maintenanceBudget = currentRevenue * 0.04;
    //
    // 3. Industry floor: minimum spend based on industry norms (% of goal)
    const industryFloor = revenueGoal * bench.budgetPercent;
    //
    // The recommended budget is the acquisition cost + maintenance,
    // but never below the industry floor
    const recommendedBudget = Math.max(
      acquisitionBudget + maintenanceBudget,
      industryFloor
    );

    // Dynamic ad spend ratio based on budget size and growth stage:
    // Smaller budgets need more creative/strategy (more agency labor)
    // Larger budgets can shift more to ad spend once foundation is built
    // Also varies by industry base ratio
    let dynamicAdRatio = bench.adSpendRatio;
    if (recommendedBudget < 1000) {
      // Small budget: mostly creative/strategy, minimal ads
      dynamicAdRatio = Math.max(0.2, bench.adSpendRatio - 0.15);
    } else if (recommendedBudget < 2500) {
      // Medium small: balanced but still more creative
      dynamicAdRatio = Math.max(0.3, bench.adSpendRatio - 0.05);
    } else if (recommendedBudget > 5000) {
      // Larger budget: shift more to ads since creative foundation is covered
      dynamicAdRatio = Math.min(0.65, bench.adSpendRatio + 0.1);
    } else if (recommendedBudget > 10000) {
      // Big budget: heavy ad spend
      dynamicAdRatio = Math.min(0.70, bench.adSpendRatio + 0.15);
    }

    const adSpend = Math.round(recommendedBudget * dynamicAdRatio);
    const laborSpend = Math.round(recommendedBudget * (1 - dynamicAdRatio));

    // ROI multiplier: for every $1 invested, how much revenue comes back
    const expectedRevenue = newCustomersNeeded * customerValue;
    const roiMultiplier = recommendedBudget > 0 ? (expectedRevenue + currentRevenue) / recommendedBudget : 0;

    // What current spend is likely generating
    const estimatedNewCustomers = currentSpend > 0 ? Math.floor(currentSpend / avgCPA) : 0;

    const budgetGap = recommendedBudget - currentSpend;
    const missedCustomers = budgetGap > 0 ? Math.floor(budgetGap / avgCPA) : 0;
    const missedRevenue = missedCustomers * customerValue;

    // Growth percentage needed
    const growthPercent = currentRevenue > 0 ? Math.round((growthNeeded / currentRevenue) * 100) : 0;

    let status: "underspending" | "close" | "overspending" = "underspending";
    if (currentSpend >= recommendedBudget * 0.8) status = "close";
    if (currentSpend >= recommendedBudget) status = "overspending";

    return {
      newCustomersNeeded,
      growthNeeded,
      growthPercent,
      recommendedBudget: Math.round(recommendedBudget),
      adSpend,
      laborSpend,
      adSpendPercent: Math.round(dynamicAdRatio * 100),
      laborSpendPercent: Math.round((1 - dynamicAdRatio) * 100),
      cpaMin: bench.cpaMin,
      cpaMax: bench.cpaMax,
      avgCPA: Math.round(avgCPA),
      roiMultiplier: Math.round(roiMultiplier * 10) / 10,
      budgetGap: Math.round(Math.max(0, budgetGap)),
      missedRevenue: Math.round(missedRevenue),
      status,
      estimatedNewCustomers,
    };
  }, [currentRevenue, revenueGoal, customerValue, currentSpend, industry]);

  return (
    <div className="min-h-screen bg-black">
      {/* ======================== HERO ======================== */}
      <section className="relative overflow-hidden border-b border-white/5">
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
              id="current-revenue"
              label={t("roi.currentRevenue")}
              value={currentRevenue}
              onChange={setCurrentRevenue}
              min={0}
              max={500000}
              step={500}
            />

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
                    className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-white/10 bg-zinc-900 py-1 shadow-2xl"
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

            {/* Growth snapshot */}
            {results.growthNeeded > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                {t("roi.growthSnapshot")}{" "}
                <span className="font-bold text-white">${currentRevenue.toLocaleString()}</span>
                {" "}{t("roi.to")}{" "}
                <span className="font-bold text-white">${revenueGoal.toLocaleString()}</span>
                {" = "}
                <span className="font-bold text-red-400">{results.growthPercent}% {t("roi.growth")}</span>
                {". "}
                {t("roi.youNeed")}{" "}
                <span className="font-bold text-white">{results.newCustomersNeeded}</span>
                {" "}{t("roi.newCustomers")}.
              </div>
            )}

            {/* Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard icon={Users} label={t("roi.customersNeeded")}>
                <AnimatedNumber value={results.newCustomersNeeded} suffix={` ${t("roi.perMonth")}`} />
              </ResultCard>

              <ResultCard icon={Target} label={t("roi.recommendedBudget")}>
                <AnimatedNumber value={results.recommendedBudget} prefix="$" suffix={t("roi.mo")} />
              </ResultCard>

              <ResultCard icon={DollarSign} label={t("roi.estimatedCPA")}>
                <span>${results.cpaMin} to ${results.cpaMax}</span>
              </ResultCard>

              <ResultCard
                icon={TrendingUp}
                label={t("roi.expectedROI")}
                color={
                  results.roiMultiplier >= 5 ? "green" : results.roiMultiplier >= 3 ? "amber" : "white"
                }
              >
                <AnimatedNumber value={results.roiMultiplier} suffix="x return" decimals={1} />
              </ResultCard>
            </div>

            {/* ======================== BUDGET BREAKDOWN ======================== */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <BarChart3 className="h-4 w-4 text-red-400" />
                {t("roi.budgetBreakdown")}
              </h3>

              {/* Visual bar */}
              <div className="mb-2 flex h-4 overflow-hidden rounded-full">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                  style={{ width: `${results.adSpendPercent}%` }}
                />
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${results.laborSpendPercent}%` }}
                />
              </div>
              <div className="mb-4 flex justify-between text-[10px] text-white/40">
                <span className="text-red-400">{results.adSpendPercent}% ads</span>
                <span className="text-blue-400">{results.laborSpendPercent}% creative</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Ad Spend */}
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-red-400" />
                    <span className="text-xs font-medium text-white/60">{t("roi.adSpend")} ({results.adSpendPercent}%)</span>
                  </div>
                  <p className="text-xl font-bold text-white">
                    <AnimatedNumber value={results.adSpend} prefix="$" suffix={t("roi.mo")} />
                  </p>
                  <p className="mt-1 text-xs text-white/40">{t("roi.adSpendDesc")}</p>
                </div>

                {/* Agency/Labor */}
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-medium text-white/60">{t("roi.laborSpend")} ({results.laborSpendPercent}%)</span>
                  </div>
                  <p className="text-xl font-bold text-white">
                    <AnimatedNumber value={results.laborSpend} prefix="$" suffix={t("roi.mo")} />
                  </p>
                  <p className="mt-1 text-xs text-white/40">{t("roi.laborSpendDesc")}</p>
                </div>
              </div>
            </div>

            {/* ======================== ROI EXPLANATION ======================== */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-red-400" />
                <h3 className="text-sm font-semibold text-white">{t("roi.roiExplained")}</h3>
              </div>
              <p className="text-sm text-white/50">
                {t("roi.roiExplainedDesc")}
                {" "}
                <span className="font-semibold text-white">
                  ${results.recommendedBudget.toLocaleString()}
                </span>
                {" "}{t("roi.roiExplainedDesc2")}{" "}
                <span className="font-semibold text-white">
                  ${(results.newCustomersNeeded * customerValue).toLocaleString()}
                </span>
                {" "}{t("roi.roiExplainedDesc3")}{" "}
                <span className={`font-bold ${results.roiMultiplier >= 5 ? "text-emerald-400" : results.roiMultiplier >= 3 ? "text-amber-400" : "text-red-400"}`}>
                  {results.roiMultiplier}x
                </span>
                {" "}{t("roi.roiExplainedDesc4")}
              </p>
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

            {/* Quick CTA */}
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

      {/* ======================== HOW WE CALCULATE THIS ======================== */}
      <section className="border-t border-white/5 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-white">
              {t("roi.methodology.title")}
            </h2>

            <div className="space-y-6 text-sm leading-relaxed text-white/60">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-base font-semibold text-white">{t("roi.methodology.customersTitle")}</h3>
                <p>{t("roi.methodology.customersDesc")}</p>
                <div className="mt-3 rounded-lg bg-white/5 p-3 font-mono text-xs text-red-300">
                  ({t("roi.revenueGoal")} &minus; {t("roi.currentRevenue")}) &divide; {t("roi.customerValue")} = {t("roi.customersNeeded")}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-base font-semibold text-white">{t("roi.methodology.budgetTitle")}</h3>
                <p>{t("roi.methodology.budgetDesc")}</p>
                <div className="mt-3 space-y-2 rounded-lg bg-white/5 p-3 font-mono text-xs text-red-300">
                  <div>{t("roi.methodology.acquisition")}: {t("roi.customersNeeded")} &times; {t("roi.methodology.avgCPA")} = {t("roi.methodology.acquisitionCost")}</div>
                  <div>{t("roi.methodology.maintenance")}: {t("roi.currentRevenue")} &times; 4% = {t("roi.methodology.maintenanceCost")}</div>
                  <div>{t("roi.recommendedBudget")} = max({t("roi.methodology.acquisitionCost")} + {t("roi.methodology.maintenanceCost")}, {t("roi.methodology.industryFloor")})</div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-base font-semibold text-white">{t("roi.methodology.splitTitle")}</h3>
                <p>{t("roi.methodology.splitDesc")}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-base font-semibold text-white">{t("roi.methodology.roiTitle")}</h3>
                <p>{t("roi.methodology.roiDesc")}</p>
                <div className="mt-3 rounded-lg bg-white/5 p-3 font-mono text-xs text-red-300">
                  ({t("roi.methodology.newRevenue")} + {t("roi.currentRevenue")}) &divide; {t("roi.recommendedBudget")} = ROI {t("roi.methodology.multiplier")}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-base font-semibold text-white">{t("roi.methodology.gapTitle")}</h3>
                <p>{t("roi.methodology.gapDesc")}</p>
              </div>

              <p className="text-xs text-white/30">
                {t("roi.methodology.disclaimer")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
