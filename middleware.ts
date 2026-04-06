import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: Domain redirect
 *
 * All secondary domains 301 redirect to creativequalitymarketing.com
 * so SEO authority is concentrated on one domain. Without this, Google
 * sees duplicate content across all domains and splits ranking signals.
 */

const PRIMARY_DOMAIN = "creativequalitymarketing.com";

// Domains that should NOT redirect (primary + Vercel preview)
const ALLOWED_HOSTS = new Set([
  PRIMARY_DOMAIN,
  `www.${PRIMARY_DOMAIN}`,
  "localhost",
]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] || "";

  // Skip if it's the primary domain, www, localhost, or a Vercel preview URL
  if (ALLOWED_HOSTS.has(host) || host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  // 301 redirect to primary domain, preserving the path and query string
  const url = new URL(request.url);
  url.hostname = PRIMARY_DOMAIN;
  url.port = "";
  url.protocol = "https:";

  return NextResponse.redirect(url.toString(), 301);
}

export const config = {
  // Run on all routes except static files and API routes
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|api/).*)",
  ],
};
