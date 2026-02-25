"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Footer Component - Site footer with address, links, and contact info
 *
 * Approach: Semantic HTML with clear sections
 * i18n: All labels use the global t() function
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      { href: "/services/web", labelKey: "service.web" },
      { href: "/services/seo", labelKey: "service.seo" },
      { href: "/services/paid-ads", labelKey: "service.paidAds" },
      { href: "/services/social-media", labelKey: "service.socialMedia" },
      { href: "/services/email-marketing", labelKey: "service.emailMarketing" },
      { href: "/services/ai-development", labelKey: "service.aiDevelopment" },
      { href: "/services/ai-integration", labelKey: "service.aiIntegration" },
      { href: "/services/video", labelKey: "service.video" },
    ],
    tools: [
      { href: "/assessment", labelKey: "footer.assessment" },
      { href: "/proposals", labelKey: "footer.proposalBuilder" },
      { href: "/pricing", labelKey: "nav.pricing" },
      { href: "/studio", labelKey: "footer.studioTour" },
    ],
    company: [
      { href: "/about", labelKey: "nav.about" },
      { href: "/process", labelKey: "nav.process" },
      { href: "/work", labelKey: "footer.caseStudies" },
      { href: "/resources", labelKey: "footer.blog" },
      { href: "/careers", labelKey: "footer.careers" },
      { href: "/contact", labelKey: "nav.contact" },
      { href: "https://hvpodcasting.com", labelKey: "footer.hvPodcasting", external: true },
    ],
  };

  return (
    <footer className="border-t border-red-900/40 bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{siteConfig.name}</h3>
            <p className="text-sm text-white/70">
              {t("footer.tagline")}
            </p>
            <div className="space-y-2 text-sm text-white/90">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <address className="not-italic">
                  {siteConfig.contact.streetAddress}
                  <br />
                  {siteConfig.contact.locality}, {siteConfig.contact.region}{" "}
                  {siteConfig.contact.postalCode}
                </address>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-red-400" />
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="transition-colors hover:text-red-300 hover:underline"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-red-400" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-red-300 hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">{t("footer.services")}</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-red-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column — Assessment + Proposals prominently */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">{t("footer.tools")}</h4>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-red-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">{t("footer.company")}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 transition-colors hover:text-red-300"
                    >
                      {t(link.labelKey)}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-red-300"
                    >
                      {t(link.labelKey)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>
            &copy; {currentYear} {siteConfig.name}. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
