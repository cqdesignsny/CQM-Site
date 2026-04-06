"use client";

import { ContactForm } from "@/components/contact/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";
import { BookingButtons } from "@/components/booking-buttons";

/**
 * Contact Page Content
 *
 * Layout: Schedule a call FIRST (prominent), then contact info + form in cards.
 */
export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("contact.pageTitle")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("contact.pageSubtitle")}
          </p>
        </div>

        {/* Schedule a Call — prominent, full width */}
        <div className="mx-auto mb-16 max-w-2xl overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/30 via-black to-red-950/20 p-8 text-center shadow-2xl shadow-red-500/5 md:p-10">
          <h2 className="mb-2 text-2xl font-bold text-white">{t("contact.schedule")}</h2>
          <p className="mb-8 text-white/60">{t("contact.scheduleDesc")}</p>
          <BookingButtons location="contact_page" className="justify-center" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information Card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl backdrop-blur-sm md:p-10">
            <h2 className="mb-8 text-2xl font-bold">{t("contact.info.title")}</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-primary/20 hover:bg-white/[0.04]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/10">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold">Office</p>
                  <address className="not-italic text-sm text-muted-foreground">
                    {siteConfig.contact.streetAddress}
                    <br />
                    {siteConfig.contact.locality}, {siteConfig.contact.region}{" "}
                    {siteConfig.contact.postalCode}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-primary/20 hover:bg-white/[0.04]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/10">
                  <Phone className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold">Phone</p>
                  <a
                    href={`tel:${siteConfig.contact.phoneE164}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-primary/20 hover:bg-white/[0.04]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/10">
                  <Mail className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-primary/20 hover:bg-white/[0.04]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/10">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold">Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Monday to Friday, 9 AM to 6 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Send a Message Card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl backdrop-blur-sm md:p-10">
            <h2 className="mb-2 text-2xl font-bold">{t("contact.sendMessage")}</h2>
            <p className="mb-8 text-sm text-muted-foreground">
              {t("contact.sendMessageDesc")}
            </p>
            <ContactForm />
          </div>
        </div>

        <div className="mt-16">
          <CTABanner variant="compact" />
        </div>
      </div>
    </div>
  );
}
