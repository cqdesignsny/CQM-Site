"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { VerticalText } from "@/components/ui/vertical-text";

import { countyAreas } from "@/lib/service-areas";

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

export function ServiceAreasContent() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
        <VerticalText text="LOCAL" side="right" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
              <MapPin className="h-4 w-4" />
              Service Areas
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Marketing Agency Serving the Hudson Valley and Beyond
            </h1>
            <p className="text-lg text-white/60">
              Based in Newburgh, NY. We work with businesses across the Hudson Valley, NYC Metro, Northern New Jersey, Connecticut, and South Florida. Full funnel marketing that helps local businesses compete and win.
            </p>
          </div>
        </div>
      </section>

      {/* Counties Grid */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <VerticalText text="AREAS" side="left" variant="light" />
        <div className="container relative mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Areas We Serve</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {countyAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group rounded-2xl border bg-white/[0.03] p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-elevation-2"
              >
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-red-400">
                  {area.region}
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <h3 className="text-xl font-bold">{area.name}</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{area.description}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {area.towns.slice(0, 6).map((town) => (
                    <span
                      key={town}
                      className="rounded-full border bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {town}
                    </span>
                  ))}
                  {area.towns.length > 6 && (
                    <span className="rounded-full border bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground">
                      +{area.towns.length - 6} more
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-red-400 transition-all group-hover:gap-2">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
        <VerticalText text="SERVICES" side="right" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">What We Offer in Every Market</h2>
            <p className="mb-12 text-white/60">
              Every service we offer is available to businesses in all our service areas. Whether you&apos;re in Newburgh or White Plains, you get the same full funnel strategy and execution.
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

      {/* Why Local */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <VerticalText text="WHY" side="left" variant="light" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Why Work With a Local Marketing Agency?</h2>
            <div className="space-y-6 text-muted-foreground">
              <p>There are thousands of marketing agencies out there. Most of them have never set foot in the Hudson Valley, never driven down Route 9W, and definitely don&apos;t understand the difference between marketing a business in Newburgh versus Poughkeepsie versus White Plains.</p>
              <p>We do. We live here, we work here, and we build marketing strategies specifically for businesses in this region. We know which keywords your customers are actually searching. We know what your competitors are doing (and not doing). And we know how to make your business show up when someone in your area is ready to buy.</p>
              <p>When your competition outspends you, we outthink them. That&apos;s not a slogan. It&apos;s how we&apos;ve helped dozens of local businesses grow their revenue without wasting money on marketing that doesn&apos;t work.</p>
            </div>
            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Schema markup for service areas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: siteConfig.name,
            url: siteConfig.url,
            telephone: siteConfig.contact.phoneE164,
            email: siteConfig.contact.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.contact.streetAddress,
              addressLocality: siteConfig.contact.locality,
              addressRegion: siteConfig.contact.region,
              postalCode: siteConfig.contact.postalCode,
              addressCountry: siteConfig.contact.country,
            },
            areaServed: countyAreas.map((area) => ({
              "@type": "AdministrativeArea",
              name: area.name,
            })),
            serviceArea: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 41.5034,
                longitude: -74.0104,
              },
              geoRadius: "80000",
            },
          }),
        }}
      />
    </div>
  );
}
