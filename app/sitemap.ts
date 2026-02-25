import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/services/web", priority: 0.85 },
    { path: "/services/seo", priority: 0.85 },
    { path: "/services/paid-ads", priority: 0.85 },
    { path: "/services/social-media", priority: 0.85 },
    { path: "/services/email-marketing", priority: 0.85 },
    { path: "/services/video", priority: 0.85 },
    { path: "/services/ai-development", priority: 0.85 },
    { path: "/services/ai-integration", priority: 0.85 },
    { path: "/studio", priority: 0.8 },
    { path: "/work", priority: 0.8 },
    { path: "/pricing", priority: 0.8 },
    { path: "/process", priority: 0.75 },
    { path: "/about", priority: 0.75 },
    { path: "/resources", priority: 0.75 },
    { path: "/contact", priority: 0.9 },
    { path: "/assessment", priority: 0.85 },
    { path: "/proposals", priority: 0.7 },
    { path: "/careers", priority: 0.6 },
    { path: "/llms.txt", priority: 0.4 },
    { path: "/.well-known/llms.txt", priority: 0.4 },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
