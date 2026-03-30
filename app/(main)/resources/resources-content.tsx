"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";

export function ResourcesContent() {
  const { t } = useLanguage();

  const affiliateTools = [
    { name: "TubeBuddy", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/TubeBuddy.png", href: "https://www.tubebuddy.com/cqdesigns" },
    { name: "Ecwid", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Ecwid.png", href: "https://www.tubebuddy.com/cqdesigns" },
    { name: "Hostinger", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Hostinger.png", href: "https://www.hostg.xyz/aff_c?offer_id=6&aff_id=48099" },
    { name: "Groove Funnels", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Groove-Funnels.png", href: "" },
    { name: "Printful", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Printful.png", href: "https://www.printful.com/a/cqdesigns" },
    { name: "SEMRUSH", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/SEMRUSH.png", href: "https://www.semrush.com/sem/?ref=6750215091&refer_source=&utm_source=berush&utm_medium=promo&utm_campaign=link_7-day_pro_trial" },
    { name: "Siteground", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Siteground.png", href: "https://www.siteground.com/index.htm?afcode=32d8fc9b4e32d0b246c970b52790fc64" },
    { name: "VidIQ", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/VidIQ.png", href: "https://vidiq.com/#_l_3bp" },
    { name: "Perspective", logo: "https://creativequalitymarketing.com/wp-content/uploads/2026/01/file_JzY0xFU8RmIeOy.png", href: "https://try.perspective.co/6evaojo91zuu" },
    { name: "Instapage", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Instapage.png", href: "https://instapage.grsm.io/creative-quality-marketing" },
    { name: "Elegant Themes", logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Elegant-Themes2.png", href: "https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=41841" },
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          {t("resources.badge")}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("resources.heading")}
        </h1>
        <p className="mb-12 max-w-3xl text-lg text-muted-foreground">
          {t("resources.description")}
        </p>

        <section className="mb-14 grid gap-5 md:grid-cols-2">
          <Link
            href="/blog"
            className="group rounded-xl border bg-white/90 p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl md:p-8"
          >
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("resources.blog.badge")}
              </span>
            </div>
            <h2 className="mb-2 text-xl font-semibold">{t("resources.blog.title")}</h2>
            <p className="mb-4 text-sm text-muted-foreground">{t("resources.blog.desc")}</p>
            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
              {t("resources.blog.cta")}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/how-marketing-works"
            className="group rounded-xl border bg-white/90 p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl md:p-8"
          >
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("resources.hmw.badge")}
              </span>
            </div>
            <h2 className="mb-2 text-xl font-semibold">{t("resources.hmw.title")}</h2>
            <p className="mb-4 text-sm text-muted-foreground">{t("resources.hmw.desc")}</p>
            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
              {t("resources.hmw.cta")}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>

        <section id="affiliate-tools" className="mb-14">
          <div className="mb-4 flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{t("resources.tools.title")}</h2>
          </div>
          <p className="mb-6 text-muted-foreground">{t("resources.tools.desc")}</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {affiliateTools.map((tool) => (
              <article
                key={tool.name}
                className="group rounded-xl border bg-white/95 p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-center">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={260}
                    height={160}
                    className="h-28 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-3 text-sm font-semibold">{tool.name}</h3>
                {tool.href ? (
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    {t("resources.tools.shopNow")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">{t("resources.tools.comingSoon")}</span>
                )}
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {t("resources.tools.disclosure")}
          </p>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">{t("resources.cta.title")}</h2>
          <p className="mb-6 text-muted-foreground">{t("resources.cta.desc")}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/blog">
                {t("resources.cta.readBlog")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/how-marketing-works">{t("resources.cta.seeProcess")}</Link>
            </Button>
          </div>
        </section>

        <CTABanner variant="assessment" />
      </div>
    </div>
  );
}
