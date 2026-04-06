import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllArticles } from "@/lib/blog/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/how-marketing-works", priority: 0.95 },
    { path: "/services", priority: 0.9 },
    { path: "/services/web", priority: 0.85 },
    { path: "/services/seo", priority: 0.85 },
    { path: "/services/paid-ads", priority: 0.85 },
    { path: "/services/social-media", priority: 0.85 },
    { path: "/services/email-marketing", priority: 0.85 },
    { path: "/services/video", priority: 0.85 },
    { path: "/services/ai-development", priority: 0.85 },
    { path: "/services/ai-integration", priority: 0.85 },
    { path: "/blog", priority: 0.9 },
    { path: "/roi-calculator", priority: 0.85 },
    { path: "/studio", priority: 0.8 },
    { path: "/work", priority: 0.75 },
    { path: "/about", priority: 0.75 },
    { path: "/pricing", priority: 0.7 },
    { path: "/process", priority: 0.6 },
    { path: "/resources", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    { path: "/assessment", priority: 0.85 },
    { path: "/proposals", priority: 0.7 },
    { path: "/careers", priority: 0.6 },
    { path: "/service-areas", priority: 0.85 },
    { path: "/terms", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
    { path: "/llms.txt", priority: 0.4 },
    { path: "/.well-known/llms.txt", priority: 0.4 },
  ];

  // Generate blog article entries dynamically
  const blogArticles = getAllArticles().map((article) => ({
    path: `/blog/${article.slug}`,
    priority: 0.7,
    lastModified: new Date(article.publishedAt),
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${siteConfig.url}${article.path}`,
    lastModified: article.lastModified,
    changeFrequency: "monthly",
    priority: article.priority,
  }));

  return [...staticEntries, ...blogEntries];
}
