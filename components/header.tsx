"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";

/**
 * Header Component - Main site navigation
 *
 * Approach: Mobile-first responsive nav with hamburger menu
 * i18n: All labels use the global t() function
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: "/assessment", labelKey: "nav.assessment" },
    { href: "/proposals", labelKey: "nav.proposals" },
    { href: "/services", labelKey: "nav.services" },
    { href: "/studio", labelKey: "nav.studio" },
    { href: "/work", labelKey: "nav.work" },
    { href: "/process", labelKey: "nav.process" },
    { href: "/resources", labelKey: "nav.resources" },
    { href: "/about", labelKey: "nav.about" },
    { href: "/contact", labelKey: "nav.contact" },
  ];

  const handleNavClick = (label: string) => {
    track("link_click", { link_type: "navigation", destination: label });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-900/50 bg-black/95 text-white backdrop-blur supports-[backdrop-filter]:bg-black/85">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => handleNavClick("logo")}
        >
          <Image
            src={siteConfig.assets.logoWhitePath}
            alt={siteConfig.name}
            width={210}
            height={47}
            className="h-8 w-auto sm:h-9 xl:h-10"
            priority
          />
        </Link>

        {/* Desktop Navigation — only show at xl (1280px+) where there's room */}
        <div className="hidden items-center gap-4 xl:flex xl:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[13px] font-medium text-white/90 transition-colors hover:text-red-300"
              onClick={() => handleNavClick(link.labelKey)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <LanguageSwitcher variant="compact" />
          <Link
            href="/contact"
            className="ml-1 whitespace-nowrap rounded-md border border-red-500 bg-red-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-red-500"
            onClick={() => {
              handleNavClick("CTA");
              track("cta_click", { cta_type: "header_cta", location: "header" });
            }}
          >
            {t("nav.cta")}
          </Link>
        </div>

        {/* Mobile/Tablet Menu Button — visible below xl */}
        <button
          type="button"
          className="text-white xl:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile/Tablet Menu */}
      <div
        className={cn(
          "border-t border-red-900/40 bg-black xl:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-white/90 hover:text-red-300"
              onClick={() => handleNavClick(link.labelKey)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="py-2">
            <LanguageSwitcher />
          </div>
          <Link
            href="/contact"
            className="block rounded-md border border-red-500 bg-red-600 px-4 py-2 text-center text-sm font-medium text-white"
            onClick={() => {
              handleNavClick("CTA");
              track("cta_click", { cta_type: "header_cta", location: "mobile_menu" });
            }}
          >
            {t("nav.cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
