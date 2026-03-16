import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createAssessmentLead } from "@/lib/notion/client";
import { sendSlackNotification } from "@/lib/slack";
import {
  calculateCategoryScores,
  calculateOverallScore,
  getRecommendedServices,
} from "@/lib/assessment/scoring";
import type { AssessmentAnswer, Locale } from "@/lib/proposals/types";

interface AssessmentBody {
  locale: Locale;
  contact: { name: string; email: string; phone: string };
  answers: AssessmentAnswer[];
}

export async function POST(request: NextRequest) {
  try {
    const body: AssessmentBody = await request.json();

    if (!body.contact?.name || !body.contact?.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!body.answers || body.answers.length === 0) {
      return NextResponse.json(
        { error: "Answers are required" },
        { status: 400 }
      );
    }

    const categoryScores = calculateCategoryScores(body.answers);
    const overallScore = calculateOverallScore(categoryScores);
    const recommendedServices = getRecommendedServices(categoryScores);

    const assessmentId = `assess_${nanoid(12)}`;

    // 1. Save to Notion CRM
    try {
      await createAssessmentLead({
        id: assessmentId,
        contact: body.contact,
        overallScore,
        categoryScores,
        recommendedServices,
        locale: body.locale || "en",
      });
    } catch (notionError) {
      console.error("[Assessment] Notion create error:", notionError);
    }

    // 2. Slack notification (non-blocking)
    try {
      await sendSlackNotification({
        event: "assessment_completed",
        name: body.contact.name,
        email: body.contact.email,
        phone: body.contact.phone,
        details: {
          "Assessment ID": assessmentId,
          "Overall Score": `${overallScore}/100`,
          "Recommended": recommendedServices.join(", ") || "None",
        },
      });
    } catch (slackError) {
      console.error("[Assessment] Slack error:", slackError);
    }

    return NextResponse.json({
      success: true,
      assessmentId,
      overallScore,
      categoryScores,
      recommendedServices,
      builderUrl: `/proposals?from=assessment&id=${assessmentId}`,
    });
  } catch (error) {
    console.error("[Assessment] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
