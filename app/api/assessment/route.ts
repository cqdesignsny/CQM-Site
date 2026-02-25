import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createServerSupabaseClient } from "@/lib/supabase/client";
import {
  calculateCategoryScores,
  calculateOverallScore,
  getRecommendedServices,
} from "@/lib/assessment/scoring";
import type { AssessmentAnswer } from "@/lib/proposals/types";

interface AssessmentBody {
  locale: "en" | "es";
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

    // Save to Supabase if configured — gracefully skip if not
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createServerSupabaseClient();
        const { error: dbError } = await supabase
          .from("assessment_results")
          .insert({
            id: assessmentId,
            contact_name: body.contact.name,
            contact_email: body.contact.email,
            contact_phone: body.contact.phone || null,
            answers: body.answers,
            category_scores: categoryScores,
            overall_score: overallScore,
            recommended_services: recommendedServices,
            locale: body.locale || "en",
          });

        if (dbError) {
          console.error("[Assessment] Supabase insert error:", dbError);
          // Continue anyway — still return results to user
        }
      } catch (dbErr) {
        console.error("[Assessment] Database error (continuing without save):", dbErr);
      }
    } else {
      console.warn("[Assessment] Supabase not configured — skipping database save");
    }

    // Webhook support for n8n / external automation
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "assessment_completed",
            assessmentId,
            contact: body.contact,
            overallScore,
            categoryScores,
            recommendedServices,
            locale: body.locale,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error("[Assessment] Webhook error:", webhookError);
      }
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
