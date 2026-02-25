"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  TrendingUp,
  Share2,
  Mail,
  Video,
  Mic,
  Bot,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { track } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Value Props Section - Showcase core services
 * i18n: All visible text uses the global t() function
 */
export function ValueProps() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Globe,
      titleKey: "service.web",
      descKey: "valueProps.desc.web",
      href: "/services/web",
    },
    {
      icon: Search,
      titleKey: "service.seo",
      descKey: "valueProps.desc.seo",
      href: "/services/seo",
    },
    {
      icon: TrendingUp,
      titleKey: "service.paidAds",
      descKey: "valueProps.desc.paidAds",
      href: "/services/paid-ads",
    },
    {
      icon: Share2,
      titleKey: "service.socialMedia",
      descKey: "valueProps.desc.socialMedia",
      href: "/services/social-media",
    },
    {
      icon: Mail,
      titleKey: "service.emailMarketing",
      descKey: "valueProps.desc.emailMarketing",
      href: "/services/email-marketing",
    },
    {
      icon: Bot,
      titleKey: "service.aiDevelopment",
      descKey: "valueProps.desc.aiDevelopment",
      href: "/services/ai-development",
    },
    {
      icon: Workflow,
      titleKey: "service.aiIntegration",
      descKey: "valueProps.desc.aiIntegration",
      href: "/services/ai-integration",
    },
    {
      icon: Video,
      titleKey: "service.video",
      descKey: "valueProps.desc.video",
      href: "/services/video",
    },
    {
      icon: Mic,
      titleKey: "contact.form.podcastStudio",
      descKey: "valueProps.desc.podcast",
      href: "/studio",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("valueProps.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("valueProps.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="group block rounded-lg border bg-white/90 p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                  onClick={() =>
                    track("link_click", {
                      link_type: "service_card",
                      destination: t(service.titleKey),
                    })
                  }
                >
                  <Icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{t(service.titleKey)}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t(service.descKey)}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                    {t("valueProps.learnMore")}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
