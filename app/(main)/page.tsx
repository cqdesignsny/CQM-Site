/**
 * Home Page - Main landing page for Creative Quality Marketing
 *
 * Education-first homepage flow:
 * - Hero with differentiator headline + dual CTAs
 * - Differentiator pitch + 4 pillars
 * - Funnel teaser (4 stages, links to /how-marketing-works)
 * - Services grouped by funnel stage
 * - Social proof (testimonial + scrolling logos)
 * - CTA banner (Assessment + Proposal Builder)
 */
import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Differentiator } from "@/components/sections/differentiator";
import { FunnelTeaser } from "@/components/sections/funnel-teaser";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SocialProof } from "@/components/sections/social-proof";
import { CTABanner } from "@/components/sections/cta-banner";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Full Funnel Marketing Agency | Newburgh NY | CQM",
  description:
    "We learn your business first, then build marketing that actually works. Full funnel marketing agency in Newburgh, NY covering SEO, ads, social media, web, email, video, and AI.",
  path: "/",
  keywords: [
    "marketing agency Newburgh NY",
    "full funnel marketing",
    "digital marketing strategy",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentiator />
      <FunnelTeaser />
      <ServicesOverview />
      <SocialProof />
      <NewsletterSection />
      <CTABanner />
    </>
  );
}




