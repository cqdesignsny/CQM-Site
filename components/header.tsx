"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, BarChart3, Layers, Calculator } from "lucide-react";
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
 * Tools dropdown: Assessment, Proposal Builder, ROI Calculator
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const navLinks = [
    { href: "/how-marketing-works", labelKey: "nav.howMarketingWorks" },
    { href: "/services", labelKey: "nav.services" },
    { href: "/studio", labelKey: "nav.studio" },
    { href: "/about", labelKey: "nav.about" },
  ];

  const toolsLinks = [
    { href: "/assessment", labelKey: "nav.assessment", icon: BarChart3 },
    { href: "/proposals", labelKey: "nav.proposals", icon: Layers },
    { href: "/roi-calculator", labelKey: "nav.roiCalculator", icon: Calculator },
  ];

  const handleNavClick = (label: string) => {
    track("link_click", { link_type: "navigation", destination: label });
    setMobileMenuOpen(false);
    setToolsOpen(false);
    setMobileToolsOpen(false);
  };

  // Close tools dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* Tools Dropdown */}
          <div ref={toolsRef} className="relative">
            <button
              type="button"
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 whitespace-nowrap text-[13px] font-medium text-white/90 transition-colors hover:text-red-300"
            >
              {t("nav.tools")}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 py-1 shadow-2xl">
                {toolsLinks.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => handleNavClick(tool.labelKey)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Icon className="h-4 w-4 text-red-400" />
                      {t(tool.labelKey)}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Blog */}
          <Link
            href="/blog"
            className="whitespace-nowrap text-[13px] font-medium text-white/90 transition-colors hover:text-red-300"
            onClick={() => handleNavClick("nav.blog")}
          >
            {t("nav.blog")}
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="whitespace-nowrap text-[13px] font-medium text-white/90 transition-colors hover:text-red-300"
            onClick={() => handleNavClick("nav.contact")}
          >
            {t("nav.contact")}
          </Link>

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

        {/* Mobile/Tablet: Language Switcher + Hamburger — visible below xl */}
        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher variant="compact" />
          <button
            type="button"
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("common.toggleMenu")}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
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

          {/* Mobile Tools Dropdown */}
          <button
            type="button"
            onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
            className="flex w-full items-center justify-between py-2 text-sm font-medium text-white/90 hover:text-red-300"
          >
            {t("nav.tools")}
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileToolsOpen && (
            <div className="ml-4 space-y-2 border-l border-white/10 pl-4">
              {toolsLinks.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-2 py-1.5 text-sm text-white/70 hover:text-red-300"
                    onClick={() => handleNavClick(tool.labelKey)}
                  >
                    <Icon className="h-4 w-4 text-red-400" />
                    {t(tool.labelKey)}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Blog */}
          <Link
            href="/blog"
            className="block py-2 text-sm font-medium text-white/90 hover:text-red-300"
            onClick={() => handleNavClick("nav.blog")}
          >
            {t("nav.blog")}
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="block py-2 text-sm font-medium text-white/90 hover:text-red-300"
            onClick={() => handleNavClick("nav.contact")}
          >
            {t("nav.contact")}
          </Link>

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
