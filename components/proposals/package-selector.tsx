"use client";

import { useState } from "react";
import { PACKAGES } from "@/lib/proposals/services-data";
import { t } from "@/lib/proposals/translations";
import { formatCurrency } from "@/lib/proposals/calculations";
import type { Locale } from "@/lib/proposals/types";
import { Check, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  activePackage: string | null;
  locale: Locale;
  onSelect: (packageId: string | null) => void;
}

export function PackageSelector({ activePackage, locale, onSelect }: Props) {
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(new Set());

  const toggleExpanded = (pkgId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPackages((prev) => {
      const next = new Set(prev);
      if (next.has(pkgId)) {
        next.delete(pkgId);
      } else {
        next.add(pkgId);
      }
      return next;
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white">
        {t("section.packages", locale)}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Custom Build Option */}
        <button
          onClick={() => onSelect(null)}
          className={`group relative rounded-xl border p-5 text-left transition-all ${
            !activePackage
              ? "border-red-600 bg-red-600/10 ring-1 ring-red-600/50"
              : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <Sparkles className="h-5 w-5 text-red-400" />
          </div>
          <h3 className="font-semibold text-white">
            {t("package.custom", locale)}
          </h3>
          <p className="mt-1 text-xs text-white/50">
            {t("package.customDesc", locale)}
          </p>
        </button>

        {/* Pre-built packages */}
        {PACKAGES.map((pkg) => {
          const isActive = activePackage === pkg.id;
          const name = locale === "es" ? pkg.name_es : locale === "fr" ? pkg.name_fr : pkg.name;
          const tagline = locale === "es" ? pkg.tagline_es : locale === "fr" ? pkg.tagline_fr : pkg.tagline;
          const features = locale === "es" ? pkg.features_es : locale === "fr" ? pkg.features_fr : pkg.features;
          const isExpanded = expandedPackages.has(pkg.id);
          const extraCount = features.length - 3;

          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg.id)}
              className={`group relative rounded-xl border p-5 text-left transition-all ${
                isActive
                  ? "border-red-600 bg-red-600/10 ring-1 ring-red-600/50"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  {t("package.popular", locale)}
                </span>
              )}
              <div className="mb-1 text-2xl font-bold text-white">
                {formatCurrency(pkg.price, locale)}
                <span className="text-sm font-normal text-white/40">/mo</span>
              </div>
              <h3 className="font-semibold text-white">{name}</h3>
              <p className="mt-1 text-xs text-white/50">{tagline}</p>
              <ul className="mt-3 space-y-1">
                {features.slice(0, isExpanded ? features.length : 3).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-1.5 text-xs text-white/60"
                  >
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                    {f}
                  </li>
                ))}
                {extraCount > 0 && (
                  <li>
                    <span
                      role="button"
                      onClick={(e) => toggleExpanded(pkg.id, e)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-red-400 transition-colors hover:text-red-300"
                    >
                      {isExpanded ? (
                        <>
                          {locale === "es" ? "Ver menos" : locale === "fr" ? "Voir moins" : "Show less"}
                          <ChevronUp className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          +{extraCount} {locale === "es" ? "más" : locale === "fr" ? "de plus" : "more"}
                          <ChevronDown className="h-3 w-3" />
                        </>
                      )}
                    </span>
                  </li>
                )}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
