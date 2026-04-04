"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, TrendingUp, Share2,
  Globe, Mail,
  Video, Mic,
  Bot, Workflow,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { VerticalText } from "@/components/ui/vertical-text";

const serviceGroups = [
  {
    labelKey: "servicesOverview.group1",
    descKey: "servicesOverview.group1.desc",
    accent: "red-500",
    borderColor: "border-red-500/20",
    hoverBorder: "hover:border-red-500/50",
    gradient: "from-red-500/10 to-transparent",
    services: [
      { icon: Search, nameKey: "service.seo", href: "/services/seo" },
      { icon: TrendingUp, nameKey: "service.paidAds", href: "/services/paid-ads" },
      { icon: Share2, nameKey: "service.socialMedia", href: "/services/social-media" },
    ],
  },
  {
    labelKey: "servicesOverview.group2",
    descKey: "servicesOverview.group2.desc",
    accent: "orange-500",
    borderColor: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/50",
    gradient: "from-orange-500/10 to-transparent",
    services: [
      { icon: Globe, nameKey: "service.web", href: "/services/web" },
      { icon: Mail, nameKey: "service.emailMarketing", href: "/services/email-marketing" },
    ],
  },
  {
    labelKey: "servicesOverview.group3",
    descKey: "servicesOverview.group3.desc",
    accent: "pink-500",
    borderColor: "border-pink-500/20",
    hoverBorder: "hover:border-pink-500/50",
    gradient: "from-pink-500/10 to-transparent",
    services: [
      { icon: Video, nameKey: "service.video", href: "/services/video" },
      { icon: Mic, nameKey: "nav.studio", href: "/studio" },
    ],
  },
  {
    labelKey: "servicesOverview.group4",
    descKey: "servicesOverview.group4.desc",
    accent: "violet-500",
    borderColor: "border-violet-500/20",
    hoverBorder: "hover:border-violet-500/50",
    gradient: "from-violet-500/10 to-transparent",
    services: [
      { icon: Bot, nameKey: "service.aiDevelopment", href: "/services/ai-development" },
      { icon: Workflow, nameKey: "service.aiIntegration", href: "/services/ai-integration" },
    ],
  },
];

export function ServicesOverview() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 md:py-28">
      <VerticalText text="SERVICES" side="right" variant="light" />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t("servicesOverview.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            {t("servicesOverview.subtitle")}
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {serviceGroups.map((group, groupIndex) => (
            <motion.div
              key={group.labelKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="group relative"
            >
              <div className={`relative overflow-hidden rounded-xl border ${group.borderColor} ${group.hoverBorder} bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                <div className="relative">
                  <h3 className={`mb-1 text-lg font-bold text-${group.accent}`}>
                    {t(group.labelKey)}
                  </h3>
                  <p className="mb-5 text-sm text-muted-foreground">
                    {t(group.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {group.services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className={`group/pill inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:border-${group.accent}/50 hover:bg-${group.accent}/10 hover:shadow-sm`}
                        onClick={() => track("link_click", { link_type: "service_pill", destination: service.href })}
                      >
                        <service.icon className="h-4 w-4 transition-transform duration-200 group-hover/pill:scale-110" />
                        {t(service.nameKey)}
                        <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover/pill:opacity-100 group-hover/pill:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link
              href="/services"
              onClick={() => track("cta_click", { cta_type: "services_overview_cta", location: "homepage" })}
            >
              {t("servicesOverview.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
