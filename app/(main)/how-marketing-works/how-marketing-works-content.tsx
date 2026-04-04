"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Search, Lightbulb, Rocket, BarChart3, ArrowRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { MarketingFunnel } from "@/components/funnel/marketing-funnel";
import { FunnelGapChecker } from "@/components/funnel/funnel-gap-checker";
import { CTABanner } from "@/components/sections/cta-banner";
import { VerticalText } from "@/components/ui/vertical-text";

const processSteps = [
  {
    icon: Search,
    num: "01",
    titleKey: "process.step1.title",
    descKey: "process.step1.desc",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: Lightbulb,
    num: "02",
    titleKey: "process.step2.title",
    descKey: "process.step2.desc",
    gradient: "from-red-600 to-red-700",
  },
  {
    icon: Rocket,
    num: "03",
    titleKey: "process.step3.title",
    descKey: "process.step3.desc",
    gradient: "from-red-700 to-red-800",
  },
  {
    icon: BarChart3,
    num: "04",
    titleKey: "process.step4.title",
    descKey: "process.step4.desc",
    gradient: "from-red-800 to-red-900",
  },
];

export function HowMarketingWorksContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-black py-20 text-white md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.3),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.15),transparent_40%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-200"
          >
            <Sparkles className="h-4 w-4" />
            {t("hmw.badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {t("hmw.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-white/70"
          >
            {t("hmw.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* The Problem */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <VerticalText text="PROBLEM" side="right" variant="light" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {t("hmw.problem.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-lg leading-relaxed text-muted-foreground"
            >
              {t("hmw.problem.p1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium leading-relaxed"
            >
              {t("hmw.problem.p2")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* The Marketing Funnel */}
      <section className="relative overflow-hidden bg-muted/30 py-20 md:py-28">
        <VerticalText text="STAGES" side="left" variant="light" />
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {t("hmw.funnel.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              {t("hmw.funnel.subtitle")}
            </motion.p>
          </div>

          <MarketingFunnel />
        </div>
      </section>

      {/* Gap Checker */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <VerticalText text="GAPS" side="right" variant="light" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {t("hmw.gaps.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              {t("hmw.gaps.subtitle")}
            </motion.p>
          </div>

          <FunnelGapChecker />
        </div>
      </section>

      {/* The CQM Difference */}
      <section className="relative -mt-px overflow-hidden bg-black py-20 text-white md:py-28">
        <VerticalText text="EDGE" side="left" />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {t("hmw.diff.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-lg leading-relaxed text-white/80"
            >
              {t("hmw.diff.p1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg leading-relaxed text-white/80"
            >
              {t("hmw.diff.p2")}
            </motion.p>

            {/* AI advantage callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-900/10"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">The AI Advantage</h3>
                    <p className="text-white/70">
                      While other agencies are still doing things the old fashioned way, we use AI to research faster, create smarter, optimize in real time, and deliver results at a speed they can&apos;t match. Same quality. Fraction of the time. That&apos;s not the future. That&apos;s right now.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <VerticalText text="PROCESS" side="right" variant="light" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {t("hmw.process.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              {t("hmw.process.subtitle")}
            </motion.p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.titleKey}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-border p-6 transition-all duration-300 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-500/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <div className="relative flex items-start gap-5">
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Step {step.num}
                      </span>
                      <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-red-500">
                        {t(step.titleKey)}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA — red bg, flush with next section */}
      <section className="-mt-px bg-red-600 py-20 text-white md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t("hmw.bottom.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-white/80"
          >
            {t("hmw.bottom.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button size="lg" className="bg-white text-red-600 hover:bg-white/90" asChild>
              <Link
                href="/assessment"
                onClick={() => track("cta_click", { cta_type: "assessment", location: "hmw_bottom" })}
              >
                Take the Marketing Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link
                href="/contact"
                onClick={() => track("cta_click", { cta_type: "strategy_call", location: "hmw_bottom" })}
              >
                Book a Strategy Call
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
