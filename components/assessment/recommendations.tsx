"use client";

import Link from "next/link";
import type { Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import { getServiceName, getServiceDescription, formatCurrency } from "@/lib/proposals/calculations";
import { SERVICES } from "@/lib/proposals/services-data";
import { ArrowRight, Check } from "lucide-react";

interface Props {
  recommendedServices: string[];
  assessmentId: string;
  locale: Locale;
}

export function Recommendations({
  recommendedServices,
  assessmentId,
  locale,
}: Props) {
  if (recommendedServices.length === 0) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
        <Check className="mx-auto mb-3 h-8 w-8 text-green-400" />
        <h3 className="text-lg font-semibold text-white">
          {locale === "es"
            ? "\u00A1Excelente trabajo!"
            : locale === "fr"
              ? "Excellent travail !"
              : "Great job!"}
        </h3>
        <p className="mt-2 text-sm text-white/50">
          {locale === "es"
            ? "Su marketing est\u00E1 en excelente forma. Cont\u00E1ctenos si desea llevar las cosas al siguiente nivel."
            : locale === "fr"
              ? "Votre marketing est en excellente forme. Contactez-nous si vous souhaitez passer au niveau sup\u00E9rieur."
              : "Your marketing is in great shape. Contact us if you want to take things to the next level."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="mb-2 text-base font-semibold text-white">
          {t("assessment.recommendations", locale)}
        </h3>
        <p className="mb-5 text-xs text-white/40">
          {locale === "es"
            ? "Basado en sus respuestas, estos servicios pueden ayudarle a mejorar."
            : locale === "fr"
              ? "Sur la base de vos r\u00E9ponses, ces services peuvent vous aider \u00E0 vous am\u00E9liorer."
              : "Based on your answers, these services can help you improve."}
        </p>

        <div className="space-y-3">
          {recommendedServices.map((serviceId) => {
            const service = SERVICES.find((s) => s.id === serviceId);
            if (!service) return null;

            return (
              <div
                key={serviceId}
                className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">
                    {getServiceName(serviceId, locale)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/40">
                    {getServiceDescription(serviceId, locale)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-white">
                    {service.priceMax
                      ? `${formatCurrency(service.price)} - ${formatCurrency(service.priceMax)}`
                      : formatCurrency(service.price)}
                  </p>
                  <p className="text-[10px] text-white/30">
                    {t(`billing.${service.billing}`, locale)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <Link
          href={`/proposals?from=assessment&id=${assessmentId}&services=${recommendedServices.join(",")}`}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          {t("assessment.buildPackage", locale)}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
