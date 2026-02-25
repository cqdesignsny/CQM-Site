"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Globe,
  Mail,
  Search,
  Share2,
  TrendingUp,
  Video,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site-config";

export function ServicesContent() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Globe,
      titleKey: "service.web",
      descKey: "services.web.desc",
      href: "/services/web",
      featureKeys: ["services.feat.web.1", "services.feat.web.2", "services.feat.web.3"],
    },
    {
      icon: Search,
      titleKey: "service.seo",
      descKey: "services.seo.desc",
      href: "/services/seo",
      featureKeys: ["services.feat.seo.1", "services.feat.seo.2", "services.feat.seo.3"],
    },
    {
      icon: TrendingUp,
      titleKey: "service.paidAds",
      descKey: "services.paidAds.desc",
      href: "/services/paid-ads",
      featureKeys: ["services.feat.ads.1", "services.feat.ads.2", "services.feat.ads.3"],
    },
    {
      icon: Share2,
      titleKey: "service.socialMedia",
      descKey: "services.socialMedia.desc",
      href: "/services/social-media",
      featureKeys: ["services.feat.social.1", "services.feat.social.2", "services.feat.social.3"],
    },
    {
      icon: Mail,
      titleKey: "service.emailMarketing",
      descKey: "services.emailMarketing.desc",
      href: "/services/email-marketing",
      featureKeys: ["services.feat.email.1", "services.feat.email.2", "services.feat.email.3"],
    },
    {
      icon: Bot,
      titleKey: "services.aiDev.title",
      descKey: "services.aiDev.desc",
      href: "/services/ai-development",
      featureKeys: ["services.feat.aiDev.1", "services.feat.aiDev.2", "services.feat.aiDev.3"],
    },
    {
      icon: Workflow,
      titleKey: "services.aiInt.title",
      descKey: "services.aiInt.desc",
      href: "/services/ai-integration",
      featureKeys: ["services.feat.aiInt.1", "services.feat.aiInt.2", "services.feat.aiInt.3"],
    },
    {
      icon: Video,
      titleKey: "service.video",
      descKey: "services.video.desc",
      href: "/services/video",
      featureKeys: ["services.feat.video.1", "services.feat.video.2", "services.feat.video.3"],
    },
  ];

  const servicesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Creative Quality Marketing Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(service.titleKey),
      url: `${siteConfig.url}${service.href}`,
    })),
  };

  const additionalKeys = [
    "services.additional.s1",
    "services.additional.s2",
    "services.additional.s3",
    "services.additional.s4",
    "services.additional.s5",
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListSchema) }}
      />
      <section className="mb-12 rounded-2xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-red-950 px-6 py-10 text-white md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
            {t("services.badge")}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("services.heading")}
          </h1>
          <p className="text-lg text-white/75">
            {t("services.description")}
          </p>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.href}
              className="group rounded-xl border bg-white/95 p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <Link href={service.href} className="block">
                <Icon className="mb-4 h-10 w-10 text-primary" />
                <h2 className="mb-2 text-2xl font-semibold">{t(service.titleKey)}</h2>
                <p className="mb-4 text-muted-foreground">{t(service.descKey)}</p>
                <ul className="mb-6 space-y-2 text-sm">
                  {service.featureKeys.map((key) => (
                    <li key={key} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  {t("services.learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </article>
          );
        })}
      </div>

      <section className="mt-14 rounded-xl border bg-muted/30 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">{t("services.ai.title")}</h2>
        </div>
        <p className="mb-5 text-muted-foreground">{t("services.ai.desc")}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {(["services.ai.item1", "services.ai.item2", "services.ai.item3", "services.ai.item4"] as const).map((key) => (
            <div key={key} className="rounded-md border bg-background p-3 text-sm">
              {t(key)}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-xl border p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-semibold">{t("services.additional")}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {additionalKeys.map((key) => (
            <div key={key} className="rounded-md border bg-muted/20 p-3 text-sm">
              {t(key)}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold">{t("services.readyToStart")}</h2>
        <p className="mb-6 text-muted-foreground">{t("services.readyToStart.desc")}</p>
        <Button size="lg" asChild>
          <Link href="/contact">{t("hero.cta1")}</Link>
        </Button>
      </div>
    </div>
  );
}
