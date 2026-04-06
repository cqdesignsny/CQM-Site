import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { VideoServiceContent } from "./video-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Video Production Services | CQM",
  description:
    "Professional video production from concept to delivery, including short-form and campaign-ready content. Serving Newburgh NY and the Hudson Valley.",
  path: "/services/video",
  keywords: [
    "video production Newburgh NY",
    "video production agency Hudson Valley",
    "video services near me",
    "hire video production company",
    "brand video production",
    "short form video agency",
    "commercial video production Newburgh",
    "small business video services",
    "promotional video Hudson Valley",
    "video marketing agency near me",
  ],
});

export default function VideoServicePage() {
  return <VideoServiceContent />;
}
