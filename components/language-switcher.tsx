"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { SUPPORTED_LOCALES, LOCALE_LABELS, LOCALE_FLAGS } from "@/lib/i18n/types";
import type { SiteLocale } from "@/lib/i18n/types";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ variant = "default" }: { variant?: "default" | "compact" }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5" />
        {variant === "compact" ? (
          <span className="text-xs font-medium uppercase">{locale}</span>
        ) : (
          <span className="text-xs">{LOCALE_FLAGS[locale]} {locale.toUpperCase()}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-xl">
          {SUPPORTED_LOCALES.map((loc: SiteLocale) => (
            <button
              key={loc}
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                locale === loc
                  ? "bg-red-600/10 text-red-400"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{LOCALE_FLAGS[loc]}</span>
              <span>{LOCALE_LABELS[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
