"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

/**
 * Header Component - Main site navigation
 *
 * Approach: Mobile-first responsive nav with hamburger menu
 * Trade-offs:
 * - Client component for interactivity (menu toggle)
 * - Could use headless UI for accessibility, but keeping simple for now
 * - Logo could be SVG component for better performance
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/studio", label: "Studio" },
    { href: "/work", label: "Work" },
    { href: "/process", label: "Process" },
    { href: "/pricing", label: "Pricing" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
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
          className="flex items-center"
          onClick={() => handleNavClick("logo")}
        >
          <Image
            src={siteConfig.assets.logoWhitePath}
            alt={siteConfig.name}
            width={210}
            height={47}
            className="h-10 w-auto sm:h-11"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-red-300"
              onClick={() => handleNavClick(link.label)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md border border-red-500 bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
            onClick={() => {
              handleNavClick("CTA");
              track("cta_click", { cta_type: "header_cta", location: "header" });
            }}
          >
            Book a Strategy Call
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-white md:hidden"
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "border-t border-red-900/40 bg-black md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-white/90 hover:text-red-300"
              onClick={() => handleNavClick(link.label)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block rounded-md border border-red-500 bg-red-600 px-4 py-2 text-center text-sm font-medium text-white"
            onClick={() => {
              handleNavClick("CTA");
              track("cta_click", { cta_type: "header_cta", location: "mobile_menu" });
            }}
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </header>
  );
}

