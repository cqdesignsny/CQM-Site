"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/**
 * Service Lead Capture Component - Inline form for service inquiries
 *
 * Approach: Simple form that can integrate with Tally/Typeform
 * TODO: Replace with actual form integration
 * Options:
 * - Tally: Embed via iframe (easiest)
 * - Typeform: Embed via iframe
 * - Custom form: Use React Hook Form + API route
 */
interface ServiceLeadCaptureProps {
  serviceName: string;
}

export function ServiceLeadCapture({ serviceName }: ServiceLeadCaptureProps) {
  const handleSubmit = () => {
    track("form_submit", {
      form_type: "service_inquiry",
      service: serviceName,
    });
    // TODO: Open Tally/Typeform modal or redirect
    // For now, redirect to contact page with service pre-filled
    window.location.href = `/contact?service=${encodeURIComponent(serviceName)}`;
  };

  return (
    <section className="mb-20 rounded-xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-red-950 p-8 text-white md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
          Next Step
        </p>
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Ready to Launch {serviceName}?
        </h2>
        <p className="mb-6 text-sm text-white/75 sm:text-base">
          Book a strategy call and we&apos;ll map the fastest path to execution,
          including timelines, priorities, and the right plan.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={handleSubmit}>
            Book a Strategy Call
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/5 text-white hover:bg-white/15"
            asChild
          >
            <Link
              href="/contact?type=audit"
              onClick={() =>
                track("link_click", {
                  link_type: "free_audit",
                  location: "lead_capture",
                })
              }
            >
              Request a Free Audit
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}




