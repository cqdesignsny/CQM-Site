"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, ArrowRight, CheckCircle, Clock, FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { VerticalText } from "@/components/ui/vertical-text";

/**
 * AssessmentPromo — Homepage section promoting the free marketing assessment.
 * Red background to stand out visually.
 */
export function AssessmentPromo() {
  const { t } = useLanguage();

  const stats = [
    { icon: FileText, label: t("home.assessment.stat1") },
    { icon: Clock, label: t("home.assessment.stat2") },
    { icon: CheckCircle, label: t("home.assessment.stat3") },
  ];

  return (
    <section className="relative overflow-hidden bg-red-600">
      <VerticalText text="ASSESS" side="right" />
      {/* Subtle pattern overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-red-500/30 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-red-800/40 blur-[80px]" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                <BarChart3 className="h-4 w-4" />
                {t("home.assessment.badge")}
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                {t("home.assessment.title")}
              </h2>
              <p className="mb-8 text-lg text-white/80 leading-relaxed">
                {t("home.assessment.desc")}
              </p>

              {/* Stat pills */}
              <div className="mb-8 flex flex-wrap gap-3">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2"
                    >
                      <Icon className="h-4 w-4 text-white" />
                      <span className="text-sm font-semibold text-white">{stat.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              <Link
                href="/assessment"
                onClick={() => track("cta_click", { cta_type: "assessment_promo", location: "homepage" })}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-red-600 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
              >
                {t("home.assessment.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Visual element: animated assessment mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative w-72">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-4 text-sm font-semibold text-white/90">Your Marketing Score</div>
                  {/* Mock progress bars */}
                  {["Awareness", "Interest", "Decision", "Action"].map((stage, i) => (
                    <motion.div
                      key={stage}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                      className="mb-3"
                    >
                      <div className="mb-1 flex justify-between text-xs text-white/60">
                        <span>{stage}</span>
                        <span>{[85, 62, 40, 73][i]}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${[85, 62, 40, 73][i]}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7 + i * 0.15, duration: 0.8 }}
                          className={`h-full rounded-full ${
                            [85, 62, 40, 73][i] >= 70
                              ? "bg-emerald-400"
                              : [85, 62, 40, 73][i] >= 50
                              ? "bg-amber-400"
                              : "bg-red-300"
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
