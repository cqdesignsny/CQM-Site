"use client";

import { useReducer, useState } from "react";
import { useProposalLocale } from "@/lib/i18n";
import { t } from "@/lib/proposals/translations";
import type { Locale, AssessmentAnswer, CategoryScore } from "@/lib/proposals/types";
import { ASSESSMENT_QUESTIONS, TOTAL_QUESTIONS } from "@/lib/assessment/questions";
import { QuestionCard } from "./question-card";
import { ScoreDisplay } from "./score-display";
import { Recommendations } from "./recommendations";
import {
  ArrowRight,
  ArrowLeft,
  ClipboardCheck,
  Loader2,
  Mail,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { track } from "@/lib/analytics";

/* ───────────────────── State ───────────────────── */

interface AssessmentState {
  step: "intro" | "questions" | "contact" | "results";
  currentQuestion: number;
  answers: Map<string, AssessmentAnswer>;
  contact: { name: string; email: string; phone: string };
  isSubmitting: boolean;
  results: {
    assessmentId: string;
    overallScore: number;
    categoryScores: CategoryScore[];
    recommendedServices: string[];
  } | null;
  error: string | null;
}

type AssessmentAction =
  | { type: "SET_STEP"; step: AssessmentState["step"] }
  | { type: "NEXT_QUESTION" }
  | { type: "PREV_QUESTION" }
  | { type: "SET_ANSWER"; questionId: string; optionIndex: number; score: number }
  | { type: "UPDATE_CONTACT"; field: "name" | "email" | "phone"; value: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; results: AssessmentState["results"] }
  | { type: "SUBMIT_ERROR"; error: string };

const initialState: AssessmentState = {
  step: "intro",
  currentQuestion: 0,
  answers: new Map(),
  contact: { name: "", email: "", phone: "" },
  isSubmitting: false,
  results: null,
  error: null,
};

function assessmentReducer(
  state: AssessmentState,
  action: AssessmentAction
): AssessmentState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "NEXT_QUESTION":
      return { ...state, currentQuestion: Math.min(state.currentQuestion + 1, TOTAL_QUESTIONS - 1) };
    case "PREV_QUESTION":
      return { ...state, currentQuestion: Math.max(state.currentQuestion - 1, 0) };
    case "SET_ANSWER": {
      const answers = new Map(state.answers);
      answers.set(action.questionId, {
        questionId: action.questionId,
        selectedOptionIndex: action.optionIndex,
        score: action.score,
      });
      return { ...state, answers };
    }
    case "UPDATE_CONTACT":
      return { ...state, contact: { ...state.contact, [action.field]: action.value } };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, error: null };
    case "SUBMIT_SUCCESS":
      return { ...state, isSubmitting: false, results: action.results, step: "results" };
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false, error: action.error };
    default:
      return state;
  }
}

/* ───────────────────── Share Results ───────────────────── */

function ShareResults({
  assessmentId,
  overallScore,
  contactName,
  contactEmail,
  locale,
}: {
  assessmentId: string;
  overallScore: number;
  contactName: string;
  contactEmail: string;
  locale: Locale;
}) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const pt = (key: string) => t(key, locale);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/assessment?results=${assessmentId}`
    : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pt("share.shareTitle").replace("{score}", String(overallScore)),
          text: pt("share.shareText")
            .replace("{name}", contactName)
            .replace("{score}", String(overallScore)),
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    }
  };

  const handleSendEmail = async () => {
    if (!email.trim()) return;
    setSending(true);
    setEmailError(null);

    try {
      const response = await fetch("/api/assessment/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId,
          recipientEmail: email,
          senderName: contactName,
          senderEmail: contactEmail,
          overallScore,
          locale,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setEmailError(data.error || pt("share.failedToSend"));
      } else {
        setSent(true);
        setEmail("");
        setTimeout(() => {
          setSent(false);
          setShowEmailForm(false);
        }, 3000);
      }
    } catch {
      setEmailError(pt("share.networkError"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="mb-4 text-sm font-semibold text-white">
        {pt("share.title")}
      </h3>
      <div className="flex flex-wrap gap-3">
        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              {pt("share.copied")}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {pt("share.copyLink")}
            </>
          )}
        </button>

        {/* Email */}
        <button
          onClick={() => setShowEmailForm(!showEmailForm)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
        >
          <Mail className="h-4 w-4" />
          {pt("share.emailResults")}
        </button>

        {/* Native share (mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            <Share2 className="h-4 w-4" />
            {pt("share.share")}
          </button>
        )}
      </div>

      {/* Email form */}
      {showEmailForm && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={pt("share.emailPlaceholder")}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
          />
          <button
            onClick={handleSendEmail}
            disabled={!email.trim() || sending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : sent ? (
              <>
                <Check className="h-4 w-4" />
                {pt("share.sent")}
              </>
            ) : (
              pt("share.send")
            )}
          </button>
        </div>
      )}
      {emailError && (
        <p className="mt-2 text-xs text-red-400">{emailError}</p>
      )}
    </div>
  );
}

/* ───────────────────── Main Component ───────────────────── */

export function MarketingAssessment() {
  const { locale, pt } = useProposalLocale();
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const currentQ = ASSESSMENT_QUESTIONS[state.currentQuestion];
  const currentAnswer = state.answers.get(currentQ?.id ?? "");
  const progress = ((state.currentQuestion + 1) / TOTAL_QUESTIONS) * 100;
  const allAnswered = state.answers.size === TOTAL_QUESTIONS;

  const handleSubmit = async () => {
    if (!state.contact.name.trim() || !state.contact.email.trim()) return;
    dispatch({ type: "SUBMIT_START" });

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          contact: state.contact,
          answers: Array.from(state.answers.values()),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        dispatch({ type: "SUBMIT_ERROR", error: data.error || "Something went wrong" });
        return;
      }

      dispatch({
        type: "SUBMIT_SUCCESS",
        results: {
          assessmentId: data.assessmentId,
          overallScore: data.overallScore,
          categoryScores: data.categoryScores,
          recommendedServices: data.recommendedServices,
        },
      });

      track("assessment_completed" as never, {
        score: data.overallScore,
        assessmentId: data.assessmentId,
      });
    } catch {
      dispatch({ type: "SUBMIT_ERROR", error: "Network error. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 pb-20">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="brand-section-title mb-1">
              {pt("assessment.title")}
            </p>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {pt("assessment.subtitle")}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* INTRO STEP */}
        {state.step === "intro" && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10">
              <ClipboardCheck className="h-10 w-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {pt("assessment.evaluateTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
              {pt("assessment.evaluateDesc").replace("{n}", String(TOTAL_QUESTIONS))}
            </p>
            <p className="mt-2 text-xs text-white/30">
              {pt("assessment.evaluateTime")}
            </p>
            <button
              onClick={() => {
                dispatch({ type: "SET_STEP", step: "questions" });
                track("assessment_started" as never);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              {pt("assessment.start")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* QUESTIONS STEP */}
        {state.step === "questions" && currentQ && (
          <div>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between text-xs text-white/40">
                <span>
                  {pt("assessment.question")}{" "}
                  {state.currentQuestion + 1} / {TOTAL_QUESTIONS}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-red-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <QuestionCard
              question={currentQ}
              locale={locale}
              selectedIndex={currentAnswer?.selectedOptionIndex ?? null}
              onSelect={(optionIndex, score) =>
                dispatch({
                  type: "SET_ANSWER",
                  questionId: currentQ.id,
                  optionIndex,
                  score,
                })
              }
            />

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => {
                  if (state.currentQuestion === 0) {
                    dispatch({ type: "SET_STEP", step: "intro" });
                  } else {
                    dispatch({ type: "PREV_QUESTION" });
                  }
                }}
                className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {pt("assessment.previous")}
              </button>

              {state.currentQuestion < TOTAL_QUESTIONS - 1 ? (
                <button
                  onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                  disabled={!currentAnswer}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-30"
                >
                  {pt("assessment.next")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => dispatch({ type: "SET_STEP", step: "contact" })}
                  disabled={!allAnswered}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-30"
                >
                  {pt("assessment.seeResults")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* CONTACT STEP (lead gate before results) */}
        {state.step === "contact" && (
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white">
                {pt("assessment.almostThere")}
              </h2>
              <p className="mt-2 text-sm text-white/50">
                {pt("assessment.contactDesc")}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">
                  {pt("form.name")} *
                </label>
                <input
                  type="text"
                  value={state.contact.name}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_CONTACT", field: "name", value: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">
                  {pt("form.email")} *
                </label>
                <input
                  type="email"
                  value={state.contact.email}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_CONTACT", field: "email", value: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">
                  {pt("form.phone")}
                </label>
                <input
                  type="tel"
                  value={state.contact.phone}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_CONTACT", field: "phone", value: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
                />
              </div>
            </div>

            {state.error && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {state.error}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => dispatch({ type: "SET_STEP", step: "questions" })}
                className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {pt("btn.back")}
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  !state.contact.name.trim() ||
                  !state.contact.email.trim() ||
                  state.isSubmitting
                }
                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {state.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {pt("assessment.calculating")}
                  </>
                ) : (
                  <>
                    {pt("assessment.seeResults")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* RESULTS STEP */}
        {state.step === "results" && state.results && (
          <div className="space-y-8">
            <ScoreDisplay
              overallScore={state.results.overallScore}
              categoryScores={state.results.categoryScores}
              locale={locale}
            />
            <Recommendations
              recommendedServices={state.results.recommendedServices}
              assessmentId={state.results.assessmentId}
              locale={locale}
            />
            <ShareResults
              assessmentId={state.results.assessmentId}
              overallScore={state.results.overallScore}
              contactName={state.contact.name}
              contactEmail={state.contact.email}
              locale={locale}
            />
          </div>
        )}
      </div>
    </div>
  );
}
