import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("assessment_results")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: data.id,
      contact: {
        name: data.contact_name,
        email: data.contact_email,
        phone: data.contact_phone,
      },
      overallScore: data.overall_score,
      categoryScores: data.category_scores,
      recommendedServices: data.recommended_services,
      locale: data.locale,
      createdAt: data.created_at,
    });
  } catch (err) {
    console.error("[Assessment] GET error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
