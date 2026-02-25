import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { ContactPageContent } from "./contact-page-content";

export const metadata: Metadata = buildPageMetadata({
  title: `Contact Us | ${siteConfig.name}`,
  description:
    `Get in touch with ${siteConfig.name}. Book a strategy call, request a free audit, or schedule a studio tour.`,
  path: "/contact",
  keywords: ["contact marketing agency", "book strategy call", "Newburgh marketing agency"],
});

/**
 * Contact Page
 * Server component for metadata, delegates to client component for i18n
 */
export default function ContactPage() {
  return <ContactPageContent />;
}
