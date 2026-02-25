import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/client";
import { updateProposalStatus, addNoteToProposal } from "@/lib/proposals/notion";
import { sendAcceptanceNotification } from "@/lib/proposals/email";
import type { Proposal } from "@/lib/proposals/types";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Demo mode — return a mock acceptance
      console.warn("[Proposals] Supabase not configured — returning demo acceptance");
      return NextResponse.json({
        success: true,
        acceptedAt: new Date().toISOString(),
        demo: true,
      });
    }

    const supabase = createServerSupabaseClient();

    // Fetch proposal
    const { data: row, error: fetchError } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !row) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 }
      );
    }

    // Check if already accepted
    if (row.accepted_at) {
      return NextResponse.json({
        success: true,
        alreadyAccepted: true,
        acceptedAt: row.accepted_at,
      });
    }

    const now = new Date().toISOString();

    // Update Supabase
    const { error: updateError } = await supabase
      .from("proposals")
      .update({
        status: "won",
        accepted_at: now,
        updated_at: now,
      })
      .eq("id", id);

    if (updateError) {
      console.error("[Proposals] Accept update error:", updateError);
      return NextResponse.json(
        { error: "Failed to update proposal" },
        { status: 500 }
      );
    }

    // Reconstruct proposal for email/notion
    const proposal: Proposal = {
      id: row.id,
      parentId: row.parent_id,
      version: row.version,
      locale: row.locale,
      contact: {
        name: row.contact_name,
        email: row.contact_email,
        phone: row.contact_phone || "",
      },
      referredBy: row.referred_by,
      status: "won",
      selectedServices: row.selected_services,
      customLineItems: row.custom_line_items || [],
      packageId: row.package_id,
      oneTimeTotal: Number(row.one_time_total),
      monthlyTotal: Number(row.monthly_total),
      hostingFee: Number(row.hosting_fee),
      discountType: row.discount_type,
      discountValue: row.discount_value ? Number(row.discount_value) : null,
      discountAmount: Number(row.discount_amount),
      grandTotal: Number(row.grand_total),
      notionPageId: row.notion_page_id,
      createdAt: row.created_at,
      acceptedAt: now,
      updatedAt: now,
    };

    // Update Notion status (non-blocking)
    if (proposal.notionPageId) {
      try {
        await updateProposalStatus(proposal.notionPageId, "won");
        await addNoteToProposal(
          proposal.notionPageId,
          `Proposal accepted by ${proposal.contact.name} on ${new Date(now).toLocaleDateString()}`
        );
      } catch (notionError) {
        console.error("[Proposals] Notion update error:", notionError);
      }
    }

    // Send acceptance notification email (non-blocking)
    try {
      await sendAcceptanceNotification(proposal);
    } catch (emailError) {
      console.error("[Proposals] Acceptance email error:", emailError);
    }

    // Webhook for n8n / external automation (non-blocking)
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "proposal_accepted",
            proposalId: proposal.id,
            contact: proposal.contact,
            referredBy: proposal.referredBy,
            grandTotal: proposal.grandTotal,
            acceptedAt: now,
            timestamp: now,
          }),
        });
      } catch (webhookError) {
        console.error("[Proposals] Webhook error:", webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      acceptedAt: now,
    });
  } catch (error) {
    console.error("[Proposals] Accept unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
