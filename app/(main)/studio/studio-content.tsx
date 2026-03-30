"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Mic,
  Video,
  Camera,
  Monitor,
  Users,
  Sparkles,
  Headphones,
  Palette,
  Tv,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { CTABanner } from "@/components/sections/cta-banner";

const studioFeatures = [
  {
    icon: Mic,
    titleKey: "studio.feature.podcast.title",
    descKey: "studio.feature.podcast.desc",
  },
  {
    icon: Video,
    titleKey: "studio.feature.video.title",
    descKey: "studio.feature.video.desc",
  },
  {
    icon: Camera,
    titleKey: "studio.feature.content.title",
    descKey: "studio.feature.content.desc",
  },
  {
    icon: Users,
    titleKey: "studio.feature.meetings.title",
    descKey: "studio.feature.meetings.desc",
  },
  {
    icon: Palette,
    titleKey: "studio.feature.custom.title",
    descKey: "studio.feature.custom.desc",
  },
  {
    icon: Headphones,
    titleKey: "studio.feature.production.title",
    descKey: "studio.feature.production.desc",
  },
];

const galleryImages = [
  { src: "/images/studio-main-set-1.jpg", alt: "Main podcast set with professional lighting" },
  { src: "/images/studio-main-set-2.jpg", alt: "Main recording set alternate angle" },
  { src: "/images/studio-producer-set.jpg", alt: "Producer control station" },
  { src: "/images/studio-hvp-tv.jpg", alt: "HVP TV monitor display" },
  { src: "/images/studio-dark-moody.jpg", alt: "Dark and moody studio lighting setup" },
  { src: "/images/studio-podcaster-pro.jpg", alt: "Podcaster Pro microphone setup" },
  { src: "/images/studio-demo-cast.jpg", alt: "Demo recording session" },
  { src: "/images/studio-custom-sets.jpg", alt: "Custom set configurations" },
  { src: "/images/studio-headshot.jpg", alt: "Professional headshot setup" },
  { src: "/images/studio-podcaster-hand.jpg", alt: "Podcaster adjusting equipment" },
  { src: "/images/studio-demo-cast-1.jpg", alt: "Live demo recording" },
  { src: "/images/studio-cam-demo.jpg", alt: "Camera demo setup" },
];

const equipmentHighlights = [
  { icon: Mic, text: "Shure SM7B & Rode Podcaster Pro Microphones" },
  { icon: Video, text: "Multi Angle 4K Video Cameras" },
  { icon: Tv, text: "Rodecaster Pro 2 Mixing Board" },
  { icon: Monitor, text: "Professional 3 to 5 Point Studio Lighting" },
  { icon: Sparkles, text: "Customizable Sets, Backdrops & Props" },
  { icon: Headphones, text: "Full Post Production Audio & Video Editing" },
];

export function StudioContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-20 text-white md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.25),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.15),transparent_40%)]" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-200"
              >
                <Mic className="h-4 w-4" />
                {t("studio.badge")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
              >
                {t("studio.heading")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-lg text-white/70"
              >
                {t("studio.description")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Button size="lg" asChild>
                  <Link
                    href="#book-tour"
                    onClick={() => track("cta_click", { cta_type: "studio_tour", location: "hero" })}
                  >
                    {t("studio.tourBtn")}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <a
                    href="https://hvpodcasting.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("studio.hvpBtn")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src="/images/studio-main-set-1.jpg"
                alt="CQM Studio main recording set"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Can Do Here */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("studio.whatYouCanDo.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("studio.whatYouCanDo.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studioFeatures.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-xl"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-500/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10">
                    <feature.icon className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-red-500">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Highlights */}
      <section className="bg-black py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-2xl font-bold">{t("studio.equipment.title")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentHighlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <item.icon className="h-5 w-5 shrink-0 text-red-400" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Gallery */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-3xl font-bold">{t("studio.tour")}</h2>
          <p className="mb-10 text-muted-foreground">{t("studio.tour.subtitle")}</p>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-xl border"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
            {/* Welcome dog gets special treatment */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-red-500/20"
            >
              <Image
                src="/images/studio-welcome-dog.jpg"
                alt="Our studio mascot welcoming you"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-center text-xs font-medium text-white">{t("studio.mascot")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages CTA */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-950/20 to-black/40 p-8 text-center md:p-12">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-3 text-3xl font-bold">{t("studio.packages")}</h2>
              <p className="mb-8 text-muted-foreground">
                {t("studio.packagesCTADesc")}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link
                    href="/proposals"
                    onClick={() => track("cta_click", { cta_type: "studio_build_package", location: "studio" })}
                  >
                    {t("cta.buildPackage")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">{t("studio.bookSession")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="book-tour" className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border bg-muted/30 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">{t("studio.cta.title")}</h2>
              <p className="mb-6 text-muted-foreground">{t("studio.cta.desc")}</p>
              <div className="mb-6 rounded-lg border bg-background p-8">
                <p className="text-sm text-muted-foreground">
                  {t("common.calendlyPlaceholder")}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t("common.calendlyEnvHint")}
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/contact">{t("studio.cta.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTABanner variant="compact" />
    </>
  );
}
