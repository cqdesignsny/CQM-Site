import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { WebServiceContent } from "./web-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Web Development Services | CQM",
  description:
    "Custom web development services focused on speed, conversion, SEO structure, and long-term scalability. Serving Newburgh NY and the Hudson Valley.",
  path: "/services/web",
  keywords: [
    "web development Newburgh NY",
    "web design agency Hudson Valley",
    "website design services near me",
    "hire web developer Newburgh",
    "small business website design",
    "custom website development",
    "conversion focused web design",
    "business website agency",
    "web development company near me",
    "affordable web design Hudson Valley",
  ],
});

export default function WebDevelopmentPage() {
  return <WebServiceContent />;
}
