"use client";

import type { Locale } from "@/lib/proposals/types";
import type { AssessmentQuestion } from "@/lib/assessment/questions";
import { CATEGORIES } from "@/lib/proposals/services-data";

interface Props {
  question: AssessmentQuestion;
  locale: Locale;
  selectedIndex: number | null;
  onSelect: (optionIndex: number, score: number) => void;
}

export function QuestionCard({
  question,
  locale,
  selectedIndex,
  onSelect,
}: Props) {
  const category = CATEGORIES.find((c) => c.id === question.category);
  const questionText = locale === "es" ? question.question_es : locale === "fr" ? question.question_fr : question.question;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      {/* Category badge */}
      {category && (
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
          <span>{category.icon}</span>
          {locale === "es" ? category.name_es : locale === "fr" ? category.name_fr : category.name}
        </span>
      )}

      <h2 className="text-lg font-semibold text-white sm:text-xl">
        {questionText}
      </h2>

      <div className="mt-6 space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selectedIndex === i;
          const text = locale === "es" ? option.text_es : locale === "fr" ? option.text_fr : option.text;

          return (
            <button
              key={i}
              onClick={() => onSelect(i, option.score)}
              className={`w-full rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-red-600/50 bg-red-600/10 ring-1 ring-red-600/30"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected
                      ? "border-red-600 bg-red-600"
                      : "border-white/20"
                  }`}
                >
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`text-sm ${isSelected ? "text-white" : "text-white/70"}`}
                >
                  {text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
