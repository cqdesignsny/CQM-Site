import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  Globe,
  Mail,
  Search,
  Share2,
  TrendingUp,
  Video,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Services | Creative Quality Marketing",
  description:
    "AI-powered digital marketing services including websites, SEO, paid ads, social media, email, video, and AI integration.",
  path: "/services",
  keywords: ["digital marketing services", "AI marketing services", "agency services"],
});

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description:
        "Custom websites built for performance, conversion, and user experience.",
      href: "/services/web",
      features: ["Custom Design", "Responsive Development", "CMS Integration"],
    },
    {
      icon: Search,
      title: "SEO",
      description:
        "Improve your search rankings and drive organic traffic to your website.",
      href: "/services/seo",
      features: ["Keyword Research", "Technical SEO", "Content Strategy"],
    },
    {
      icon: TrendingUp,
      title: "Paid Ads",
      description:
        "Data-driven advertising campaigns on Google, Meta, LinkedIn, and more.",
      href: "/services/paid-ads",
      features: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
    },
    {
      icon: Share2,
      title: "Social Media Management",
      description:
        "Engage your audience and grow your brand across all social platforms.",
      href: "/services/social-media",
      features: ["Content Creation", "Community Management", "Analytics"],
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description:
        "Nurture leads and retain customers with targeted email campaigns.",
      href: "/services/email-marketing",
      features: ["Automation", "Segmentation", "A/B Testing"],
    },
    {
      icon: Bot,
      title: "AI Development & Automation",
      description:
        "Build practical AI workflows and automations that save time and improve output quality.",
      href: "/services/ai-development",
      features: ["Workflow Automation", "Prompt Systems", "AI Tooling"],
    },
    {
      icon: Workflow,
      title: "Agent & AI Integration",
      description:
        "Integrate AI agents into existing sales, marketing, and client service processes.",
      href: "/services/ai-integration",
      features: ["Agent Setup", "System Integration", "Team Enablement"],
    },
    {
      icon: Video,
      title: "Video Production",
      description:
        "Professional video content that tells your brand's story effectively.",
      href: "/services/video",
      features: ["Scripting", "Filming", "Editing"],
    },
  ];

  const servicesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Creative Quality Marketing Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteConfig.url}${service.href}`,
    })),
  };

  const additionalCapabilities = [
    "Marketing consulting and strategy intensives",
    "Website and funnel builds",
    "E-commerce growth support",
    "Print and brand collateral design",
    "Podcast studio production and distribution",
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListSchema) }}
      />
      <section className="mb-12 rounded-2xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-red-950 px-6 py-10 text-white md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
            Services
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="text-lg text-white/75">
            End-to-end digital marketing powered by AI workflows and hands-on
            execution from a real team.
          </p>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.href}
              className="group rounded-xl border bg-white/95 p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <Link href={service.href} className="block">
                <Icon className="mb-4 h-10 w-10 text-primary" />
                <h2 className="mb-2 text-2xl font-semibold">{service.title}</h2>
                <p className="mb-4 text-muted-foreground">{service.description}</p>
                <ul className="mb-6 space-y-2 text-sm">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </article>
          );
        })}
      </div>

      <section className="mt-14 rounded-xl border bg-muted/30 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">AI + Human Execution Model</h2>
        </div>
        <p className="mb-5 text-muted-foreground">
          We use AI to accelerate research, planning, and optimization while
          keeping strategy and creative quality human-led.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border bg-background p-3 text-sm">
            Faster campaign planning and research cycles
          </div>
          <div className="rounded-md border bg-background p-3 text-sm">
            Better reporting with clearer monthly priorities
          </div>
          <div className="rounded-md border bg-background p-3 text-sm">
            More efficient content ideation and production
          </div>
          <div className="rounded-md border bg-background p-3 text-sm">
            Continuous optimization with real human oversight
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-xl border p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-semibold">Additional Capabilities</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {additionalCapabilities.map((capability) => (
            <div key={capability} className="rounded-md border bg-muted/20 p-3 text-sm">
              {capability}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Ready to Get Started?</h2>
        <p className="mb-6 text-muted-foreground">
          Book a strategy call to discuss your marketing needs.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Book a Strategy Call</Link>
        </Button>
      </div>
    </div>
  );
}
