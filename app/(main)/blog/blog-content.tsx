"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { getAllArticles } from "@/lib/blog/articles";
import { BlogCategory } from "@/lib/blog/types";
import { CTABanner } from "@/components/sections/cta-banner";

const categories: BlogCategory[] = [
  "AI & Automation",
  "Marketing Strategy",
  "SEO & Search",
  "Social Media",
  "Web & Design",
  "Business Growth",
];

const categoryTranslationKeys: Record<BlogCategory, string> = {
  "AI & Automation": "blog.category.aiAutomation",
  "Marketing Strategy": "blog.category.marketingStrategy",
  "SEO & Search": "blog.category.seoSearch",
  "Social Media": "blog.category.socialMedia",
  "Web & Design": "blog.category.webDesign",
  "Business Growth": "blog.category.businessGrowth",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogContent() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");
  const allArticles = getAllArticles();

  const filteredArticles =
    activeCategory === "all"
      ? allArticles
      : allArticles.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-20 text-white md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.3),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.15),transparent_40%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-200"
          >
            <Sparkles className="h-4 w-4" />
            {t("blog.badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {t("blog.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-white/70"
          >
            {t("blog.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Category Filters + Articles */}
      <section className="bg-zinc-950 py-16 md:py-20">
        <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                  : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              {t("blog.allCategories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  track("button_click", { button: `blog_filter_${cat}` });
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                {t(categoryTranslationKeys[cat])}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/blog/${article.slug}`} className="group block h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-red-600/5">
                    {/* Featured Image */}
                    {article.image && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Shine sweep effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {/* Glow effect on hover */}
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-600/0 blur-3xl transition-all duration-500 group-hover:bg-red-600/10" />

                    <div className="relative flex flex-1 flex-col p-4">
                      <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-white/50 transition-colors group-hover:border-red-500/30 group-hover:text-red-300">
                        <Tag className="h-2.5 w-2.5" />
                        {t(categoryTranslationKeys[article.category])}
                      </span>

                      <h3 className="mb-2 text-sm font-bold leading-snug text-white transition-colors group-hover:text-red-300">
                        {article.title}
                      </h3>

                      <p className="mb-3 flex-1 text-xs leading-relaxed text-white/50 line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-xs text-white/30">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(article.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readTimeMinutes} {t("blog.readTime")}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-red-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filteredArticles.length === 0 && (
            <div className="py-20 text-center text-white/40">
              <p className="text-lg">No articles in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
