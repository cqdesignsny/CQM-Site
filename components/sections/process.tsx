"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Process Section - 4-step process explanation
 * i18n: All visible text uses the global t() function
 */
export function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: Search,
      titleKey: "process.step1.title",
      descKey: "process.step1.desc",
    },
    {
      number: "02",
      icon: Lightbulb,
      titleKey: "process.step2.title",
      descKey: "process.step2.desc",
    },
    {
      number: "03",
      icon: Rocket,
      titleKey: "process.step3.title",
      descKey: "process.step3.desc",
    },
    {
      number: "04",
      icon: BarChart3,
      titleKey: "process.step4.title",
      descKey: "process.step4.desc",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("process.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("process.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-12 hidden h-0.5 w-full translate-x-1/2 bg-border lg:block" />
                )}

                <div className="relative">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{t(step.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t(step.descKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
