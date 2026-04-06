/**
 * Spam Protection — Server-side utilities for form spam prevention
 *
 * Six layers:
 * 1. Honeypot check — reject if hidden field is filled (bots auto-fill everything)
 * 2. Time check — reject if form submitted in under 2 seconds (bots are instant)
 * 3. Rate limiting — max requests per IP per time window (in-memory, resets on deploy)
 * 4. Duplicate email blocking — same email can't submit within 1 hour
 * 5. Suspicious content patterns — flag phishing/spam patterns in message text
 * 6. Suspicious email domain — flag unusual TLDs commonly used in spam
 */

// In-memory rate limiter (per-IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
// In-memory duplicate email tracker
const recentEmails = new Map<string, number>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP
const DUPLICATE_EMAIL_WINDOW = 60 * 60 * 1000; // 1 hour

// Suspicious TLDs commonly used in spam/phishing
const SUSPICIOUS_TLDS = new Set([
  ".pro", ".xyz", ".top", ".click", ".link", ".buzz", ".gq", ".ml",
  ".cf", ".tk", ".ga", ".pw", ".cc", ".ws", ".icu", ".cam", ".rest",
  ".monster", ".bid", ".stream", ".racing", ".download", ".win",
  ".review", ".party", ".trade", ".science", ".work", ".date",
]);

// Patterns commonly found in phishing/spam contact form messages
const SPAM_PATTERNS = [
  /USD\s*[\d,]+[,.]?\d*/i,           // "USD 240,000" type amounts
  /budget[:\s]*(?:up to|around|approximately)?\s*\$?\d{4,}/i, // budget mentions with large amounts
  /\b(?:bitcoin|crypto|blockchain|nft)\b.*\b(?:invest|opportunity|partner)\b/i,
  /\b(?:SEO|backlink|link building)\b.*\b(?:guarantee|rank #1|first page)\b/i,
  /\bI (?:am |)(?:writing|reaching|contacting) (?:you |)(?:from|on behalf)\b/i, // "I am writing from..."
  /\b(?:kindly|humbly|urgently) (?:request|need|require)\b/i,
  /(?:wire transfer|western union|money ?gram|cryptocurrency payment)/i,
  /(?:prince|inheritance|lottery|winner|beneficiary|next of kin)/i,
  /\b(?:we are|i am) (?:a |)(?:company|firm|agency|organization) (?:from|based in|located)\b/i,
];

interface SpamCheckOptions {
  honeypot?: string;
  formLoadedAt?: number;
  ip?: string;
  email?: string;
  message?: string;
}

interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

export function checkForSpam({ honeypot, formLoadedAt, ip, email, message }: SpamCheckOptions): SpamCheckResult {
  // 1. Honeypot check
  if (honeypot && honeypot.trim().length > 0) {
    console.log("[Spam] Honeypot triggered");
    return { isSpam: true, reason: "honeypot" };
  }

  // 2. Time check
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

    // Clean up old entries
    if (rateLimitMap.size > 1000) {
      for (const [key, val] of rateLimitMap) {
        if (now > val.resetAt) rateLimitMap.delete(key);
      }
    }
  }

  // 4. Duplicate email blocking
  if (email) {
    const normalizedEmail = email.trim().toLowerCase();
    const now = Date.now();
    const lastSubmission = recentEmails.get(normalizedEmail);

    if (lastSubmission && now - lastSubmission < DUPLICATE_EMAIL_WINDOW) {
      console.log(`[Spam] Duplicate email blocked: ${normalizedEmail}`);
      return { isSpam: true, reason: "duplicate_email" };
    }

    recentEmails.set(normalizedEmail, now);

    // Clean up old entries
    if (recentEmails.size > 500) {
      for (const [key, val] of recentEmails) {
        if (now - val > DUPLICATE_EMAIL_WINDOW) recentEmails.delete(key);
      }
    }
  }

  // 5. Suspicious email domain
  if (email) {
    const domain = email.substring(email.lastIndexOf("."));
    if (SUSPICIOUS_TLDS.has(domain.toLowerCase())) {
      console.log(`[Spam] Suspicious TLD: ${domain} for ${email}`);
      return { isSpam: true, reason: "suspicious_tld" };
    }
  }

  // 6. Suspicious content patterns in message
  if (message) {
    for (const pattern of SPAM_PATTERNS) {
      if (pattern.test(message)) {
        console.log(`[Spam] Content pattern matched: ${pattern.source.slice(0, 40)}...`);
        return { isSpam: true, reason: "spam_content" };
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
