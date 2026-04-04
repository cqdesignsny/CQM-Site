"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, PawPrint, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { CTABanner } from "@/components/sections/cta-banner";

export function AboutContent() {
  const { t } = useLanguage();

  const leadership = [
    {
      name: "Cesar Q.",
      roleKey: "about.team.cesar.role",
      summaryKey: "about.team.cesar.summary",
      image: "https://creativequalitymarketing.com/wp-content/uploads/2022/07/cez-480x480.jpg",
    },
    {
      name: "Laura B.",
      roleKey: "about.team.laura.role",
      summaryKey: "about.team.laura.summary",
      image: "https://creativequalitymarketing.com/wp-content/uploads/2021/03/laura-480x480.jpg",
    },
    {
      name: "Kevin Page",
      roleKey: "about.team.kevin.role",
      summaryKey: "about.team.kevin.summary",
      image: "https://creativequalitymarketing.com/wp-content/uploads/2021/03/kevin-480x480.jpg",
    },
    {
      name: "Dennis Rodriguez",
      roleKey: "about.team.dennis.role",
      summaryKey: "about.team.dennis.summary",
      image: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Dennis-Headshot-480x480.png",
    },
    {
      name: "Broly",
      roleKey: "about.team.broly.role",
      summaryKey: "about.team.broly.summary",
      image: "https://creativequalitymarketing.com/wp-content/uploads/2021/03/broly-480x480.jpg",
    },
  ];

  const coreValues = [
    { titleKey: "about.value.passionate", descKey: "about.value.passionate.desc", icon: Sparkles },
    { titleKey: "about.value.creative", descKey: "about.value.creative.desc", icon: Brain },
    { titleKey: "about.value.quality", descKey: "about.value.quality.desc", icon: ShieldCheck },
    { titleKey: "about.value.problemSolving", descKey: "about.value.problemSolving.desc", icon: Target },
    { titleKey: "about.value.balance", descKey: "about.value.balance.desc", icon: PawPrint },
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="brand-section-title mb-3">{t("about.badge")}</p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("about.heading")}
        </h1>
        <p className="mb-12 max-w-4xl text-lg text-muted-foreground">
          {t("about.intro")}
        </p>

        <section className="mb-14 brand-panel p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-semibold">{t("about.story.title")}</h2>
          <p className="mb-4 text-muted-foreground">{t("about.story.p1")}</p>
          <p className="mb-4 text-muted-foreground">{t("about.story.p2")}</p>
          <p className="text-muted-foreground">
            {t("about.story.p3")}{" "}
            <Link href="/how-marketing-works" className="font-medium text-primary hover:underline">
              {t("about.story.processLink")}
            </Link>
          </p>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{t("about.team.title")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member) => (
              <article
                key={member.name}
                className="group rounded-xl border bg-white/95 p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="mb-2 text-sm font-medium text-primary">{t(member.roleKey)}</p>
                <p className="text-sm text-muted-foreground">{t(member.summaryKey)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-semibold">{t("about.values.title")}</h2>
          <p className="mb-8 text-muted-foreground">{t("about.values.desc")}</p>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Values wheel graphic */}
            <div className="flex items-center justify-center">
              <Image
                src="https://creativequalitymarketing.com/wp-content/uploads/2021/09/core_values_cq-980x878-2.png"
                alt="Creative Quality Marketing core values wheel"
                width={480}
                height={430}
                className="h-auto w-full max-w-sm rounded-lg"
              />
            </div>

            {/* Value descriptions */}
            <div className="space-y-4">
              {coreValues.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.titleKey}
                    className="rounded-lg border p-4 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/10">
                        <Icon className="h-4 w-4 text-red-500" />
                      </div>
                      <h3 className="font-semibold">{t(value.titleKey)}</h3>
                    </div>
                    <p className="pl-10 text-sm text-muted-foreground">{t(value.descKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-12 rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">{t("about.cta.title")}</h2>
          <p className="mb-6 text-muted-foreground">{t("about.cta.desc")}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/how-marketing-works">
                {t("about.cta.seeProcess")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">{t("about.cta.getInTouch")}</Link>
            </Button>
          </div>
        </section>

        <CTABanner variant="compact" />
      </div>
    </div>
  );
}
