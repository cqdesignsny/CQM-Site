"use client";

import { useLanguage } from "./context";
import { t as proposalT } from "@/lib/proposals/translations";
import type { Locale } from "@/lib/proposals/types";

/**
 * Bridge hook: reads locale from the site-wide LanguageProvider context
 * and provides a `pt()` (proposal-translate) function using the proposal
 * translations file. Used by proposal-builder, assessment, and their children.
 */
export function useProposalLocale() {
  const { locale } = useLanguage();

  const proposalLocale = locale as Locale;

  const pt = (key: string): string => proposalT(key, proposalLocale);

  return { locale: proposalLocale, pt };
}
