"use client";

import type { SelectedService, CustomLineItem, Discount, Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import {
  formatCurrency,
  getServiceName,
  getServiceDescription,
} from "@/lib/proposals/calculations";
import { CATEGORIES, SERVICES } from "@/lib/proposals/services-data";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface Totals {
  oneTimeTotal: number;
  monthlyTotal: number;
  hostingFee: number;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
}

interface Props {
  selectedServices: SelectedService[];
  customLineItems: CustomLineItem[];
  discount: Discount | null;
  locale: Locale;
  totals: Totals;
  onBack: () => void;
  onContinue: () => void;
}

export function ReviewStep({
  selectedServices,
  customLineItems,
  discount,
  locale,
  totals,
  onBack,
  onContinue,
}: Props) {
  // Group services by category
  const groupedServices = CATEGORIES.map((cat) => {
    const services = selectedServices.filter((s) => {
      const full = SERVICES.find((svc) => svc.id === s.serviceId);
      return full?.category === cat.id;
    });
    return { category: cat, services };
  }).filter((group) => group.services.length > 0);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white">
          {t("review.title", locale)}
        </h2>
        <p className="mt-2 text-sm text-white/50">
          {t("review.subtitle", locale)}
        </p>
      </div>

      {/* Services grouped by category */}
      <div className="space-y-6">
        {groupedServices.map(({ category, services }) => (
          <div
            key={category.id}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <span>{category.icon}</span>
              {locale === "es" ? category.name_es : locale === "fr" ? category.name_fr : category.name}
            </h3>
            <div className="space-y-3">
              {services.map((s) => {
                const full = SERVICES.find((svc) => svc.id === s.serviceId);
                return (
                  <div
                    key={s.serviceId}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-red-400" />
                        <span className="text-sm text-white">
                          {getServiceName(s.serviceId, locale)}
                          {s.quantity > 1 && (
                            <span className="ml-1 text-white/40">
                              x{s.quantity}
                            </span>
                          )}
                        </span>
                      </div>
                      <p className="ml-5.5 mt-0.5 text-xs leading-relaxed text-white/40">
                        {getServiceDescription(s.serviceId, locale)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-sm font-medium text-white">
                        {formatCurrency(s.unitPrice * s.quantity)}
                      </span>
                      {full && (
                        <span className="ml-1 text-[10px] text-white/30">
                          {t(`billing.${full.billing}`, locale)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Custom items */}
        {customLineItems.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">
              {t("custom.title", locale)}
            </h3>
            <div className="space-y-3">
              {customLineItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-sm text-white">{item.name}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">
                      {formatCurrency(item.price)}
                    </span>
                    <span className="ml-1 text-[10px] text-white/30">
                      {t(`billing.${item.billing}`, locale)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing summary */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="space-y-2">
          {totals.oneTimeTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-white/60">
                {t("label.onetime", locale)}
              </span>
              <span className="text-white">
                {formatCurrency(totals.oneTimeTotal)}
              </span>
            </div>
          )}
          {totals.monthlyTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-white/60">
                {t("label.monthly", locale)}
              </span>
              <span className="text-white">
                {formatCurrency(totals.monthlyTotal)}
                <span className="text-white/40">/mo</span>
              </span>
            </div>
          )}
          {totals.hostingFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-white/60">
                {t("label.hosting", locale)}
              </span>
              <span className="text-white">
                {formatCurrency(totals.hostingFee)}
                <span className="text-white/40">/mo</span>
              </span>
            </div>
          )}
          {discount && totals.discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-400/80">
                {t("label.discount", locale)}
              </span>
              <span className="text-green-400">
                -{formatCurrency(totals.discountAmount)}
              </span>
            </div>
          )}
          <div className="flex justify-between border-t border-white/10 pt-3">
            <span className="text-base font-semibold text-white">
              {t("label.total", locale)}
            </span>
            <span className="text-xl font-bold text-red-400">
              {formatCurrency(totals.grandTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("review.edit", locale)}
        </button>
        <button
          onClick={onContinue}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          {t("btn.continue", locale)}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
