"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { SiteLocale } from "./types";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./types";

interface LanguageContextType {
  locale: SiteLocale;
  setLocale: (locale: SiteLocale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "cqm-locale";

function getInitialLocale(): SiteLocale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  // Check localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as SiteLocale)) {
    return stored as SiteLocale;
  }

  // Check browser language
  const browserLang = navigator.language.split("-")[0];
  if (SUPPORTED_LOCALES.includes(browserLang as SiteLocale)) {
    return browserLang as SiteLocale;
  }

  return DEFAULT_LOCALE;
}

export function LanguageProvider({
  children,
  translations,
}: {
  children: React.ReactNode;
  translations: Record<string, Record<SiteLocale, string>>;
}) {
  const [locale, setLocaleState] = useState<SiteLocale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: SiteLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) {
        console.warn(`[i18n] Missing translation key: "${key}"`);
        return key;
      }
      return entry[locale] || entry.en || key;
    },
    [locale, translations]
  );

  // Prevent hydration mismatch — render English on server, then switch
  const contextLocale = mounted ? locale : DEFAULT_LOCALE;

  return (
    <LanguageContext.Provider
      value={{
        locale: contextLocale,
        setLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
