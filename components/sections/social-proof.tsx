"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { VerticalText } from "@/components/ui/vertical-text";

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

// Duplicate for seamless infinite scroll
const allLogos = [...logos, ...logos];

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <VerticalText text="PROOF" side="left" variant="light" />
      <div className="container relative mx-auto px-4">
        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <Quote className="mx-auto mb-4 h-10 w-10 text-red-500/40" />
          <blockquote className="mb-4 text-xl font-medium italic leading-relaxed sm:text-2xl">
            &quot;It feels like its our company, like we are in it together.&quot;
          </blockquote>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Sarah O&apos;Flaherty</span>
            {" "}/ Founder, SaGrah Beauty
          </div>
        </motion.div>

        {/* Trust logos strip */}
        <div>
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
            {t("socialProof.title")}
          </p>
          <div className="relative w-full overflow-hidden">
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
                    className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-14"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
