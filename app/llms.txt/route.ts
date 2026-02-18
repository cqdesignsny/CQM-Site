import { NextResponse } from "next/server";
import { buildLlmsText } from "@/lib/llms";

export function GET() {
  return new NextResponse(buildLlmsText(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
