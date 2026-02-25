"use client";

import type { ServiceItem, Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import { formatCurrency } from "@/lib/proposals/calculations";
import { Check, Minus, Plus } from "lucide-react";

interface Props {
  service: ServiceItem;
  locale: Locale;
  selected: boolean;
  quantity: number;
  onToggle: () => void;
  onQuantityChange: (quantity: number) => void;
}

export function ServiceCard({
  service,
  locale,
  selected,
  quantity,
  onToggle,
  onQuantityChange,
}: Props) {
  const name = locale === "es" ? service.name_es : locale === "fr" ? service.name_fr : service.name;
  const description = locale === "es" ? service.description_es : locale === "fr" ? service.description_fr : service.description;
  const billingLabel = t(`billing.${service.billing}`, locale);
  const priceDisplay = service.priceMax
    ? `${formatCurrency(service.price)} - ${formatCurrency(service.priceMax)}`
    : formatCurrency(service.price);

  return (
    <div
      onClick={onToggle}
      className={`group cursor-pointer rounded-xl border p-4 transition-all ${
        selected
          ? "border-red-600/50 bg-red-600/5 ring-1 ring-red-600/30"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                selected
                  ? "border-red-600 bg-red-600"
                  : "border-white/20 bg-transparent"
              }`}
            >
              {selected && <Check className="h-3 w-3 text-white" />}
            </div>
            <h3 className="truncate text-sm font-medium text-white">{name}</h3>
          </div>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50">
            {description}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-bold text-white">{priceDisplay}</div>
          <div className="text-[10px] text-white/40">{billingLabel}</div>
        </div>
      </div>

      {/* Quantity controls */}
      {selected && service.quantifiable && (
        <div
          className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs text-white/50">
            {locale === "es" ? service.unit_es || "Qty" : locale === "fr" ? service.unit_fr || "Qté" : service.unit || "Qty"}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-white/20 hover:text-white disabled:opacity-30"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-white">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-white/20 hover:text-white"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="ml-auto text-sm font-semibold text-red-400">
            {formatCurrency(service.price * quantity)}
          </span>
        </div>
      )}

      {/* Hosting note */}
      {service.note && selected && (
        <p className="mt-2 text-[10px] text-amber-400/70">
          {locale === "es" ? service.note_es : locale === "fr" ? service.note_fr : service.note}
        </p>
      )}
    </div>
  );
}
