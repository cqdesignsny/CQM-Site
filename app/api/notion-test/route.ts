import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_LEADS_DATABASE_ID;
  
  if (!apiKey || !dbId) {
    return NextResponse.json({ error: "Missing env vars", hasApiKey: !!apiKey, hasDbId: !!dbId });
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties: {
          Name: { title: [{ text: { content: "VERCEL ENV TEST" } }] },
          Email: { email: "test@test.com" },
          Source: { select: { name: "Assessment" } },
          Status: { select: { name: "New" } },
        },
      }),
    });

    const data = await response.json();
    return NextResponse.json({ 
      status: response.status,
      object: data.object,
      id: data.id,
      error: data.message,
      dbIdUsed: dbId,
      dbIdLength: dbId.length,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) });
  }
}
