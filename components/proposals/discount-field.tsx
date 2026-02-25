"use client";

import type { Discount, Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import { Percent, DollarSign, X } from "lucide-react";

interface Props {
  discount: Discount | null;
  locale: Locale;
  onChange: (discount: Discount | null) => void;
}

export function DiscountField({ discount, locale, onChange }: Props) {
  const type = discount?.type ?? "percentage";
  const value = discount?.value ?? 0;

  const handleTypeChange = (newType: "percentage" | "flat") => {
    onChange({ type: newType, value });
  };

  const handleValueChange = (raw: string) => {
    const parsed = parseFloat(raw);
    if (isNaN(parsed) || parsed < 0) {
      onChange(null);
      return;
    }
    onChange({ type, value: parsed });
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          {t("discount.title", locale)}
        </h3>
        {discount && (
          <button
            onClick={() => onChange(null)}
            className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-red-400"
          >
            <X className="h-3 w-3" />
            {t("discount.clear", locale)}
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        {/* Type toggle */}
        <div className="flex rounded-lg border border-white/10">
          <button
            onClick={() => handleTypeChange("percentage")}
            className={`flex items-center gap-1 rounded-l-lg px-3 py-2 text-xs font-medium transition-colors ${
              type === "percentage"
                ? "bg-red-600/20 text-red-400"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Percent className="h-3 w-3" />
            {t("discount.percentage", locale)}
          </button>
          <button
            onClick={() => handleTypeChange("flat")}
            className={`flex items-center gap-1 rounded-r-lg px-3 py-2 text-xs font-medium transition-colors ${
              type === "flat"
                ? "bg-red-600/20 text-red-400"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <DollarSign className="h-3 w-3" />
            {t("discount.flat", locale)}
          </button>
        </div>

        {/* Value input */}
        <div className="relative flex-1">
          <input
            type="number"
            value={value || ""}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder={t("discount.placeholder", locale)}
            min="0"
            max={type === "percentage" ? 100 : undefined}
            step="1"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-red-600/50"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30">
            {type === "percentage" ? "%" : "$"}
          </span>
        </div>
      </div>
    </div>
  );
}
