import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { calculateAllTotals, formatCurrency } from "@/lib/proposals/calculations";
import { createProposalLead } from "@/lib/notion/client";
import { sendProposalEmail } from "@/lib/proposals/email";
import { sendSlackNotification } from "@/lib/slack";
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
      assessmentId: body.assessmentId || null,
      version: 1,
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

    // 1. Save to Notion CRM
    try {
      const notionPageId = await createProposalLead(proposal);
      proposal.notionPageId = notionPageId;
    } catch (notionError) {
      console.error("[Proposals] Notion create error:", notionError);
    }

    // 2. Send email via Resend (non-blocking)
    try {
      await sendProposalEmail(proposal, proposal.locale);
    } catch (emailError) {
      console.error("[Proposals] Email send error:", emailError);
    }

    // 3. Slack notification (non-blocking)
    try {
      await sendSlackNotification({
        event: "proposal_created",
        name: proposal.contact.name,
        email: proposal.contact.email,
        phone: proposal.contact.phone,
        details: {
          "Proposal ID": proposal.id,
          "Grand Total": formatCurrency(proposal.grandTotal),
          "One-Time": formatCurrency(proposal.oneTimeTotal),
          "Monthly": formatCurrency(proposal.monthlyTotal),
          "Package": proposal.packageId || "Custom",
          "Referred By": proposal.referredBy,
          "View": `${siteConfig.url}/proposals/view/${proposal.id}`,
        },
      });
    } catch (slackError) {
      console.error("[Proposals] Slack error:", slackError);
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
