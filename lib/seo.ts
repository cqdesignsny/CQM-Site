import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const defaultKeywords = [
  "AI marketing agency",
  "digital marketing agency",
  "website design",
  "SEO services",
  "paid ads management",
  "social media marketing",
  "email marketing",
  "video production",
  "Newburgh NY marketing agency",
];

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: BuildPageMetadataOptions): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const absoluteUrl = new URL(normalizedPath, siteConfig.url).toString();

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: siteConfig.assets.logoPath,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.assets.logoPath],
    },
  };
}
