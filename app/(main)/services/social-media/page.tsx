import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SocialMediaServiceContent } from "./social-media-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Social Media Services | Creative Quality Marketing",
  description:
    "Social media management and creative production for brands that want consistent output, audience growth, and measurable outcomes.",
  path: "/services/social-media",
  keywords: ["social media management", "content creation agency", "short-form video"],
});

export default function SocialMediaServicePage() {
  return <SocialMediaServiceContent />;
}
