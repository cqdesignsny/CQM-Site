import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFullProposal } from "@/lib/notion/client";
import { ProposalDocument } from "@/components/proposals/proposal-document";
import type { Proposal } from "@/lib/proposals/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProposal(id: string): Promise<Proposal | null> {
  try {
    return await getFullProposal(id);
  } catch (err) {
    console.error("[ProposalView] Error fetching proposal:", err);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const proposal = await getProposal(id);

  if (!proposal) {
    return { title: "Proposal Not Found" };
  }

  return {
    title: `Proposal for ${proposal.contact.name} | Creative Quality Marketing`,
    description: `Marketing proposal prepared for ${proposal.contact.name}`,
    robots: { index: false, follow: false },
  };
}

export default async function ProposalViewPage({ params }: Props) {
  const { id } = await params;
  const proposal = await getProposal(id);

  if (!proposal) {
    notFound();
  }

  const isStale =
    Date.now() - new Date(proposal.createdAt).getTime() > 30 * 24 * 60 * 60 * 1000;

  return <ProposalDocument proposal={proposal} isStale={isStale} />;
}
