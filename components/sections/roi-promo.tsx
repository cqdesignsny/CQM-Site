"use client";

import Link from "next/link";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Calculator, ArrowRight, TrendingUp, DollarSign, Target } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { VerticalText } from "@/components/ui/vertical-text";

function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(Math.max(0, v)).toLocaleString());

  useEffect(() => {
    const timer = setTimeout(() => spring.set(value), delay * 1000);
    return () => clearTimeout(timer);
  }, [value, spring, delay]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white sm:text-4xl">
        <motion.span>{display}</motion.span>{suffix}
      </div>
      <div className="mt-1 text-sm text-white/50">{label}</div>
    </div>
  );
}

/**
 * ROIPromo — Homepage section promoting the ROI Calculator.
 * Black background with subtle gradients.
 */
export function ROIPromo() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-black">
      <VerticalText text="ROI" side="left" />
      {/* Gradient accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[500px] translate-x-1/2 rounded-full bg-red-600/6 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
              <Calculator className="h-4 w-4" />
              {t("home.roi.badge")}
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {t("home.roi.title")}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-white/60 leading-relaxed">
              {t("home.roi.desc")}
            </p>
          </motion.div>

          {/* Interactive preview stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-12 grid max-w-2xl grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <DollarSign className="h-5 w-5 text-red-400" />
              </div>
              <AnimatedStat value={2500} suffix="/mo" label="Avg. Budget" delay={0.5} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <AnimatedStat value={5} suffix="x" label="Avg. ROI" delay={0.8} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Target className="h-5 w-5 text-amber-400" />
              </div>
              <AnimatedStat value={12} suffix="" label="Industries" delay={1.1} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link
              href="/roi-calculator"
              onClick={() => track("cta_click", { cta_type: "roi_promo", location: "homepage" })}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl hover:scale-[1.02]"
            >
              {t("home.roi.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
