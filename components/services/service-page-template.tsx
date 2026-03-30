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

type FunnelStage = "awareness" | "interest" | "decision" | "action";

interface ComplementaryService {
  nameKey: string;
  href: string;
  descKey: string;
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
  funnelStages?: FunnelStage[];
  complementaryServices?: ComplementaryService[];
}

const FUNNEL_STAGES: FunnelStage[] = ["awareness", "interest", "decision", "action"];

const funnelLabelKeys: Record<FunnelStage, string> = {
  awareness: "serviceDetail.funnel.awareness",
  interest: "serviceDetail.funnel.interest",
  decision: "serviceDetail.funnel.decision",
  action: "serviceDetail.funnel.action",
};

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
  funnelStages = [],
  complementaryServices = [],
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
              <Link href="/proposals">{t("cta.buildPackage")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {funnelStages.length > 0 && (
        <section className="mb-10 rounded-xl border bg-white/95 p-6 md:p-8">
          <h2 className="mb-5 text-lg font-semibold">
            {t("serviceDetail.funnelContext.title")}
          </h2>
          <div className="flex items-center justify-between gap-0 px-2 sm:px-8">
            {FUNNEL_STAGES.map((stage, i) => {
              const isActive = funnelStages.includes(stage);
              return (
                <div key={stage} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`h-4 w-4 rounded-full transition-colors ${
                        isActive
                          ? "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                          : "bg-zinc-300"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wide sm:text-xs ${
                        isActive ? "text-red-600" : "text-zinc-400"
                      }`}
                    >
                      {t(funnelLabelKeys[stage])}
                    </span>
                  </div>
                  {i < FUNNEL_STAGES.length - 1 && (
                    <div
                      className={`mx-1 h-0.5 flex-1 ${
                        isActive && funnelStages.includes(FUNNEL_STAGES[i + 1])
                          ? "bg-red-400"
                          : "bg-zinc-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-5 text-center">
            <Link
              href="/how-marketing-works"
              className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline"
            >
              {t("serviceDetail.funnelContext.link")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      )}

      <nav className="mb-14 flex flex-wrap gap-2">
        {[
          { href: "#outcomes", label: t("serviceDetail.outcomes") },
          { href: "#included", label: t("serviceDetail.included") },
          { href: "#process", label: t("serviceDetail.process") },
          { href: "#pricing", label: t("cta.buildPackage") },
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

      {complementaryServices.length > 0 && (
        <section className="mb-20">
          <div className="mb-8">
            <p className="brand-section-title mb-2">
              {t("serviceDetail.crossSell.title")}
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              {t("serviceDetail.crossSell.subtitle")}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {complementaryServices.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="group relative overflow-hidden rounded-xl border bg-white/95 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
              >
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <h3 className="mb-2 text-lg font-semibold">
                  {t(svc.nameKey)}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t(svc.descKey)}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-red-600">
                  {t("serviceDetail.crossSell.learnMore")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ServiceLeadCapture serviceName={serviceName} />
    </div>
  );
}
