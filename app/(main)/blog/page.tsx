import { Metadata } from "next";
import { BlogContent } from "./blog-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog | Marketing, AI & Business Insights | CQM",
  description:
    "Real talk about AI, marketing strategy, SEO, social media, and growing your business. No fluff, no corporate jargon. Just stuff that actually works.",
  path: "/blog",
  keywords: [
    "marketing blog",
    "AI marketing insights",
    "digital marketing tips",
    "business growth strategies",
    "marketing strategy blog",
  ],
});

export default function BlogPage() {
  return <BlogContent />;
}
