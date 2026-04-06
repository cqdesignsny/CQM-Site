"use client";

import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";

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

          {/* Schedule a Call */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{t("contact.schedule")}</h2>
            <p className="mb-6 text-muted-foreground">{t("contact.scheduleDesc")}</p>
            <Button size="lg" asChild>
              <Link
                href="https://calendly.com/cq-marketing/office-meeting"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t("contact.bookCall")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <CTABanner variant="compact" />
      </div>
    </div>
  );
}
