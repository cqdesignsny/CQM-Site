/**
 * SEO Component - Placeholder for future dynamic SEO needs
 * Currently using Next.js 15 Metadata API in page files
 */
import { siteConfig } from "@/lib/site-config";

/**
 * Default SEO Component - Wrapper for next-seo
 *
 * Approach: Component-based SEO for per-page customization
 * Why next-seo?
 * - Easy JSON-LD schema generation
 * - Open Graph and Twitter card support
 * - Type-safe metadata
 *
 * Alternative: Could use Next.js 15 built-in Metadata API (which we also use in layout.tsx)
 * Trade-off: next-seo provides more convenience helpers, but Metadata API is more native
 * We'll use both: Metadata API for static, next-seo for dynamic/component-based
 */
interface DefaultSeoProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}

export function DefaultSeo({
  title,
  description,
  canonical,
  noindex = false,
}: DefaultSeoProps) {
  // In Next.js 15, we primarily use the Metadata API in layout.tsx
  // This component is kept for future dynamic SEO needs
  // For now, we'll rely on the Metadata API
  return null;
}

/**
 * Generate JSON-LD schema for LocalBusiness
 * Call this in pages that need local business schema
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.assets.logoPath}`,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneE164,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.streetAddress,
      addressLocality: siteConfig.contact.locality,
      addressRegion: siteConfig.contact.region,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: siteConfig.contact.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  };
}

/**
 * Generate JSON-LD schema for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.assets.logoPath}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phoneE164,
      contactType: "customer service",
      email: siteConfig.contact.email,
      areaServed: "US",
      availableLanguage: ["English"],
    },
  };
}

/**
 * Generate JSON-LD schema for WebSite entity
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
