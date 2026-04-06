/**
 * Spam Protection — Server-side utilities for form spam prevention
 *
 * Three layers:
 * 1. Honeypot check — reject if hidden field is filled (bots auto-fill everything)
 * 2. Time check — reject if form submitted in under 2 seconds (bots are instant)
 * 3. Rate limiting — max requests per IP per time window (in-memory, resets on deploy)
 */

// In-memory rate limiter (per-IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP

interface SpamCheckOptions {
  honeypot?: string; // value of the honeypot field (should be empty)
  formLoadedAt?: number; // timestamp when form was rendered
  ip?: string; // request IP for rate limiting
}

interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

export function checkForSpam({ honeypot, formLoadedAt, ip }: SpamCheckOptions): SpamCheckResult {
  // 1. Honeypot check — if the hidden field has a value, it's a bot
  if (honeypot && honeypot.trim().length > 0) {
    console.log("[Spam] Honeypot triggered");
    return { isSpam: true, reason: "honeypot" };
  }

  // 2. Time check — if submitted in under 2 seconds, likely a bot
  if (formLoadedAt) {
    const elapsed = Date.now() - formLoadedAt;
    if (elapsed < 2000) {
      console.log(`[Spam] Time check failed: ${elapsed}ms`);
      return { isSpam: true, reason: "too_fast" };
    }
  }

  // 3. Rate limiting by IP
  if (ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (entry && now < entry.resetAt) {
      if (entry.count >= RATE_LIMIT_MAX) {
        console.log(`[Spam] Rate limit exceeded for ${ip}: ${entry.count} requests`);
        return { isSpam: true, reason: "rate_limited" };
      }
      entry.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    }

    // Clean up old entries periodically
    if (rateLimitMap.size > 1000) {
      for (const [key, val] of rateLimitMap) {
        if (now > val.resetAt) rateLimitMap.delete(key);
      }
    }
  }

  return { isSpam: false };
}

/**
 * Extract client IP from Next.js request headers
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
