import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Creative Quality Marketing",
  description: "Privacy Policy for Creative Quality Marketing LLC. Learn how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
