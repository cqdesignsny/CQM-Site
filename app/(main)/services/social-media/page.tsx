import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SocialMediaServiceContent } from "./social-media-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Social Media Management | CQM",
  description:
    "Social media management and creative production for brands that want consistent output, audience growth, and measurable outcomes. Serving Newburgh NY and the Hudson Valley.",
  path: "/services/social-media",
  keywords: [
    "social media management Newburgh NY",
    "social media agency Hudson Valley",
    "social media services near me",
    "hire social media manager",
    "content creation agency",
    "Instagram management Hudson Valley",
    "short form video production",
    "small business social media",
    "social media marketing Newburgh",
    "social media company near me",
  ],
});

export default function SocialMediaServicePage() {
  return <SocialMediaServiceContent />;
}
