import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EmailServiceContent } from "./email-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Email Marketing Services | CQM",
  description:
    "Email marketing strategy and automation for lead nurture, retention, and repeat revenue growth. Serving Newburgh NY and the Hudson Valley.",
  path: "/services/email-marketing",
  keywords: [
    "email marketing Newburgh NY",
    "email marketing agency Hudson Valley",
    "email automation services near me",
    "hire email marketing agency",
    "Klaviyo email services",
    "email campaign management",
    "small business email marketing",
    "newsletter management Hudson Valley",
    "email marketing company near me",
    "drip campaign agency",
  ],
});

export default function EmailMarketingServicePage() {
  return <EmailServiceContent />;
}
