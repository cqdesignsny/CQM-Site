"use client";

import { ContactForm } from "@/components/contact/contact-form";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";
import { BookingButtons } from "@/components/booking-buttons";

/**
 * Contact Page Content
 *
 * Layout priority: Schedule a call FIRST, then contact info, then form.
 * We want to capture meetings before messages.
 */
export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("contact.pageTitle")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("contact.pageSubtitle")}
        </p>
      </div>

      {/* Schedule a Call — FIRST, full width, prominent */}
      <div className="mx-auto mb-16 max-w-2xl rounded-2xl border bg-muted/30 p-8 text-center md:p-10">
        <h2 className="mb-2 text-2xl font-bold">{t("contact.schedule")}</h2>
        <p className="mb-8 text-muted-foreground">{t("contact.scheduleDesc")}</p>
        <BookingButtons location="contact_page" className="justify-center" />
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Information */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold">{t("contact.info.title")}</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <address className="not-italic text-muted-foreground">
                  {siteConfig.contact.streetAddress}
                  <br />
                  {siteConfig.contact.locality}, {siteConfig.contact.region}{" "}
                  {siteConfig.contact.postalCode}
                </address>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="text-muted-foreground hover:underline"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-muted-foreground hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Send a Message */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold">{t("contact.sendMessage")}</h2>
          <ContactForm />
        </div>
      </div>

      <div className="mt-12">
        <CTABanner variant="compact" />
      </div>
    </div>
  );
}
