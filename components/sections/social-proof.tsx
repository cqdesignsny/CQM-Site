"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { VerticalText } from "@/components/ui/vertical-text";
import { useRef, useState, useCallback, useEffect } from "react";

// scale: CSS scale factor (1 = default, 1.5 = 50% bigger, 0.7 = 30% smaller)
const logos: { name: string; logo: string; invert?: boolean; scale?: number }[] = [
  { name: "Advanced Skin Medspa", logo: "/images/clients/ASM-Logo.webp", scale: 1.8 },
  { name: "51 Cattle", logo: "/images/clients/51-cattle-blk.svg" },
  { name: "Aseproc", logo: "/images/clients/Aseproc-Logo.webp" },
  { name: "Athens Strength Club", logo: "/images/clients/ATH_STR_CLB-Logo.avif" },
  { name: "Elco", logo: "/images/clients/Elco-logo-Modern.png.webp" },
  { name: "Empire", logo: "/images/clients/Empire-Logo.webp", scale: 2.3 },
  { name: "Fearless", logo: "/images/clients/Fearless.png", scale: 0.7 },
  { name: "Halls Boat", logo: "/images/clients/Halls-Boat.webp" },
  { name: "Hello Kind Soul", logo: "/images/clients/Hello-Kind-Soul-Alt2-1.avif" },
  { name: "Hudson Valley Outreach Foundation", logo: "/images/clients/HVOF-2025-logo.svg" },
  { name: "Hudson Valley Podcasting", logo: "/images/clients/HVP-Logo-1.webp" },
  { name: "La Bodega", logo: "/images/clients/La-Bodega-Logo.webp" },
  { name: "Level Aesthetics", logo: "/images/clients/Level-Logo.webp", scale: 1.5 },
  { name: "Mark Viera", logo: "/images/clients/Mark-Viera-Logo.webp" },
  { name: "Marlon", logo: "/images/clients/Marlon-Logo.webp", scale: 1.5, invert: true },
  { name: "Perfect Foods", logo: "/images/clients/Perfect-foods.png" },
  { name: "Rising Lotus", logo: "/images/clients/Risong-Lotus-Logo.webp" },
  { name: "SaGrah Beauty", logo: "/images/clients/Sagrah-Beauty.webp" },
  { name: "Salty Boats", logo: "/images/clients/salty-boats-logo-white.svg", invert: true },
  { name: "Supreme", logo: "/images/clients/Supreme_logo_col-03.svg" },
  { name: "TZ Media", logo: "/images/clients/tz-logo-main.svg" },
  { name: "Urban Flooring Solutions", logo: "/images/clients/UFS_whitelogo_long.svg", invert: true },
  { name: "Wells O", logo: "/images/clients/wells-o-blk.svg" },
  { name: "Wrecktified", logo: "/images/clients/Wrecktified-Logo.webp", scale: 2.0 },
  { name: "Newburgh Seal", logo: "/images/clients/logo-seal-wht.webp", invert: true },
  { name: "Download", logo: "/images/clients/download.png" },
];

// Duplicate for seamless infinite scroll
const allLogos = [...logos, ...logos];

export function SocialProof() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Drag to scroll (mouse)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Resume animation after a brief pause
    setTimeout(() => setIsPaused(false), 2000);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // Touch to scroll
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsPaused(true);
    setStartX(e.touches[0].pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const x = e.touches[0].pageX - (trackRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  }, [startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsPaused(false), 2000);
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    if (isPaused || !trackRef.current) return;

    let animationId: number;
    let lastTime = 0;
    const speed = 0.5; // pixels per frame

    const scroll = (time: number) => {
      if (!trackRef.current) return;
      if (lastTime) {
        const delta = time - lastTime;
        trackRef.current.scrollLeft += speed * (delta / 16);

        // Reset to start when we've scrolled through the first set
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (trackRef.current.scrollLeft >= halfWidth) {
          trackRef.current.scrollLeft = 0;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <VerticalText text="PROOF" side="left" variant="light" />
      <div className="container relative mx-auto px-4">
        {/* Featured testimonials */}
        <div className="mx-auto mb-16 grid max-w-4xl gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Quote className="mx-auto mb-4 h-8 w-8 text-red-500/40" />
            <blockquote className="mb-4 text-lg font-medium italic leading-relaxed sm:text-xl">
              &quot;I&apos;m honestly really proud of the marketing team you guys are continuing to grow into. Even just calling you guys a &quot;marketing team&quot; doesn&apos;t do what you guys are doing justice. You are covering so much more and helping us grow into ways I know for fact other companies wouldn&apos;t be. I just want to say thank you truly.&quot;
            </blockquote>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Tyler Zitz</span>
              {" "}/ Owner, TZ Electric
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <Quote className="mx-auto mb-4 h-8 w-8 text-red-500/40" />
            <blockquote className="mb-4 text-lg font-medium italic leading-relaxed sm:text-xl">
              &quot;It feels like its our company, like we are in it together.&quot;
            </blockquote>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Sarah O&apos;Flaherty</span>
              {" "}/ Founder, SaGrah Beauty
            </div>
          </motion.div>
        </div>

        {/* Trust logos strip */}
        <div>
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
            {t("socialProof.title")}
          </p>
          <div className="relative w-full overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
            {/* Scrollable + auto-scrolling track */}
            <div
              ref={trackRef}
              className="flex cursor-grab overflow-x-hidden active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {allLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex flex-shrink-0 items-center justify-center px-6 md:px-10"
                >
                  <Image
                    src={logo.logo}
                    alt={logo.name}
                    width={260}
                    height={104}
                    className={`h-12 w-auto select-none object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0 sm:h-14 md:h-[4.5rem] ${logo.invert ? "invert" : ""}`}
                    style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                    draggable={false}
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
