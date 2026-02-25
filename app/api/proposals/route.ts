import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createServerSupabaseClient } from "@/lib/supabase/client";
import { calculateAllTotals } from "@/lib/proposals/calculations";
import { createProposalPage } from "@/lib/proposals/notion";
import { sendProposalEmail } from "@/lib/proposals/email";
import type {
  SelectedService,
  CustomLineItem,
  Discount,
  Locale,
  Proposal,
} from "@/lib/proposals/types";
import { siteConfig } from "@/lib/site-config";

interface CreateProposalBody {
  locale: Locale;
  contact: { name: string; email: string; phone: string };
  referredBy: string;
  selectedServices: SelectedService[];
  customLineItems: CustomLineItem[];
  discount: Discount | null;
  packageId: string | null;
  parentId?: string;
  assessmentId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateProposalBody = await request.json();

    // Validate required fields
    if (!body.contact?.name || !body.contact?.email) {
      return NextResponse.json(
        { error: "Client name and email are required" },
        { status: 400 }
      );
    }

    if (
      body.selectedServices.length === 0 &&
      body.customLineItems.length === 0 &&
      !body.packageId
    ) {
      return NextResponse.json(
        { error: "At least one service must be selected" },
        { status: 400 }
      );
    }

    const proposalId = `prop_${nanoid(12)}`;

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hasSupabase = !!(supabaseUrl && supabaseKey);

    // Calculate version number
    let version = 1;
    if (body.parentId && hasSupabase) {
      try {
        const supabase = createServerSupabaseClient();
        const { data: parent } = await supabase
          .from("proposals")
          .select("version")
          .eq("id", body.parentId)
          .single();
        if (parent) {
          version = parent.version + 1;
        }
      } catch {
        console.warn("[Proposals] Could not fetch parent version");
      }
    }

    // Calculate totals
    const totals = calculateAllTotals(
      body.selectedServices,
      body.customLineItems,
      body.discount
    );

    const now = new Date().toISOString();

    const proposal: Proposal = {
      id: proposalId,
      parentId: body.parentId || null,
      version,
      locale: body.locale || "en",
      contact: body.contact,
      referredBy: body.referredBy || null,
      status: "new",
      selectedServices: body.selectedServices,
      customLineItems: body.customLineItems,
      packageId: body.packageId,
      oneTimeTotal: totals.oneTimeTotal,
      monthlyTotal: totals.monthlyTotal,
      hostingFee: totals.hostingFee,
      discountType: body.discount?.type || null,
      discountValue: body.discount?.value || null,
      discountAmount: totals.discountAmount,
      grandTotal: totals.grandTotal,
      notionPageId: null,
      createdAt: now,
      acceptedAt: null,
      updatedAt: now,
    };

    // 1. Save to Supabase (if configured)
    if (hasSupabase) {
      try {
        const supabase = createServerSupabaseClient();
        const { error: dbError } = await supabase.from("proposals").insert({
          id: proposal.id,
          parent_id: proposal.parentId,
          version: proposal.version,
          locale: proposal.locale,
          contact_name: proposal.contact.name,
          contact_email: proposal.contact.email,
          contact_phone: proposal.contact.phone || null,
          referred_by: proposal.referredBy,
          status: proposal.status,
          selected_services: proposal.selectedServices,
          custom_line_items: proposal.customLineItems,
          package_id: proposal.packageId,
          one_time_total: proposal.oneTimeTotal,
          monthly_total: proposal.monthlyTotal,
          hosting_fee: proposal.hostingFee,
          discount_type: proposal.discountType,
          discount_value: proposal.discountValue,
          discount_amount: proposal.discountAmount,
          grand_total: proposal.grandTotal,
          created_at: proposal.createdAt,
          updated_at: proposal.updatedAt,
        });

        if (dbError) {
          console.error("[Proposals] Supabase insert error:", dbError);
          // Continue anyway — still return the proposal link
        }
      } catch (dbErr) {
        console.error("[Proposals] Database error (continuing without save):", dbErr);
      }
    } else {
      console.warn("[Proposals] Supabase not configured — skipping database save");
    }

    // 2. Create Notion page (non-blocking — don't fail if Notion is down)
    if (hasSupabase) {
      try {
        const notionPageId = await createProposalPage(proposal);
        proposal.notionPageId = notionPageId;

        const supabase = createServerSupabaseClient();
        await supabase
          .from("proposals")
          .update({ notion_page_id: notionPageId })
          .eq("id", proposal.id);
      } catch (notionError) {
        console.error("[Proposals] Notion sync error:", notionError);
      }
    }

    // 3. Send email via Resend (non-blocking)
    try {
      await sendProposalEmail(proposal, proposal.locale);
    } catch (emailError) {
      console.error("[Proposals] Email send error:", emailError);
    }

    // 4. Webhook for n8n / external automation (non-blocking)
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "proposal_created",
            proposalId: proposal.id,
            contact: proposal.contact,
            referredBy: proposal.referredBy,
            grandTotal: proposal.grandTotal,
            oneTimeTotal: proposal.oneTimeTotal,
            monthlyTotal: proposal.monthlyTotal,
            serviceCount: proposal.selectedServices.length,
            locale: proposal.locale,
            timestamp: proposal.createdAt,
          }),
        });
      } catch (webhookError) {
        console.error("[Proposals] Webhook error:", webhookError);
      }
    }

    const viewUrl = `${siteConfig.url}/proposals/view/${proposal.id}`;

    return NextResponse.json({
      success: true,
      proposalId: proposal.id,
      viewUrl,
    });
  } catch (error) {
    console.error("[Proposals] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
