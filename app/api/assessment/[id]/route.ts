import { NextResponse } from "next/server";
import { getAssessmentByLeadId } from "@/lib/notion/client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const lead = await getAssessmentByLeadId(id);

    if (!lead) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    const props = lead.properties as Record<string, Record<string, unknown>>;

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

    // Parse score breakdown back into category scores
    const breakdownText = getText(props["Score Breakdown"]);
    const categoryScores = breakdownText
      ? breakdownText.split(", ").map((entry) => {
          const [category, pctStr] = entry.split(": ");
          return {
            category,
            percentage: parseInt(pctStr, 10) || 0,
          };
        })
      : [];

    const recommendedText = getText(props["Recommended Services"]);
    const recommendedServices = recommendedText
      ? recommendedText.split(", ").filter(Boolean)
      : [];

    return NextResponse.json({
      id,
      contact: {
        name: getName(props.Name),
        email: (props.Email as { email: string })?.email || "",
        phone: (props.Phone as { phone_number: string })?.phone_number || "",
      },
      overallScore: getNumber(props.Score),
      categoryScores,
      recommendedServices,
      locale: getSelect(props.Locale)?.toLowerCase() || "en",
    });
  } catch (err) {
    console.error("[Assessment] GET error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
