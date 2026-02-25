"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Service Lead Capture Component - Inline CTA for service inquiries
 * i18n: All visible text uses the global t() function
 */
interface ServiceLeadCaptureProps {
  serviceName: string;
}

export function ServiceLeadCapture({ serviceName }: ServiceLeadCaptureProps) {
  const { t } = useLanguage();

  const handleSubmit = () => {
    track("form_submit", {
      form_type: "service_inquiry",
      service: serviceName,
    });
    window.location.href = `/contact?service=${encodeURIComponent(serviceName)}`;
  };

  return (
    <section className="mb-20 rounded-xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-red-950 p-8 text-white md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
          {t("serviceDetail.nextStep")}
        </p>
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          {t("serviceDetail.readyToLaunch")}
        </h2>
        <p className="mb-6 text-sm text-white/75 sm:text-base">
          {t("serviceDetail.leadCapture.desc")}
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={handleSubmit}>
            {t("serviceDetail.bookCall")}
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
              {t("serviceDetail.requestAudit")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
