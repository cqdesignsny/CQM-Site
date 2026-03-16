import { NextRequest, NextResponse } from "next/server";
import {
  getProposalByLeadId,
  updateLeadStatus,
  addNoteToLead,
} from "@/lib/notion/client";
import { sendAcceptanceNotification } from "@/lib/proposals/email";
import { sendSlackNotification } from "@/lib/slack";
import { siteConfig } from "@/lib/site-config";
import type { Proposal } from "@/lib/proposals/types";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Look up the proposal in Notion by Lead ID
    const lead = await getProposalByLeadId(id);

    if (!lead) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 }
      );
    }

    const props = lead.properties as Record<string, Record<string, unknown>>;

    // Extract values from Notion properties
    const getName = (p: Record<string, unknown>) => {
      const title = p.title as Array<{ plain_text: string }> | undefined;
      return title?.[0]?.plain_text || "";
    };
    const getText = (p: Record<string, unknown>) => {
      const rt = p.rich_text as Array<{ plain_text: string }> | undefined;
      return rt?.[0]?.plain_text || "";
    };
    const getNumber = (p: Record<string, unknown>) => {
      return (p.number as number) || 0;
    };
    const getSelect = (p: Record<string, unknown>) => {
      const sel = p.select as { name: string } | null;
      return sel?.name || "";
    };

    // Check if already accepted
    if (getSelect(props.Status) === "Won") {
      return NextResponse.json({
        success: true,
        alreadyAccepted: true,
      });
    }

    const now = new Date().toISOString();

    // Update status in Notion
    await updateLeadStatus(lead.notionPageId, "won");
    await addNoteToLead(
      lead.notionPageId,
      `Proposal accepted on ${new Date(now).toLocaleDateString()}`
    );

    // Build a minimal proposal object for email
    const proposal: Proposal = {
      id,
      parentId: null,
      assessmentId: null,
      version: 1,
      locale: (getSelect(props.Locale)?.toLowerCase() || "en") as Proposal["locale"],
      contact: {
        name: getName(props.Name),
        email: (props.Email as { email: string })?.email || "",
        phone: (props.Phone as { phone_number: string })?.phone_number || "",
      },
      referredBy: getText(props["Referred By"]),
      status: "won",
      selectedServices: [],
      customLineItems: [],
      packageId: getSelect(props.Package)?.toLowerCase() || null,
      oneTimeTotal: getNumber(props["One-Time Total"]),
      monthlyTotal: getNumber(props["Monthly Total"]),
      hostingFee: 0,
      discountType: null,
      discountValue: null,
      discountAmount: 0,
      grandTotal: getNumber(props["Grand Total"]),
      notionPageId: lead.notionPageId,
      createdAt: now,
      acceptedAt: now,
      updatedAt: now,
    };

    // Send acceptance notification email (non-blocking)
    try {
      await sendAcceptanceNotification(proposal);
    } catch (emailError) {
      console.error("[Proposals] Acceptance email error:", emailError);
    }

    // Slack notification (non-blocking)
    try {
      await sendSlackNotification({
        event: "proposal_accepted",
        name: proposal.contact.name,
        email: proposal.contact.email,
        phone: proposal.contact.phone,
        details: {
          "Proposal ID": id,
          "Grand Total": `$${proposal.grandTotal.toLocaleString()}`,
          "View": `${siteConfig.url}/proposals/view/${id}`,
        },
      });
    } catch (slackError) {
      console.error("[Proposals] Slack error:", slackError);
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
