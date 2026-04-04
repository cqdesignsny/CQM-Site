"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { track } from "@/lib/analytics";
import { getAllArticles } from "@/lib/blog/articles";
import { VerticalText } from "@/components/ui/vertical-text";

/**
 * BlogPromo — Homepage section showing 3 latest blog posts.
 * White/light section for visual contrast in the page flow.
 */
export function BlogPromo() {
  const { t } = useLanguage();
  const latestPosts = getAllArticles().slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 md:py-28">
      <VerticalText text="LEARN" side="right" />
      {/* Subtle top border glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70">
            <BookOpen className="h-4 w-4" />
            {t("home.blog.badge")}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {t("home.blog.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50 leading-relaxed">
            {t("home.blog.desc")}
          </p>
        </motion.div>

        {/* Article cards */}
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                onClick={() => track("link_click", { link_type: "blog_promo", destination: post.slug })}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-red-500/5"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-red-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-base font-bold text-white leading-snug group-hover:text-red-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-white/50 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/30">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTimeMinutes} {t("home.blog.readTime")}</span>
                    </div>
                    <span className="flex items-center gap-1 font-medium text-red-400 transition-colors group-hover:text-red-300">
                      Read
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/blog"
            onClick={() => track("cta_click", { cta_type: "blog_promo_cta", location: "homepage" })}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
          >
            {t("home.blog.cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
