"use client";

import { ContactForm } from "@/components/contact/contact-form";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Contact Page Content - Client component for i18n support
 */
export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("contact.pageTitle")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("contact.pageSubtitle")}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold">{t("contact.form.submit")}</h2>
          <ContactForm />
        </div>

        {/* Contact Info & Map */}
        <div className="space-y-8">
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

          {/* Map Placeholder */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{t("contact.visit")}</h2>
            <div className="aspect-video rounded-lg border bg-muted">
              {/* TODO: Add Google Maps embed */}
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Google Maps embed will be added here
                <br />
                {siteConfig.contact.streetAddress},{" "}
                {siteConfig.contact.locality}, {siteConfig.contact.region}{" "}
                {siteConfig.contact.postalCode}
              </div>
            </div>
          </div>

          {/* Calendly Embed */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{t("contact.schedule")}</h2>
            <div className="rounded-lg border bg-muted/30 p-8">
              {/* TODO: Replace with Calendly embed */}
              <p className="text-sm text-muted-foreground">
                Calendly booking widget will be embedded here
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Add your Calendly URL to .env.local: NEXT_PUBLIC_CALENDLY_URL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
