import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { WebServiceContent } from "./web-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Web Development Services | Creative Quality Marketing",
  description:
    "Custom web development services focused on speed, conversion, SEO structure, and long-term scalability.",
  path: "/services/web",
  keywords: [
    "web development agency",
    "business website design",
    "conversion-focused websites",
  ],
});

export default function WebDevelopmentPage() {
  return <WebServiceContent />;
}
