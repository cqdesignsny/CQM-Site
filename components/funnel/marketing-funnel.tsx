"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, Zap, Scale, MousePointerClick, AlertTriangle, Wrench, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";

const stages = [
  {
    icon: Eye,
    titleKey: "hmw.stage1.title",
    headlineKey: "hmw.stage1.headline",
    explanationKey: "hmw.stage1.explanation",
    servicesKey: "hmw.stage1.services",
    skipKey: "hmw.stage1.skip",
    color: "red-500",
    gradient: "from-red-500 to-red-600",
    bgGradient: "from-red-500/15 to-red-600/5",
    borderColor: "border-red-500/30",
    activeBorder: "border-red-500",
    width: "w-full",
    serviceLinks: [
      { href: "/services/seo", label: "SEO" },
      { href: "/services/paid-ads", label: "Paid Ads" },
      { href: "/services/social-media", label: "Social Media" },
      { href: "/services/video", label: "Video" },
    ],
  },
  {
    icon: Zap,
    titleKey: "hmw.stage2.title",
    headlineKey: "hmw.stage2.headline",
    explanationKey: "hmw.stage2.explanation",
    servicesKey: "hmw.stage2.services",
    skipKey: "hmw.stage2.skip",
    color: "red-600",
    gradient: "from-red-600 to-red-700",
    bgGradient: "from-red-600/15 to-red-700/5",
    borderColor: "border-red-600/30",
    activeBorder: "border-red-600",
    width: "w-[90%]",
    serviceLinks: [
      { href: "/services/web", label: "Web Development" },
      { href: "/services/social-media", label: "Social Content" },
      { href: "/services/video", label: "Video" },
    ],
  },
  {
    icon: Scale,
    titleKey: "hmw.stage3.title",
    headlineKey: "hmw.stage3.headline",
    explanationKey: "hmw.stage3.explanation",
    servicesKey: "hmw.stage3.services",
    skipKey: "hmw.stage3.skip",
    color: "red-700",
    gradient: "from-red-700 to-red-800",
    bgGradient: "from-red-700/15 to-red-800/5",
    borderColor: "border-red-700/30",
    activeBorder: "border-red-700",
    width: "w-[78%]",
    serviceLinks: [
      { href: "/services/email-marketing", label: "Email Marketing" },
      { href: "/services/paid-ads", label: "Retargeting Ads" },
    ],
  },
  {
    icon: MousePointerClick,
    titleKey: "hmw.stage4.title",
    headlineKey: "hmw.stage4.headline",
    explanationKey: "hmw.stage4.explanation",
    servicesKey: "hmw.stage4.services",
    skipKey: "hmw.stage4.skip",
    color: "red-800",
    gradient: "from-red-800 to-red-900",
    bgGradient: "from-red-800/15 to-red-900/5",
    borderColor: "border-red-800/30",
    activeBorder: "border-red-800",
    width: "w-[64%]",
    serviceLinks: [
      { href: "/services/web", label: "Conversion Optimization" },
      { href: "/services/ai-integration", label: "AI Chatbots" },
      { href: "/services/ai-development", label: "Smart Automations" },
    ],
  },
];

export function MarketingFunnel() {
  const { t } = useLanguage();
  const [openStage, setOpenStage] = useState<number>(0);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-center gap-2">
        {stages.map((stage, index) => {
          const isOpen = openStage === index;
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.titleKey}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${stage.width} transition-all duration-500`}
            >
              <div
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  isOpen
                    ? `${stage.activeBorder} shadow-2xl shadow-red-500/10`
                    : `${stage.borderColor} hover:shadow-lg`
                }`}
                onClick={() => setOpenStage(isOpen ? -1 : index)}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stage.bgGradient} transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-50 group-hover:opacity-80"}`} />

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <div className="relative p-5 sm:p-6">
                  {/* Header row */}
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stage.gradient} shadow-lg transition-transform duration-300 ${isOpen ? "scale-110 rotate-3" : "group-hover:scale-105"}`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold sm:text-xl">{t(stage.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(stage.headlineKey)}</p>
                    </div>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 space-y-5 border-t border-border/50 pt-5">
                          {/* Explanation */}
                          <p className="leading-relaxed text-muted-foreground">
                            {t(stage.explanationKey)}
                          </p>

                          {/* Services we use */}
                          <div className="rounded-lg border bg-background/50 p-4">
                            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                              <Wrench className="h-4 w-4 text-red-500" />
                              {t(stage.servicesKey)}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {stage.serviceLinks.map((link) => (
                                <Link
                                  key={link.href + link.label}
                                  href={link.href}
                                  className="group/pill inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    track("link_click", { link_type: "funnel_service", destination: link.href });
                                  }}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* What happens if you skip */}
                          <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                              {t(stage.skipKey)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom point of funnel */}
      <div className="flex justify-center">
        <div className="h-12 w-px bg-gradient-to-b from-red-800/50 to-transparent" />
      </div>
    </div>
  );
}
