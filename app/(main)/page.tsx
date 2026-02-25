/**
 * Home Page - Main landing page for Creative Quality Marketing
 *
 * Sections:
 * - Hero with AI-powered creativity headline + dual CTAs
 * - Trust logos
 * - Value props (Web/SEO/Ads/Social/Email/Video/Studio)
 * - Featured case studies with metrics
 * - 4-step process
 * - Testimonials
 * - Resources teaser
 */
import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustLogos } from "@/components/sections/trust-logos";
import { ValueProps } from "@/components/sections/value-props";
import { CaseStudies } from "@/components/sections/case-studies";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { ResourcesTeaser } from "@/components/sections/resources-teaser";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Creative Quality Marketing | AI-Powered Digital Marketing Agency",
  description:
    "AI-powered digital marketing agency in Newburgh, NY offering websites, SEO, paid ads, social media, email marketing, and video production.",
  path: "/",
  keywords: [
    "marketing agency Newburgh NY",
    "AI automation agency",
    "digital strategy",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <ValueProps />
      <CaseStudies />
      <Process />
      <Testimonials />
      <ResourcesTeaser />
    </>
  );
}




