import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service | Creative Quality Marketing",
  description: "Terms of Service for Creative Quality Marketing LLC. Read our service agreement, website usage terms, payment policies, and legal information.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsContent />;
}
