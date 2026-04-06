"use client";

import Link from "next/link";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerticalText } from "@/components/ui/vertical-text";
import type { CountyArea } from "@/lib/service-areas";

const services = [
  { name: "Web Design & Development", href: "/services/web" },
  { name: "Search Engine Optimization (SEO)", href: "/services/seo" },
  { name: "Paid Advertising (Google, Meta, TikTok)", href: "/services/paid-ads" },
  { name: "Social Media Management", href: "/services/social-media" },
  { name: "Email Marketing & Automation", href: "/services/email-marketing" },
  { name: "Video & Podcast Production", href: "/services/video" },
  { name: "AI Development & Automation", href: "/services/ai-development" },
  { name: "AI Integration & Chatbots", href: "/services/ai-integration" },
];

interface CountyContentProps {
  area: CountyArea;
}

export function CountyContent({ area }: CountyContentProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
        <VerticalText text="LOCAL" side="right" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/service-areas"
              className="mx-auto mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Service Areas
            </Link>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
              <MapPin className="h-4 w-4" />
              {area.region}
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {area.heroTitle}
            </h1>
            <p className="text-lg text-white/60">
              {area.description}
            </p>
          </div>
        </div>
      </section>

      {/* Towns We Serve */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <VerticalText text="AREAS" side="left" variant="light" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Towns &amp; Cities We Serve in {area.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {area.towns.map((town) => (
                <span
                  key={town}
                  className="rounded-full border bg-muted/30 px-4 py-1.5 text-sm text-muted-foreground"
                >
                  {town}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About This Market */}
      <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
        <VerticalText text="MARKET" side="right" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Marketing in {area.name}
            </h2>
            <div className="space-y-6 text-white/70">
              <p>{area.content.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Local */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <VerticalText text="WHY" side="left" variant="light" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Why {area.name} Businesses Choose Us
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p>{area.content.whyLocal}</p>
              <p>{area.content.closing}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
        <VerticalText text="SERVICES" side="right" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              What We Offer in {area.name}
            </h2>
            <p className="mb-12 text-white/60">
              Every service we offer is available to businesses in {area.name}. Full funnel strategy and execution, built for your market.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-200 hover:border-red-500/30 hover:bg-white/[0.06]"
              >
                <span className="text-sm font-medium">{service.name}</span>
                <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-red-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <VerticalText text="START" side="left" variant="light" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Grow Your {area.name} Business?
            </h2>
            <p className="mb-8 text-muted-foreground">
              We outthink the competition so you do not have to outspend them. Let&apos;s talk about what smart marketing looks like for your business.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/service-areas">
                  View All Service Areas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
