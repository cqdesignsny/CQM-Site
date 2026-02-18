import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Podcast & Content Production Studio | Creative Quality Marketing",
  description:
    "Full-service podcast and video production studio. We shoot, edit, and distribute your content to major platforms including Spotify, Apple Podcasts, and YouTube.",
  path: "/studio",
  keywords: ["podcast studio Newburgh", "content production studio", "video podcast production"],
});

/**
 * Studio Page - Podcast & Content Production
 *
 * Features:
 * - Studio packages
 * - Studio tour (gallery)
 * - Gear highlights (hidden for now; draft saved in lib/studio-equipment-draft.ts)
 * - Editing & distribution workflow
 * - Booking CTA (Calendly)
 */
export default function StudioPage() {
  const packages = [
    {
      name: "Podcast Session",
      price: "$250/session",
      description: "One-hour studio session for audio + video capture",
      includes: [
        "1-hour recording session",
        "Professional audio recording",
        "Professional video recording",
        "Raw files delivery",
      ],
    },
    {
      name: "Content Shoot",
      price: "$350/session",
      description: "Two-hour content shoot with editing support",
      includes: [
        "2-hour studio shoot",
        "Audio + video capture",
        "Professional editing",
        "Color and audio cleanup",
        "Ready-to-publish deliverables",
      ],
    },
    {
      name: "Full-Scale Production / Commercial",
      price: "$1,500/day",
      description: "Full-day production built for campaigns and commercial content",
      includes: [
        "6-8 hour full-day shoot",
        "Pre-production planning",
        "Multi-scene capture",
        "Professional editing and delivery",
        "Platform-ready cut variations",
        "Creative direction support",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
        {/* Hero */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="brand-section-title mb-3">Studio Production</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Podcast & Content Production Studio
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">
            We own an in-house production studio for podcasting & brand content.
            We shoot, edit, fully produce shows, and handle distribution to major
            podcast platforms + YouTube.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="#book-tour">Tour the Studio</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://hvpodcasting.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit HV Podcasting
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Packages */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold">Production Packages</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`rounded-lg border p-6 ${
                  index === 1
                    ? "border-primary bg-white shadow-lg"
                    : "bg-white/95 hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                {index === 1 && (
                  <span className="mb-4 inline-flex rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Requested
                  </span>
                )}
                <h3 className="mb-2 text-2xl font-bold">{pkg.name}</h3>
                <div className="mb-2 text-3xl font-bold">{pkg.price}</div>
                <p className="mb-6 text-sm text-muted-foreground">
                  {pkg.description}
                </p>
                <ul className="mb-6 space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">
                  Book Session
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Studio Tour Gallery */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold">Studio Tour</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {/* TODO: Replace with actual images */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-muted"
              />
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold">Editing & Distribution Workflow</h2>
          <div className="space-y-6">
            {[
              {
                step: "1. Recording",
                description:
                  "Professional recording session in our sound-treated studio with high-quality equipment.",
              },
              {
                step: "2. Editing",
                description:
                  "Our team edits audio/video, removes filler words, adds music, and ensures professional quality.",
              },
              {
                step: "3. Distribution",
                description:
                  "We handle distribution to Spotify, Apple Podcasts, Google Podcasts, YouTube, and more.",
              },
              {
                step: "4. Promotion",
                description:
                  "We create social media clips, show notes, and promotional materials to help grow your audience.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">{item.step}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking CTA */}
        <section
          id="book-tour"
          className="rounded-lg border bg-muted/30 p-8 md:p-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Your Podcast?</h2>
            <p className="mb-6 text-muted-foreground">
              Book a studio tour or schedule a recording session. We&apos;re here to
              help bring your content vision to life.
            </p>
            {/* TODO: Replace with Calendly embed */}
            <div className="mb-6 rounded-lg border bg-background p-8">
              <p className="text-sm text-muted-foreground">
                Calendly booking widget will be embedded here
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Add your Calendly URL to .env.local: NEXT_PUBLIC_CALENDLY_URL
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
    </div>
  );
}
