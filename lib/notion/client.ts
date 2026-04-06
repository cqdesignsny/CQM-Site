import { Client } from "@notionhq/client";
import type {
  Proposal,
  ProposalStatus,
  Locale,
} from "@/lib/proposals/types";
import { siteConfig } from "@/lib/site-config";

// ---------------------------------------------------------------------------
// Singleton Notion client
// ---------------------------------------------------------------------------

let notionClient: Client | null = null;

function getNotion(): Client {
  if (notionClient) return notionClient;
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) throw new Error("Missing NOTION_API_KEY environment variable");
  notionClient = new Client({ auth: apiKey });
  return notionClient;
}

function getLeadsDbId(): string {
  const id = process.env.NOTION_LEADS_DATABASE_ID;
  if (!id) throw new Error("Missing NOTION_LEADS_DATABASE_ID environment variable");
  return id;
}

/** Data source ID for querying (v5 SDK uses dataSources.query) */
function getLeadsDataSourceId(): string {
  const id = process.env.NOTION_LEADS_DATASOURCE_ID;
  if (!id) throw new Error("Missing NOTION_LEADS_DATASOURCE_ID environment variable");
  return id;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function statusLabel(status: ProposalStatus): string {
  const map: Record<ProposalStatus, string> = {
    new: "New",
    contacted: "Contacted",
    negotiating: "Negotiating",
    won: "Won",
    lost: "Lost",
  };
  return map[status];
}

function localeLabel(locale: Locale): string {
  return locale.toUpperCase() as "EN" | "ES" | "FR";
}

function textProp(content: string) {
  return { rich_text: [{ text: { content } }] };
}

// ---------------------------------------------------------------------------
// CREATE: Proposal lead
// ---------------------------------------------------------------------------

export async function createProposalLead(proposal: Proposal): Promise<string> {
  const notion = getNotion();
  const viewUrl = `${siteConfig.url}/proposals/view/${proposal.id}`;

  const packageLabel = proposal.packageId
    ? proposal.packageId.charAt(0).toUpperCase() + proposal.packageId.slice(1)
    : "Custom";

  const response = await notion.pages.create({
    parent: { database_id: getLeadsDbId() },
    properties: {
      Name: {
        title: [{ text: { content: proposal.contact.name } }],
      },
      Email: { email: proposal.contact.email },
      Phone: { phone_number: proposal.contact.phone || null },
      Source: { select: { name: "Proposal" } },
      Status: { select: { name: statusLabel(proposal.status) } },
      "Lead ID": textProp(proposal.id),
      "One-Time Total": { number: proposal.oneTimeTotal },
      "Monthly Total": { number: proposal.monthlyTotal },
      "Grand Total": { number: proposal.grandTotal },
      Package: {
        select: {
          name: ["Startup", "Growth", "Scale"].includes(packageLabel)
            ? packageLabel
            : "Custom",
        },
      },
      "Proposal Link": { url: viewUrl },
      "Referred By": textProp(proposal.referredBy || "Direct"),
      Locale: { select: { name: localeLabel(proposal.locale) } },
    },
  });

  // Store the full proposal JSON as a code block in the page body
  // so we can reconstruct it on the /proposals/view/[id] page
  await notion.blocks.children.append({
    block_id: response.id,
    children: [
      {
        object: "block",
        type: "code",
        code: {
          rich_text: [
            {
              type: "text",
              text: { content: JSON.stringify(proposal) },
            },
          ],
          language: "json",
        },
      },
    ],
  });

  return response.id;
}

// ---------------------------------------------------------------------------
// READ: Fetch full proposal data from Notion page body
// ---------------------------------------------------------------------------

export async function getFullProposal(
  leadId: string
): Promise<Proposal | null> {
  const lead = await getProposalByLeadId(leadId);
  if (!lead) return null;

  const notion = getNotion();

  // Read the page blocks to find the JSON code block
  const blocks = await notion.blocks.children.list({
    block_id: lead.notionPageId,
    page_size: 10,
  });

  for (const block of blocks.results) {
    const b = block as unknown as {
      type: string;
      code?: {
        rich_text: Array<{ plain_text: string }>;
        language: string;
      };
    };

    if (b.type === "code" && b.code?.language === "json") {
      try {
        const json = b.code.rich_text.map((t) => t.plain_text).join("");
        const proposal = JSON.parse(json) as Proposal;
        // Update status from the property (may have changed)
        const props = lead.properties as Record<string, Record<string, unknown>>;
        const statusSel = props.Status as { select?: { name: string } };
        if (statusSel?.select?.name) {
          const statusMap: Record<string, ProposalStatus> = {
            New: "new",
            Contacted: "contacted",
            Negotiating: "negotiating",
            Won: "won",
            Lost: "lost",
          };
          proposal.status = statusMap[statusSel.select.name] || proposal.status;
        }
        proposal.notionPageId = lead.notionPageId;
        return proposal;
      } catch {
        console.error("[Notion] Failed to parse proposal JSON from page body");
      }
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// CREATE: Assessment lead
// ---------------------------------------------------------------------------

export interface AssessmentLeadData {
  id: string;
  contact: { name: string; email: string; phone: string };
  overallScore: number;
  categoryScores: { category: string; percentage: number }[];
  recommendedServices: string[];
  locale: Locale;
}

export async function createAssessmentLead(
  data: AssessmentLeadData
): Promise<string> {
  const notion = getNotion();

  const scoreBreakdown = data.categoryScores
    .map((cs) => `${cs.category}: ${cs.percentage}%`)
    .join(", ");

  console.log("[Notion] Creating assessment lead for:", data.contact.name, data.contact.email);

  const response = await notion.pages.create({
    parent: { database_id: getLeadsDbId() },
    properties: {
      Name: { title: [{ text: { content: data.contact.name } }] },
      Email: { email: data.contact.email },
      Source: { select: { name: "Assessment" } },
      Status: { select: { name: "New" } },
      "Lead ID": textProp(data.id),
      Score: { number: data.overallScore },
      "Score Breakdown": textProp(scoreBreakdown),
      Locale: { select: { name: localeLabel(data.locale || "en") } },
    },
  });

  console.log("[Notion] Assessment lead created:", response.id);
  return response.id;
}

// ---------------------------------------------------------------------------
// CREATE: Contact form lead
// ---------------------------------------------------------------------------

export interface ContactLeadData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  locale?: string;
}

export async function createContactLead(
  data: ContactLeadData
): Promise<string> {
  const notion = getNotion();

  console.log("[Notion] Creating contact lead for:", data.name, data.email);

  const response = await notion.pages.create({
    parent: { database_id: getLeadsDbId() },
    properties: {
      Name: { title: [{ text: { content: data.name } }] },
      Email: { email: data.email },
      Source: { select: { name: "Contact Form" } },
      Status: { select: { name: "New" } },
      "Service Interest": textProp(data.serviceInterest || ""),
      Message: textProp(data.message),
      Locale: { select: { name: localeLabel((data.locale as Locale) || "en") } },
    },
  });

  console.log("[Notion] Contact lead created:", response.id);
  return response.id;
}

// ---------------------------------------------------------------------------
// READ: Fetch proposal by Lead ID
// ---------------------------------------------------------------------------

export async function getProposalByLeadId(
  leadId: string
): Promise<{ notionPageId: string; properties: Record<string, unknown> } | null> {
  const notion = getNotion();

  const response = await notion.dataSources.query({
    data_source_id: getLeadsDataSourceId(),
    filter: {
      and: [
        { property: "Lead ID", rich_text: { equals: leadId } },
        { property: "Source", select: { equals: "Proposal" } },
      ],
    },
    page_size: 1,
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as unknown as {
    id: string;
    properties: Record<string, unknown>;
  };

  return {
    notionPageId: page.id,
    properties: page.properties,
  };
}

// ---------------------------------------------------------------------------
// READ: Fetch assessment by Lead ID
// ---------------------------------------------------------------------------

export async function getAssessmentByLeadId(
  leadId: string
): Promise<{ notionPageId: string; properties: Record<string, unknown> } | null> {
  const notion = getNotion();

  const response = await notion.dataSources.query({
    data_source_id: getLeadsDataSourceId(),
    filter: {
      and: [
        { property: "Lead ID", rich_text: { equals: leadId } },
        { property: "Source", select: { equals: "Assessment" } },
      ],
    },
    page_size: 1,
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as unknown as {
    id: string;
    properties: Record<string, unknown>;
  };

  return {
    notionPageId: page.id,
    properties: page.properties,
  };
}

// ---------------------------------------------------------------------------
// UPDATE: Proposal status
// ---------------------------------------------------------------------------

export async function updateLeadStatus(
  notionPageId: string,
  status: ProposalStatus
): Promise<void> {
  const notion = getNotion();

  await notion.pages.update({
    page_id: notionPageId,
    properties: {
      Status: { select: { name: statusLabel(status) } },
    },
  });
}

// ---------------------------------------------------------------------------
// UPDATE: Add a note as a block
// ---------------------------------------------------------------------------

export async function addNoteToLead(
  notionPageId: string,
  note: string
): Promise<void> {
  const notion = getNotion();

  await notion.blocks.children.append({
    block_id: notionPageId,
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: note } }],
        },
      },
    ],
  });
}
