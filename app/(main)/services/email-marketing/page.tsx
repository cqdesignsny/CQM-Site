import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EmailServiceContent } from "./email-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Email Marketing Services | Creative Quality Marketing",
  description:
    "Email marketing strategy and automation for lead nurture, retention, and repeat revenue growth.",
  path: "/services/email-marketing",
  keywords: ["email marketing agency", "email automation", "Klaviyo services"],
});

export default function EmailMarketingServicePage() {
  return <EmailServiceContent />;
}
