"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";

const questions = [
  { key: "hmw.gaps.q1", stage: "Awareness" },
  { key: "hmw.gaps.q2", stage: "Interest" },
  { key: "hmw.gaps.q3", stage: "Decision" },
  { key: "hmw.gaps.q4", stage: "Action" },
];

export function FunnelGapChecker() {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const noCount = Object.values(answers).filter((v) => v === false).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="space-y-4">
        {questions.map((q, index) => {
          const answer = answers[index];
          return (
            <motion.div
              key={q.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl border-2 p-5 transition-all duration-300 ${
                answer === true
                  ? "border-green-500/50 bg-green-500/5"
                  : answer === false
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-border hover:border-border/80 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {q.stage}
                  </span>
                  <p className="font-medium">{t(q.key)}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [index]: true }));
                      track("button_click", { button_type: "gap_check", question: q.stage, answer: "yes" });
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
                      answer === true
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-border hover:border-green-500/50 hover:bg-green-500/10"
                    }`}
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [index]: false }));
                      track("button_click", { button_type: "gap_check", question: q.stage, answer: "no" });
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
                      answer === false
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-border hover:border-red-500/50 hover:bg-red-500/10"
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Result */}
      {allAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-xl border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/5 p-6 text-center"
        >
          <p className="mb-4 text-lg font-medium">
            {noCount > 0 ? t("hmw.gaps.result") : "Looking good! But there's always room to level up. Want to see the full breakdown?"}
          </p>
          <Button size="lg" asChild>
            <Link
              href="/assessment"
              onClick={() => track("cta_click", { cta_type: "gap_checker_cta", location: "how_marketing_works", gaps: noCount })}
            >
              {t("hmw.gaps.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
