"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/**
 * Case Studies Section - Featured work snapshots
 */
export function CaseStudies() {
  const caseStudies = [
    {
      slug: "advanced-skin-medspa",
      title: "Advanced Skin Medspa",
      industry: "Health & Wellness",
      description:
        "Aligned website updates, local SEO, and social content to support stronger lead flow.",
      highlights: ["Local visibility", "Conversion-focused pages", "Content consistency"],
      logo: "/images/asm.webp",
    },
    {
      slug: "sagrah-beauty",
      title: "SaGrah Beauty",
      industry: "Beauty & E-commerce",
      description:
        "Built a cleaner content and campaign system to support product launches and brand growth.",
      highlights: ["Campaign planning", "Email support", "Creative production"],
      logo: "/images/sagrah-beauty.webp",
    },
    {
      slug: "urban-flooring",
      title: "Urban Flooring",
      industry: "Home Services",
      description:
        "Combined SEO and paid search support to capture high-intent local traffic and inquiries.",
      highlights: ["Search visibility", "Lead quality", "Landing page optimization"],
      logo: "/images/urban-flooring.webp",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.2),transparent_40%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Client Spotlight
          </h2>
          <p className="text-lg text-white/70">
            Strategic execution powered by AI-assisted workflows and human creative direction.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Link
                href="/work"
                className="group block h-full min-h-[430px] overflow-hidden rounded-xl border border-white/20 bg-white p-8 text-black transition-all hover:-translate-y-1 hover:shadow-2xl"
                onClick={() =>
                  track("link_click", {
                    link_type: "case_study",
                    destination: study.slug,
                  })
                }
              >
                <div className="mb-5">
                  <Image
                    src={study.logo}
                    alt={study.title}
                    width={220}
                    height={100}
                    className="h-16 w-auto object-contain md:h-20"
                  />
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600">
                  {study.industry}
                </p>
                <h3 className="mb-2 text-2xl font-semibold">{study.title}</h3>
                <p className="mb-5 text-sm text-black/75">{study.description}</p>

                <div className="mb-6 space-y-2">
                  {study.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <span className="inline-flex items-center text-sm font-medium text-red-600 group-hover:underline">
                  View client work
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/work">
              Explore More Work
              <Bot className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
