"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useSpamProtection } from "@/lib/use-spam-protection";

export function NewsletterSignup() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { honeypot, setHoneypot, spamFields } = useSpamProtection();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || undefined,
          email: form.email,
          phone: form.phone || undefined,
          ...spamFields,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "" });
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
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            if (status === "error") setStatus("idle");
          }}
          placeholder={t("newsletter.namePlaceholder")}
          className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-red-500 sm:w-1/3"
        />
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            if (status === "error") setStatus("idle");
          }}
          placeholder={t("newsletter.placeholder")}
          className="w-full flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-red-500"
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder={t("newsletter.phonePlaceholder")}
          className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-red-500 sm:w-1/3"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex-1 shrink-0 rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          {status === "loading" ? "..." : t("newsletter.submit")}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400">{t("newsletter.error")}</p>
      )}
    </form>
  );
}
