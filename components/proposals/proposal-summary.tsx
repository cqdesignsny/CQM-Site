"use client";

import type { SelectedService, CustomLineItem, Discount, Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import {
  formatCurrency,
  getServiceName,
} from "@/lib/proposals/calculations";
import { Trash2, X, ShoppingBag } from "lucide-react";

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
  onContinue: () => void;
  onClear: () => void;
  onRemoveService: (serviceId: string) => void;
}

export function ProposalSummary({
  selectedServices,
  customLineItems,
  discount,
  locale,
  totals,
  onContinue,
  onClear,
  onRemoveService,
}: Props) {
  const totalItems = selectedServices.length + customLineItems.length;
  const hasItems = totalItems > 0;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">
          {t("sidebar.title", locale)}
        </h3>
        {hasItems && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-red-400"
          >
            <Trash2 className="h-3 w-3" />
            {t("btn.clear", locale)}
          </button>
        )}
      </div>

      {!hasItems ? (
        <div className="flex flex-col items-center py-8 text-center">
          <ShoppingBag className="mb-3 h-8 w-8 text-white/20" />
          <p className="text-sm text-white/40">{t("sidebar.empty", locale)}</p>
        </div>
      ) : (
        <>
          {/* Selected services list */}
          <div className="mb-4 max-h-60 space-y-1 overflow-y-auto scrollbar-none">
            {selectedServices.map((s) => (
              <div
                key={s.serviceId}
                className="group flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
              >
                <span className="min-w-0 flex-1 truncate text-xs text-white/70">
                  {getServiceName(s.serviceId, locale)}
                  {s.quantity > 1 && (
                    <span className="ml-1 text-white/40">x{s.quantity}</span>
                  )}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-white/50">
                    {formatCurrency(s.unitPrice * s.quantity)}
                  </span>
                  <button
                    onClick={() => onRemoveService(s.serviceId)}
                    className="flex h-5 w-5 items-center justify-center rounded opacity-0 transition-all hover:bg-red-600/20 hover:text-red-400 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3 text-white/30" />
                  </button>
                </div>
              </div>
            ))}
            {customLineItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg px-2 py-1.5"
              >
                <span className="min-w-0 flex-1 truncate text-xs text-white/70">
                  {item.name}
                </span>
                <span className="text-xs font-medium text-white/50">
                  {formatCurrency(item.price)}
                </span>
              </div>
            ))}
          </div>

          {/* Count */}
          <p className="mb-4 text-xs text-white/40">
            {totalItems} {t("sidebar.serviceCount", locale)}
          </p>

          {/* Pricing breakdown */}
          <div className="space-y-2 border-t border-white/10 pt-4">
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
                  <span className="text-white/40">{t("label.perMonthShort", locale)}</span>
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
                  <span className="text-white/40">{t("label.perMonthShort", locale)}</span>
                </span>
              </div>
            )}
            {totals.hostingFee > 0 && (
              <p className="text-[10px] text-amber-400/60">
                {t("label.hostingNote", locale)}
              </p>
            )}
            {discount && totals.discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-400/80">
                  {t("label.discount", locale)}
                  <span className="ml-1 text-xs text-white/30">
                    ({discount.type === "percentage" ? `${discount.value}%` : formatCurrency(discount.value)})
                  </span>
                </span>
                <span className="text-green-400">
                  -{formatCurrency(totals.discountAmount)}
                </span>
              </div>
            )}

            {/* Grand total */}
            <div className="flex justify-between border-t border-white/10 pt-3">
              <span className="font-semibold text-white">
                {t("label.total", locale)}
              </span>
              <span className="text-lg font-bold text-red-400">
                {formatCurrency(totals.grandTotal)}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onContinue}
            className="mt-5 w-full rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            {t("sidebar.continue", locale)}
          </button>
        </>
      )}
    </div>
  );
}
