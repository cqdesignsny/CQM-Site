"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Hero Section - Main landing section with headline and CTAs
 *
 * Approach: Framer Motion for subtle animations
 * Trade-offs:
 * - Client component for interactivity
 * - Animations respect prefers-reduced-motion via CSS
 * - Could use CSS animations for simpler approach, but Framer Motion is more flexible
 */
export function Hero() {
  const handleCTAClick = (type: "strategy" | "audit") => {
    track("cta_click", {
      cta_type: type === "strategy" ? "strategy_call" : "free_audit",
      location: "hero",
    });
  };

  // Generate random stars with different properties
  const stars = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    delay: Math.random() * 20,
    duration: 8 + Math.random() * 12,
    top: Math.random() * 100,
    size: 4 + Math.random() * 6, // Bigger: 4-10px (was 2-6px)
  }));

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.35),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.2),transparent_35%)]" />
      {/* Animated Red Stars/Lights with Trails */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: '-10px',
              top: `${star.top}%`,
              animation: `slideAcross ${star.duration}s linear ${star.delay}s infinite`,
            }}
          >
            {/* Shooting star trail - longer gradient fade */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: '-100px',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(to right, transparent 0%, rgba(248, 113, 113, 0.1) 20%, rgba(239, 68, 68, 0.65) 60%, rgba(255, 255, 255, 0.85) 90%, rgba(239, 68, 68, 0.35) 100%)',
                filter: 'blur(1px)',
              }}
            />
            {/* Star */}
            <div
              className="relative rounded-full bg-red-400 opacity-70 blur-[1px]"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Animated Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-200">
              <Sparkles className="h-4 w-4" />
              AI-Forward Growth Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            AI-Powered Creativity
            <br />
            <span className="text-red-400">Meets Results</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg text-white/80 sm:text-xl"
          >
            Digital marketing is everything now.
            <br />
            We are an AI-forward agency helping businesses grow with web
            development, SEO, paid ads, social media, and content production.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              asChild
              onClick={() => handleCTAClick("strategy")}
            >
              <Link href="/contact">
                Book a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
              onClick={() => handleCTAClick("audit")}
            >
              <Link href="/contact?type=audit">Get a Free Audit</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


