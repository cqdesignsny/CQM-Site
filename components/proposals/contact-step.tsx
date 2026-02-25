"use client";

import type { Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import { formatCurrency } from "@/lib/proposals/calculations";
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface Totals {
  oneTimeTotal: number;
  monthlyTotal: number;
  hostingFee: number;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
}

interface Props {
  contact: { name: string; email: string; phone: string };
  referredBy: string;
  locale: Locale;
  isSubmitting: boolean;
  submitError: string | null;
  submitResult: { proposalId: string; viewUrl: string } | null;
  totals: Totals;
  serviceCount: number;
  onUpdateContact: (field: "name" | "email" | "phone", value: string) => void;
  onSetReferredBy: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onReset: () => void;
}

export function ContactStep({
  contact,
  referredBy,
  locale,
  isSubmitting,
  submitError,
  submitResult,
  totals,
  serviceCount,
  onUpdateContact,
  onSetReferredBy,
  onSubmit,
  onBack,
  onReset,
}: Props) {
  const isValid = contact.name.trim().length > 0 && contact.email.trim().length > 0;

  // Success state
  if (submitResult) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-400" />
          <h2 className="text-2xl font-bold text-white">
            {t("success.title", locale)}
          </h2>
          <p className="mt-2 text-sm text-white/60">
            {t("success.message", locale)}
          </p>

          <div className="mt-6 space-y-3">
            <a
              href={submitResult.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <ExternalLink className="h-4 w-4" />
              {t("success.viewLink", locale)}
            </a>
            <button
              onClick={onReset}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
            >
              <RefreshCw className="h-4 w-4" />
              {t("success.buildAnother", locale)}
            </button>
          </div>

          {/* Shareable link */}
          <div className="mt-6 rounded-lg border border-white/10 bg-black/30 p-3">
            <p className="mb-2 text-xs text-white/40">Shareable link:</p>
            <code className="block break-all text-xs text-white/70">
              {typeof window !== "undefined"
                ? `${window.location.origin}${submitResult.viewUrl}`
                : submitResult.viewUrl}
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white">
          {t("contact.title", locale)}
        </h2>
        <p className="mt-2 text-sm text-white/50">
          {t("contact.subtitle", locale)}
        </p>
      </div>

      {/* Summary badge */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <span className="text-sm text-white/60">
          {serviceCount} {t("sidebar.serviceCount", locale)}
        </span>
        <span className="text-lg font-bold text-red-400">
          {formatCurrency(totals.grandTotal)}
        </span>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/70">
            {t("form.name", locale)} *
          </label>
          <input
            type="text"
            value={contact.name}
            onChange={(e) => onUpdateContact("name", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/70">
            {t("form.email", locale)} *
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => onUpdateContact("email", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/70">
            {t("form.phone", locale)}
          </label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => onUpdateContact("phone", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/70">
            {t("form.referredBy", locale)}
          </label>
          <input
            type="text"
            value={referredBy}
            onChange={(e) => onSetReferredBy(e.target.value)}
            placeholder={t("form.referredByPlaceholder", locale)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
          />
        </div>
      </div>

      {/* Error message */}
      {submitError && (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {submitError}
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("btn.back", locale)}
        </button>
        <button
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("form.sending", locale)}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("btn.send", locale)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
