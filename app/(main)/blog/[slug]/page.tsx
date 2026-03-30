import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/blog/articles";
import { BlogPostContent } from "./blog-post-content";
import { siteConfig } from "@/lib/site-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = new URL(`/blog/${slug}`, siteConfig.url).toString();

  return {
    title: `${article.title} | CQM Blog`,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleUrl = new URL(`/blog/${slug}`, siteConfig.url).toString();

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    url: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.assets.logoPath}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: article.tags.join(", "),
    wordCount: article.content.split(/\s+/).length,
    articleSection: article.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostContent slug={slug} />
    </>
  );
}
