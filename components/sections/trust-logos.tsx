"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Trust Logos Section — full-width infinite auto-scrolling logo slider.
 * Logos are transparent PNGs with no backdrop.
 */
export function TrustLogos() {
  const { t } = useLanguage();

  const logos = [
    { name: "Advanced Skin Medspa", logo: "/images/asm.webp" },
    { name: "Elco", logo: "/images/elco.webp" },
    { name: "HKS", logo: "/images/hks.webp" },
    { name: "HVP", logo: "/images/hvp.webp" },
    { name: "Mark Viera", logo: "/images/markviera.webp" },
    { name: "Marlon", logo: "/images/Marlon.webp" },
    { name: "Sagrah Beauty", logo: "/images/sagrah-beauty.webp" },
    { name: "Sagrah Luxe", logo: "/images/sagrah-luxe.webp" },
    { name: "Urban Flooring", logo: "/images/urban-flooring.webp" },
    { name: "Wrecktified", logo: "/images/wrecktified.webp" },
  ];

  // Duplicate logos for seamless infinite scroll
  const allLogos = [...logos, ...logos];

  return (
    <section className="overflow-hidden border-y bg-muted/30 py-10">
      <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
        {t("trust.title")}
      </p>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling track */}
        <div className="flex w-max animate-logo-scroll">
          {allLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex flex-shrink-0 items-center justify-center px-8 md:px-12"
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                width={200}
                height={80}
                className="h-12 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
