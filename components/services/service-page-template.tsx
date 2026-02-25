"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { ServiceFAQs, type FAQ } from "@/components/services/service-faqs";
import {
  ServicePricing,
  type PricingTier,
} from "@/components/services/service-pricing";
import { ServiceLeadCapture } from "@/components/services/service-lead-capture";
import { useLanguage } from "@/lib/i18n/context";

interface DeliverableBlock {
  title: string;
  description: string;
  items: string[];
}

interface ProcessStep {
  step: string;
  description: string;
}

interface ServicePageTemplateProps {
  serviceName: string;
  headline: string;
  description: string;
  path: string;
  highlights?: string[];
  outcomes: string[];
  deliverables: DeliverableBlock[];
  processSteps: ProcessStep[];
  tiers: PricingTier[];
  faqs: FAQ[];
}

export function ServicePageTemplate({
  serviceName,
  headline,
  description,
  path,
  highlights = [],
  outcomes,
  deliverables,
  processSteps,
  tiers,
  faqs,
}: ServicePageTemplateProps) {
  const { t } = useLanguage();
  const pageUrl = `${siteConfig.url}${path}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} Services`,
    serviceType: serviceName,
    url: pageUrl,
    description,
    areaServed: "United States",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.contact.phoneE164,
      email: siteConfig.contact.email,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("services.title"),
        item: `${siteConfig.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: serviceName,
        item: pageUrl,
      },
    ],
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="relative mb-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-red-950 p-7 text-white md:p-10">
        <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-red-500/20 blur-2xl" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
            {t("serviceDetail.aiDriven")}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {headline}
          </h1>
          <p className="max-w-3xl text-base text-white/80 sm:text-lg">
            {description}
          </p>
          {highlights.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href={`/contact?service=${encodeURIComponent(serviceName)}`}>
                {t("serviceDetail.bookCall")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/35 bg-white/5 text-white hover:bg-white/15"
              asChild
            >
              <Link href="#pricing">{t("serviceDetail.viewPricing")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <nav className="mb-14 flex flex-wrap gap-2">
        {[
          { href: "#outcomes", label: t("serviceDetail.outcomes") },
          { href: "#included", label: t("serviceDetail.included") },
          { href: "#process", label: t("serviceDetail.process") },
          { href: "#pricing", label: t("serviceDetail.pricing") },
          { href: "#faqs", label: t("serviceDetail.faqs") },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full border bg-white/90 px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="outcomes" className="mb-20">
        <div className="mb-8">
          <p className="brand-section-title mb-2">{t("serviceDetail.outcomes")}</p>
          <h2 className="text-3xl font-bold sm:text-4xl">{t("serviceDetail.whatYouGet")}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome, i) => (
            <article
              key={i}
              className="group rounded-xl border bg-white/95 p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                <Check className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-sm font-medium sm:text-base">{outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="included" className="mb-20">
        <div className="mb-8">
          <p className="brand-section-title mb-2">{t("serviceDetail.scope")}</p>
          <h2 className="text-3xl font-bold sm:text-4xl">{t("serviceDetail.included")}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {deliverables.map((block, i) => (
            <article
              key={i}
              className="rounded-xl border bg-white/95 p-6 transition-all hover:border-primary hover:shadow-xl"
            >
              <h3 className="mb-2 text-xl font-semibold">{block.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{block.description}</p>
              <ul className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="mb-20">
        <div className="mb-8">
          <p className="brand-section-title mb-2">{t("serviceDetail.process")}</p>
          <h2 className="text-3xl font-bold sm:text-4xl">{t("serviceDetail.howWeWork")}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {processSteps.map((item, index) => (
            <article
              key={index}
              className="group rounded-xl border bg-white/95 p-6 transition-all hover:-translate-y-1 hover:border-red-300 hover:shadow-xl"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold">{item.step}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ServicePricing serviceName={serviceName} tiers={tiers} />
      <ServiceFAQs faqs={faqs} />
      <ServiceLeadCapture serviceName={serviceName} />
    </div>
  );
}
