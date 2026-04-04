"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Zap, Scale, MousePointerClick, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { useState } from "react";

const stages = [
  {
    icon: Eye,
    nameKey: "funnel.stage1.name",
    hookKey: "funnel.stage1.hook",
    gradient: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/70",
    iconBg: "bg-blue-500",
    glowColor: "group-hover:shadow-blue-500/20",
    width: "w-full",
  },
  {
    icon: Zap,
    nameKey: "funnel.stage2.name",
    hookKey: "funnel.stage2.hook",
    gradient: "from-purple-500/20 to-purple-600/5",
    borderColor: "border-purple-500/30",
    hoverBorder: "hover:border-purple-500/70",
    iconBg: "bg-purple-500",
    glowColor: "group-hover:shadow-purple-500/20",
    width: "w-[88%]",
  },
  {
    icon: Scale,
    nameKey: "funnel.stage3.name",
    hookKey: "funnel.stage3.hook",
    gradient: "from-orange-500/20 to-orange-600/5",
    borderColor: "border-orange-500/30",
    hoverBorder: "hover:border-orange-500/70",
    iconBg: "bg-orange-500",
    glowColor: "group-hover:shadow-orange-500/20",
    width: "w-[74%]",
  },
  {
    icon: MousePointerClick,
    nameKey: "funnel.stage4.name",
    hookKey: "funnel.stage4.hook",
    gradient: "from-red-500/20 to-red-600/5",
    borderColor: "border-red-500/30",
    hoverBorder: "hover:border-red-500/70",
    iconBg: "bg-red-500",
    glowColor: "group-hover:shadow-red-500/20",
    width: "w-[58%]",
  },
];

export function FunnelTeaser() {
  const { t } = useLanguage();
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t("funnel.teaser.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            {t("funnel.teaser.subtitle")}
          </motion.p>
        </div>

        {/* Actual funnel shape */}
        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-3">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.nameKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className={`${stage.width} transition-all duration-300`}
            >
              <div
                className={`group relative cursor-pointer overflow-hidden rounded-xl border ${stage.borderColor} ${stage.hoverBorder} bg-gradient-to-b ${stage.gradient} bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${stage.glowColor}`}
                onMouseEnter={() => setActiveStage(index)}
                onMouseLeave={() => setActiveStage(null)}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <div className="relative flex items-center gap-4">
                  {/* Icon */}
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${stage.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <stage.icon className="h-6 w-6 text-white" />
                  </div>
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Stage {index + 1}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-muted-foreground/20 to-transparent" />
                    </div>
                    <h3 className="text-lg font-bold sm:text-xl">{t(stage.nameKey)}</h3>
                  </div>
                </div>
                {/* Expandable hook text */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeStage === index ? "auto" : 0,
                    opacity: activeStage === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 pl-16 text-sm text-muted-foreground">
                    {t(stage.hookKey)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom point of the funnel */}
        <div className="mx-auto mt-1 flex justify-center">
          <div className="h-8 w-px bg-gradient-to-b from-red-500/40 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <Button size="lg" asChild>
            <Link
              href="/how-marketing-works"
              onClick={() => track("cta_click", { cta_type: "funnel_teaser_cta", location: "homepage" })}
            >
              {t("funnel.teaser.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
