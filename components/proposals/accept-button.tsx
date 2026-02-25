"use client";

import { useState } from "react";
import type { Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import { Check, Loader2 } from "lucide-react";

interface Props {
  proposalId: string;
  locale: Locale;
}

export function AcceptButton({ proposalId, locale }: Props) {
  const [status, setStatus] = useState<"idle" | "confirming" | "loading" | "accepted" | "error">("idle");
  const [acceptedDate, setAcceptedDate] = useState<string | null>(null);

  const handleAccept = async () => {
    if (status === "idle") {
      setStatus("confirming");
      return;
    }

    if (status !== "confirming") return;

    setStatus("loading");

    try {
      const response = await fetch(`/api/proposals/${proposalId}/accept`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        return;
      }

      if (data.alreadyAccepted) {
        setAcceptedDate(data.acceptedAt);
      } else {
        setAcceptedDate(data.acceptedAt);
      }
      setStatus("accepted");
    } catch {
      setStatus("error");
    }
  };

  if (status === "accepted") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-6 py-3">
        <Check className="h-5 w-5 text-green-400" />
        <span className="text-sm font-semibold text-green-300">
          {t("proposal.accepted", locale)}
          {acceptedDate && (
            <span className="ml-2 font-normal text-green-400/60">
              {new Date(acceptedDate).toLocaleDateString(
                locale === "es" ? "es-US" : locale === "fr" ? "fr-FR" : "en-US",
                { month: "short", day: "numeric", year: "numeric" }
              )}
            </span>
          )}
        </span>
      </div>
    );
  }

  if (status === "confirming") {
    return (
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <p className="text-sm text-white/60">
          {t("proposal.acceptConfirm", locale)}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            {t("btn.continue", locale)}
          </button>
          <button
            onClick={() => setStatus("idle")}
            className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            {t("btn.back", locale)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleAccept}
      disabled={status === "loading"}
      className="flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
    >
      {status === "loading" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{t("form.sending", locale)}</span>
        </>
      ) : status === "error" ? (
        <span>{t("btn.tryAgain", locale)}</span>
      ) : (
        <>
          <Check className="h-4 w-4" />
          {t("proposal.accept", locale)}
        </>
      )}
    </button>
  );
}
