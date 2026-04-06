import { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { countyAreas, getCountyBySlug } from "@/lib/service-areas";
import { CountyContent } from "./county-content";

interface Props {
  params: Promise<{ county: string }>;
}

export function generateStaticParams() {
  return countyAreas.map((area) => ({
    county: area.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county } = await params;
  const area = getCountyBySlug(county);
  if (!area) return {};

  return buildPageMetadata({
    title: `${area.heroTitle} | ${siteConfig.name}`,
    description: area.description,
    path: `/service-areas/${area.slug}`,
    keywords: area.keywords,
  });
}

export default async function CountyPage({ params }: Props) {
  const { county } = await params;
  const area = getCountyBySlug(county);
  if (!area) notFound();

  const pageUrl = new URL(`/service-areas/${area.slug}`, siteConfig.url).toString();

  const localBusinessSchema = {
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
    areaServed: {
      "@type": "AdministrativeArea",
      name: area.name,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${siteConfig.url}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CountyContent area={area} />
    </>
  );
}
