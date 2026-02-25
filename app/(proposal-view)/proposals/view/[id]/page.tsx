import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/client";
import { ProposalDocument } from "@/components/proposals/proposal-document";
import type { Proposal, Locale } from "@/lib/proposals/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProposal(id: string): Promise<Proposal | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    parentId: data.parent_id,
    version: data.version,
    locale: data.locale as Locale,
    contact: {
      name: data.contact_name,
      email: data.contact_email,
      phone: data.contact_phone || "",
    },
    referredBy: data.referred_by,
    status: data.status,
    selectedServices: data.selected_services,
    customLineItems: data.custom_line_items || [],
    packageId: data.package_id,
    oneTimeTotal: Number(data.one_time_total),
    monthlyTotal: Number(data.monthly_total),
    hostingFee: Number(data.hosting_fee),
    discountType: data.discount_type,
    discountValue: data.discount_value ? Number(data.discount_value) : null,
    discountAmount: Number(data.discount_amount),
    grandTotal: Number(data.grand_total),
    notionPageId: data.notion_page_id,
    createdAt: data.created_at,
    acceptedAt: data.accepted_at,
    updatedAt: data.updated_at,
  };
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
