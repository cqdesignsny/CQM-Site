"use client";

import { useState } from "react";
import type { CustomLineItem, BillingType, Locale } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import { formatCurrency } from "@/lib/proposals/calculations";
import { Plus, X } from "lucide-react";

interface Props {
  items: CustomLineItem[];
  locale: Locale;
  onAdd: (item: { name: string; price: number; billing: BillingType }) => void;
  onRemove: (id: string) => void;
}

export function CustomItemsEditor({ items, locale, onAdd, onRemove }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billing, setBilling] = useState<BillingType>("one-time");
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    const parsed = parseFloat(price);
    if (!name.trim() || isNaN(parsed) || parsed <= 0) return;

    onAdd({ name: name.trim(), price: parsed, billing });
    setName("");
    setPrice("");
    setBilling("one-time");
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-sm font-semibold text-white">
          {t("custom.title", locale)}
        </h3>
        <Plus
          className={`h-4 w-4 text-white/40 transition-transform ${isOpen ? "rotate-45" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          {/* Input row */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("custom.namePlaceholder", locale)}
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-red-600/50"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t("custom.pricePlaceholder", locale)}
              min="0"
              step="1"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-red-600/50 sm:w-28"
            />
            <div className="flex gap-1">
              <button
                onClick={() => setBilling("one-time")}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  billing === "one-time"
                    ? "bg-red-600/20 text-red-400"
                    : "bg-white/5 text-white/40 hover:text-white/60"
                }`}
              >
                {t("billing.one-time", locale)}
              </button>
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  billing === "monthly"
                    ? "bg-red-600/20 text-red-400"
                    : "bg-white/5 text-white/40 hover:text-white/60"
                }`}
              >
                {t("billing.monthly", locale)}
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!name.trim() || !price || parseFloat(price) <= 0}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-30 disabled:hover:bg-red-600"
            >
              <Plus className="h-3.5 w-3.5" />
              {t("btn.addCustom", locale)}
            </button>
          </div>

          {/* Item list */}
          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-sm text-white">{item.name}</span>
                    <span className="ml-2 text-xs text-white/40">
                      {t(`billing.${item.billing}`, locale)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {formatCurrency(item.price)}
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-red-600/20 hover:text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
