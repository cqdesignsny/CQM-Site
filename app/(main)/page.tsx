/**
 * Home Page - Main landing page for Creative Quality Marketing
 *
 * Education-first homepage flow:
 * - Hero with differentiator headline + dual CTAs
 * - Differentiator pitch + 4 pillars
 * - Funnel teaser (4 stages, links to /how-marketing-works)
 * - Services grouped by funnel stage
 * - Social proof (testimonial + scrolling logos)
 * - Assessment promo (red bg, interactive preview)
 * - ROI Calculator promo (black bg, animated stats)
 * - Blog promo (latest 3 posts)
 * - Newsletter signup
 * - CTA banner (Assessment + Proposal Builder)
 */
import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Differentiator } from "@/components/sections/differentiator";
import { FunnelTeaser } from "@/components/sections/funnel-teaser";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SocialProof } from "@/components/sections/social-proof";
import { AssessmentPromo } from "@/components/sections/assessment-promo";
import { ROIPromo } from "@/components/sections/roi-promo";
import { BlogPromo } from "@/components/sections/blog-promo";
import { CTABanner } from "@/components/sections/cta-banner";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Full Funnel Marketing Agency | Newburgh NY | CQM",
  description:
    "Full funnel marketing agency in Newburgh, NY. We learn your business first, then build SEO, ads, social media, web, email, and video that works.",
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
      <AssessmentPromo />
      <ROIPromo />
      <BlogPromo />
      <NewsletterSection />
      <CTABanner />
    </>
  );
}
