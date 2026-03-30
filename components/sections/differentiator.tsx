"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Fingerprint, Lightbulb, Layers, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";

const pillars = [
  {
    icon: Search,
    titleKey: "diff.pillar1.title",
    descKey: "diff.pillar1.desc",
    gradient: "from-red-500 to-red-700",
    delay: 0,
  },
  {
    icon: Fingerprint,
    titleKey: "diff.pillar2.title",
    descKey: "diff.pillar2.desc",
    gradient: "from-red-600 to-red-800",
    delay: 0.1,
  },
  {
    icon: Lightbulb,
    titleKey: "diff.pillar3.title",
    descKey: "diff.pillar3.desc",
    gradient: "from-orange-500 to-red-600",
    delay: 0.2,
  },
  {
    icon: Layers,
    titleKey: "diff.pillar4.title",
    descKey: "diff.pillar4.desc",
    gradient: "from-red-700 to-red-900",
    delay: 0.3,
  },
];

export function Differentiator() {
  const { t } = useLanguage();

  return (
    <section className="bg-black py-20 text-white md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t("diff.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg leading-relaxed text-white/80"
          >
            {t("diff.pitch")}
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pillar.delay }}
              className="group relative"
            >
              {/* Glow effect behind card */}
              <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-b ${pillar.gradient} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-40`} />

              <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.07]">
                {/* Shine sweep */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <div className="relative">
                  {/* Icon with gradient bg */}
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <pillar.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold transition-colors duration-300 group-hover:text-red-300">
                    {t(pillar.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
                    {t(pillar.descKey)}
                  </p>
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
          <Link
            href="/how-marketing-works"
            className="inline-flex items-center gap-2 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
            onClick={() => track("cta_click", { cta_type: "differentiator_cta", location: "homepage" })}
          >
            {t("diff.cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
