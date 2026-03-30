"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";

export function NewsletterSignup() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-green-400">{t("newsletter.success")}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:gap-0">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder={t("newsletter.placeholder")}
        className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-red-500 sm:rounded-r-none sm:border-r-0"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60 sm:rounded-l-none"
      >
        {status === "loading" ? "..." : t("newsletter.submit")}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400 sm:hidden">{t("newsletter.error")}</p>
      )}
    </form>
  );
}
