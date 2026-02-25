import { Client } from "@notionhq/client";
import type { Proposal, ProposalStatus, AssessmentResult } from "./types";
import { siteConfig } from "@/lib/site-config";

function getNotionClient(): Client {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) throw new Error("Missing NOTION_API_KEY environment variable");
  return new Client({ auth: apiKey });
}

/**
 * Create a proposal page in the Notion Proposals database.
 * Returns the Notion page ID for future updates.
 */
export async function createProposalPage(
  proposal: Proposal
): Promise<string> {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_PROPOSALS_DATABASE_ID;
  if (!databaseId) throw new Error("Missing NOTION_PROPOSALS_DATABASE_ID");

  const viewUrl = `${siteConfig.url}/proposals/view/${proposal.id}`;

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      // Title property
      Name: {
        title: [
          {
            text: {
              content: `${proposal.contact.name} — ${proposal.id}`,
            },
          },
        ],
      },
      Email: {
        email: proposal.contact.email,
      },
      Phone: {
        phone_number: proposal.contact.phone || null,
      },
      "Referred By": {
        rich_text: [
          {
            text: { content: proposal.referredBy || "Direct" },
          },
        ],
      },
      "One-Time Total": {
        number: proposal.oneTimeTotal,
      },
      "Monthly Total": {
        number: proposal.monthlyTotal,
      },
      "Grand Total": {
        number: proposal.grandTotal,
      },
      Status: {
        select: { name: statusToNotionLabel(proposal.status) },
      },
      "Proposal Link": {
        url: viewUrl,
      },
      "Created Date": {
        date: { start: proposal.createdAt },
      },
    },
  });

  return response.id;
}

/**
 * Update the status of an existing proposal in Notion.
 */
export async function updateProposalStatus(
  notionPageId: string,
  status: ProposalStatus
): Promise<void> {
  const notion = getNotionClient();

  await notion.pages.update({
    page_id: notionPageId,
    properties: {
      Status: {
        select: { name: statusToNotionLabel(status) },
      },
    },
  });
}

/**
 * Append a note as a text block to a Notion page.
 */
export async function addNoteToProposal(
  notionPageId: string,
  note: string
): Promise<void> {
  const notion = getNotionClient();

  await notion.blocks.children.append({
    block_id: notionPageId,
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: note },
            },
          ],
        },
      },
    ],
  });
}

/**
 * Create an assessment result page in the Notion Assessments database.
 */
export async function createAssessmentPage(
  result: AssessmentResult
): Promise<string> {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_ASSESSMENTS_DATABASE_ID;
  if (!databaseId) throw new Error("Missing NOTION_ASSESSMENTS_DATABASE_ID");

  const scoreBreakdown = result.categoryScores
    .map((cs) => `${cs.category}: ${cs.percentage}%`)
    .join(", ");

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `${result.contact.name} — Score: ${result.overallScore}/100`,
            },
          },
        ],
      },
      Email: {
        email: result.contact.email,
      },
      Phone: {
        phone_number: result.contact.phone || null,
      },
      Score: {
        number: result.overallScore,
      },
      "Score Breakdown": {
        rich_text: [
          {
            text: { content: scoreBreakdown },
          },
        ],
      },
      "Recommended Services": {
        rich_text: [
          {
            text: {
              content: result.recommendedServiceIds.join(", "),
            },
          },
        ],
      },
      "Created Date": {
        date: { start: result.createdAt },
      },
    },
  });

  return response.id;
}

function statusToNotionLabel(status: ProposalStatus): string {
  const map: Record<ProposalStatus, string> = {
    new: "New",
    contacted: "Contacted",
    negotiating: "Negotiating",
    won: "Won",
    lost: "Lost",
  };
  return map[status];
}
