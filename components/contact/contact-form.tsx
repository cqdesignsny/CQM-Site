"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Contact Form Component
 * i18n: All labels use the global t() function
 * Wired to POST /api/contact
 */
export function ContactForm() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    track("form_submit", {
      form_type: "contact",
      service: formData.service,
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          serviceInterest: formData.service || undefined,
          message: formData.message,
          locale,
          source: "contact_page",
          referrer: typeof window !== "undefined" ? document.referrer : undefined,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-8 text-center">
        <p className="text-lg font-semibold text-green-600">
          {t("contact.form.success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          {t("contact.form.name")} *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          {t("contact.form.email")} *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          {t("contact.form.phone")}
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium">
          {t("contact.form.service")}
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">{t("contact.form.selectService")}</option>
          <option value="web">{t("service.web")}</option>
          <option value="seo">{t("service.seo")}</option>
          <option value="paid-ads">{t("service.paidAds")}</option>
          <option value="social-media">{t("service.socialMedia")}</option>
          <option value="email-marketing">{t("service.emailMarketing")}</option>
          <option value="video">{t("service.video")}</option>
          <option value="studio">{t("contact.form.podcastStudio")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {t("contact.form.message")} *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-600">{t("contact.form.error")}</p>
      )}

      <p className="text-xs text-muted-foreground">
        * {t("contact.form.required")}
      </p>
    </form>
  );
}
