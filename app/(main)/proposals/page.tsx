import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ProposalBuilder } from "@/components/proposals/proposal-builder";

export const metadata: Metadata = buildPageMetadata({
  title: "Proposal Builder | Creative Quality Marketing",
  description:
    "Build a custom marketing proposal with our interactive tool. Select services, set pricing, and send professional proposals instantly.",
  path: "/proposals",
  keywords: [
    "marketing proposal builder",
    "custom marketing package",
    "digital marketing pricing",
  ],
});

export default function ProposalsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; id?: string }>;
}) {
  return <ProposalBuilder searchParamsPromise={searchParams} />;
}
