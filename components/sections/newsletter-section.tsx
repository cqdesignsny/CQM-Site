"use client";

import { motion } from "framer-motion";
import { Mail, Zap, TrendingUp, Lightbulb, Newspaper } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { NewsletterSignup } from "@/components/newsletter-signup";

const bulletIcons = [Zap, TrendingUp, Lightbulb, Newspaper];

export function NewsletterSection() {
  const { t } = useLanguage();

  const bullets = [
    { key: "newsletterSection.bullet1", icon: bulletIcons[0] },
    { key: "newsletterSection.bullet2", icon: bulletIcons[1] },
    { key: "newsletterSection.bullet3", icon: bulletIcons[2] },
    { key: "newsletterSection.bullet4", icon: bulletIcons[3] },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      {/* Red gradient accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full bg-red-600/8 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/20 bg-red-600/10">
              <Mail className="h-7 w-7 text-red-400" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {t("newsletterSection.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              {t("newsletterSection.subtitle")}
            </p>
          </motion.div>

          {/* Bullets grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12 grid gap-4 sm:grid-cols-2"
          >
            {bullets.map((bullet, index) => {
              const Icon = bullet.icon;
              return (
                <motion.div
                  key={bullet.key}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-600/10">
                    <Icon className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-sm leading-relaxed text-white/80">
                    {t(bullet.key)}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Signup form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto max-w-md"
          >
            <NewsletterSignup />
            <p className="mt-3 text-center text-xs text-white/30">
              {t("newsletterSection.privacy")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
