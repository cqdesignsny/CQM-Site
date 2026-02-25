export type SiteLocale = "en" | "es" | "fr";

export const SUPPORTED_LOCALES: SiteLocale[] = ["en", "es", "fr"];

export const LOCALE_LABELS: Record<SiteLocale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

export const LOCALE_FLAGS: Record<SiteLocale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
};

export const DEFAULT_LOCALE: SiteLocale = "en";
