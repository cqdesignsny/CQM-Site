"use client";

import { CATEGORIES, getServicesByCategory } from "@/lib/proposals/services-data";
import type { Locale, SelectedService } from "@/lib/proposals/types";

interface Props {
  activeCategory: string;
  locale: Locale;
  selectedServices: Map<string, SelectedService>;
  onSelect: (category: string) => void;
}

export function CategoryTabs({
  activeCategory,
  locale,
  selectedServices,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 pb-2">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        const services = getServicesByCategory(cat.id);
        const selectedCount = services.filter((s) =>
          selectedServices.has(s.id)
        ).length;
        const name = locale === "es" ? cat.name_es : locale === "fr" ? cat.name_fr : cat.name;

        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-all ${
              isActive
                ? "border-red-600/50 bg-red-600/10 text-white"
                : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{name}</span>
            {selectedCount > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {selectedCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
