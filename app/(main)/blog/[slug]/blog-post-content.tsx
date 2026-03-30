"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, User, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { getArticleBySlug, getRelatedArticles } from "@/lib/blog/articles";
import { BlogCategory } from "@/lib/blog/types";
import { CTABanner } from "@/components/sections/cta-banner";

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
    month: "long",
    day: "numeric",
  });
}

/** Minimal Markdown to HTML (handles ##, **, *, -, numbered lists, newlines) */
function renderMarkdown(md: string): string {
  return md
    .trim()
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("## "))
        return `<h2 class="mt-10 mb-4 text-2xl font-bold text-white">${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("### "))
        return `<h3 class="mt-8 mb-3 text-xl font-semibold text-white">${trimmed.slice(4)}</h3>`;
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const content = trimmed.slice(2);
        return `<li class="ml-4 list-disc text-white/70">${inlineFormat(content)}</li>`;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s/, "");
        return `<li class="ml-4 list-decimal text-white/70">${inlineFormat(content)}</li>`;
      }
      return `<p class="mb-4 text-white/70 leading-relaxed">${inlineFormat(trimmed)}</p>`;
    })
    .join("\n");
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/&apos;/g, "\u2019");
}

interface Props {
  slug: string;
}

export function BlogPostContent({ slug }: Props) {
  const { t } = useLanguage();
  const article = getArticleBySlug(slug);

  if (!article) return null;

  const related = getRelatedArticles(article, 3);
  const contentHtml = renderMarkdown(article.content);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-16 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.25),transparent_50%)]" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-red-300"
              onClick={() => track("link_click", { link: "blog_back" })}
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")} to {t("blog.title")}
            </Link>

            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-600/20 px-3 py-1 text-xs font-semibold text-red-300">
              <Tag className="h-3 w-3" />
              {t(categoryTranslationKeys[article.category])}
            </span>

            <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTimeMinutes} {t("blog.readTime")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-zinc-950 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-zinc-950 to-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            {t("blog.cta.title")}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/60">
            {t("blog.cta.subtitle")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/assessment"
              onClick={() => track("cta_click", { cta_type: "blog_post_assessment" })}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              {t("cta.takeAssessment")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/how-marketing-works"
              onClick={() => track("link_click", { link: "blog_post_hmw" })}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See How Marketing Works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="border-t border-white/5 bg-black py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-2xl font-bold text-white">
              {t("blog.relatedArticles")}
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.06]"
                >
                  <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50">
                    <Tag className="h-3 w-3" />
                    {t(categoryTranslationKeys[rel.category])}
                  </span>
                  <h3 className="mb-2 text-base font-bold text-white transition-colors group-hover:text-red-300">
                    {rel.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-white/50">
                    {rel.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-red-400 transition-colors group-hover:text-red-300">
                    {t("blog.readMore")}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
