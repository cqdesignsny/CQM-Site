import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { VideoServiceContent } from "./video-service-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Video Production Services | Creative Quality Marketing",
  description:
    "Professional video production from concept to delivery, including short-form and campaign-ready content.",
  path: "/services/video",
  keywords: ["video production agency", "brand video production", "short-form content"],
});

export default function VideoServicePage() {
  return <VideoServiceContent />;
}
