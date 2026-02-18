import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Footer Component - Site footer with address, links, and contact info
 *
 * Approach: Semantic HTML with clear sections
 * Address and contact values come from central site config.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { href: "/services/web", label: "Web Development" },
      { href: "/services/seo", label: "SEO" },
      { href: "/services/paid-ads", label: "Paid Ads" },
      { href: "/services/social-media", label: "Social Media" },
      { href: "/services/email-marketing", label: "Email Marketing" },
      { href: "/services/ai-development", label: "AI Development" },
      { href: "/services/ai-integration", label: "AI Integration" },
      { href: "/services/video", label: "Video Production" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/process", label: "Process" },
      { href: "/work", label: "Case Studies" },
      { href: "/pricing", label: "Pricing" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
    resources: [
      { href: "/resources", label: "Blog" },
      { href: "/studio", label: "Studio Tour" },
      { href: "https://hvpodcasting.com", label: "HV Podcasting", external: true },
    ],
  };

  return (
    <footer className="border-t border-red-900/40 bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{siteConfig.name}</h3>
            <p className="text-sm text-white/70">
              {siteConfig.tagline}
            </p>
            <div className="space-y-2 text-sm text-white/90">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <address className="not-italic">
                  {siteConfig.contact.streetAddress}
                  <br />
                  {siteConfig.contact.locality}, {siteConfig.contact.region}{" "}
                  {siteConfig.contact.postalCode}
                </address>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-red-400" />
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="transition-colors hover:text-red-300 hover:underline"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-red-400" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-red-300 hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-red-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-red-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 transition-colors hover:text-red-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-red-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


