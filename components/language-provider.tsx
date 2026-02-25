"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import { siteTranslations } from "@/lib/i18n/site-translations";

export function LanguageProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider translations={siteTranslations}>
      {children}
    </LanguageProvider>
  );
}
