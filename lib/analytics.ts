/**
 * Analytics Helper - Centralized tracking for multiple platforms
 *
 * Approach: Single track() function that dispatches to all configured platforms
 * Why this pattern?
 * - Single source of truth for events
 * - Easy to add/remove platforms without touching component code
 * - Type-safe event names prevent typos
 * - Can be extended with middleware (e.g., user consent, dev mode filtering)
 *
 * Setup Instructions:
 * 1. Add your tracking IDs to .env.local (see .env.example)
 * 2. Uncomment the relevant platform initialization below
 * 3. Test events in browser console: window.track('test_event', { test: true })
 */

type EventName =
  | "page_view"
  | "button_click"
  | "form_submit"
  | "cta_click"
  | "video_play"
  | "download"
  | "link_click"
  | "strategy_call_booked"
  | "audit_requested"
  | "studio_tour_booked";

type EventPayload = Record<string, unknown>;

/**
 * Track an event across all configured analytics platforms
 *
 * @param eventName - Standardized event name
 * @param payload - Additional event data (will be sanitized)
 *
 * @example
 * track('cta_click', { cta_type: 'strategy_call', location: 'hero' })
 */
export function track(eventName: EventName, payload?: EventPayload): void {
  // In development, log to console instead of tracking
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, payload);
    return;
  }

  // TODO: Initialize platforms when IDs are added to .env
  // Example for GA4:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', eventName, payload);
  // }

  // Example for Meta Pixel:
  // if (typeof window !== 'undefined' && window.fbq) {
  //   window.fbq('track', eventName, payload);
  // }

  // Example for TikTok Pixel:
  // if (typeof window !== 'undefined' && window.ttq) {
  //   window.ttq.track(eventName, payload);
  // }

  // Example for LinkedIn Insight Tag:
  // if (typeof window !== 'undefined' && window.lintrk) {
  //   window.lintrk('track', { conversion_id: eventName });
  // }
}

/**
 * Track page views (call in useEffect on route changes)
 */
export function trackPageView(path: string): void {
  track("page_view", { path });
}

// Extend Window interface for TypeScript (uncomment when adding platform scripts)
// declare global {
//   interface Window {
//     gtag?: (...args: unknown[]) => void;
//     fbq?: (...args: unknown[]) => void;
//     ttq?: { track: (event: string, data?: unknown) => void };
//     lintrk?: (method: string, data: unknown) => void;
//   }
// }





