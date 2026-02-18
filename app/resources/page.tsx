import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckSquare,
  ExternalLink,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources | Creative Quality Marketing",
  description:
    "Marketing guides, checklists, and AI-first frameworks to help your business grow.",
  path: "/resources",
  keywords: ["marketing resources", "AI marketing guides", "affiliate marketing tools"],
});

/**
 * Resources Page - Blog, guides, checklists
 * TODO: Set up MDX/CMS integration for blog posts
 */
export default function ResourcesPage() {
  const featuredResources = [
    {
      type: "Guide",
      icon: FileText,
      title: "AI Marketing Stack for Growing Businesses",
      summary:
        "A practical breakdown of tools and workflows we use for strategy, content, and reporting.",
      href: "#affiliate-tools",
    },
    {
      type: "Checklist",
      icon: CheckSquare,
      title: "Local SEO Optimization Checklist",
      summary:
        "A no-fluff checklist for improving local visibility, listings, and conversion-ready pages.",
      href: "#affiliate-tools",
    },
    {
      type: "Playbook",
      icon: Lightbulb,
      title: "Content Planning Framework for Small Teams",
      summary:
        "How to plan and repurpose one month of content without burning out your team.",
      href: "#affiliate-tools",
    },
  ];

  const learningTracks = [
    "Websites & funnels that convert",
    "SEO and search visibility strategy",
    "Paid ads creative and optimization",
    "Social and short-form content systems",
    "Email nurture and retention workflows",
    "AI automation for marketing operations",
  ];

  const affiliateTools = [
    {
      name: "TubeBuddy",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/TubeBuddy.png",
      href: "https://www.tubebuddy.com/cqdesigns",
    },
    {
      name: "Ecwid",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Ecwid.png",
      href: "https://www.tubebuddy.com/cqdesigns",
    },
    {
      name: "Hostinger",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Hostinger.png",
      href: "https://www.hostg.xyz/aff_c?offer_id=6&aff_id=48099",
    },
    {
      name: "Groove Funnels",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Groove-Funnels.png",
      href: "",
    },
    {
      name: "Printful",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Printful.png",
      href: "https://www.printful.com/a/cqdesigns",
    },
    {
      name: "SEMRUSH",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/SEMRUSH.png",
      href: "https://www.semrush.com/sem/?ref=6750215091&refer_source=&utm_source=berush&utm_medium=promo&utm_campaign=link_7-day_pro_trial",
    },
    {
      name: "Siteground",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Siteground.png",
      href: "https://www.siteground.com/index.htm?afcode=32d8fc9b4e32d0b246c970b52790fc64",
    },
    {
      name: "VidIQ",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/VidIQ.png",
      href: "https://vidiq.com/#_l_3bp",
    },
    {
      name: "Perspective",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2026/01/file_JzY0xFU8RmIeOy.png",
      href: "https://try.perspective.co/6evaojo91zuu",
    },
    {
      name: "Instapage",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Instapage.png",
      href: "https://instapage.grsm.io/creative-quality-marketing",
    },
    {
      name: "Elegant Themes",
      logo: "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Elegant-Themes2.png",
      href: "https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=41841",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          Resources
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Practical Resources for Smarter Marketing
        </h1>
        <p className="mb-12 max-w-3xl text-lg text-muted-foreground">
          We build content that helps business owners and marketing teams make
          better decisions faster, with a strong focus on practical AI adoption.
        </p>

        <section className="mb-14 grid gap-5 md:grid-cols-3">
          {featuredResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link
                key={resource.title}
                href={resource.href}
                className="group rounded-xl border bg-white/90 p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {resource.type}
                  </span>
                </div>
                <h2 className="mb-2 text-lg font-semibold">{resource.title}</h2>
                <p className="text-sm text-muted-foreground">{resource.summary}</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </section>

        <section className="mb-14 rounded-xl border bg-muted/30 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Learning Tracks</h2>
          </div>
          <p className="mb-5 text-muted-foreground">
            These are the core topics we teach and implement for clients.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {learningTracks.map((track) => (
              <div key={track} className="rounded-md border bg-background p-3 text-sm">
                {track}
              </div>
            ))}
          </div>
        </section>

        <section id="affiliate-tools" className="mb-14">
          <div className="mb-4 flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Recommended Tools & Affiliate Links</h2>
          </div>
          <p className="mb-6 text-muted-foreground">
            These are tools we actively use and recommend. Some are affiliate
            links from our live site.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {affiliateTools.map((tool) => (
              <article
                key={tool.name}
                className="group rounded-xl border bg-white/95 p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-center">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={260}
                    height={160}
                    className="h-28 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-3 text-sm font-semibold">{tool.name}</h3>
                {tool.href ? (
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Shop Now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">Link coming soon</span>
                )}
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Affiliate disclosure: We may earn a commission from selected links at
            no additional cost to you.
          </p>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">
            Need Help Applying This to Your Business?
          </h2>
          <p className="mb-6 text-muted-foreground">
            We can turn these ideas into a focused action plan built around your
            goals, budget, and team capacity.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                Book a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">See Services</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
