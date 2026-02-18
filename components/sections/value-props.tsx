"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  TrendingUp,
  Share2,
  Mail,
  Video,
  Mic,
  Bot,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * Value Props Section - Showcase core services
 *
 * Approach: Grid layout with icons and descriptions
 * Each service links to its dedicated page
 */
export function ValueProps() {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Custom websites that convert visitors into customers.",
      href: "/services/web",
    },
    {
      icon: Search,
      title: "SEO",
      description: "Rank higher in search results and drive organic traffic.",
      href: "/services/seo",
    },
    {
      icon: TrendingUp,
      title: "Paid Ads",
      description: "Data-driven campaigns on Google, Meta, and LinkedIn.",
      href: "/services/paid-ads",
    },
    {
      icon: Share2,
      title: "Social Media",
      description: "Engage your audience and grow your brand presence.",
      href: "/services/social-media",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Nurture leads and retain customers with targeted campaigns.",
      href: "/services/email-marketing",
    },
    {
      icon: Bot,
      title: "AI Development & Automation",
      description:
        "Automate repetitive workflows and build smarter systems for your marketing and operations.",
      href: "/services/ai-development",
    },
    {
      icon: Workflow,
      title: "Agent & AI Integration",
      description:
        "Integrate AI assistants and agents into your process without disrupting your existing stack.",
      href: "/services/ai-integration",
    },
    {
      icon: Video,
      title: "Video Production",
      description: "Professional video content that tells your story.",
      href: "/services/video",
    },
    {
      icon: Mic,
      title: "Podcast Studio",
      description: "Full-service podcast production and distribution.",
      href: "/studio",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Grow
          </h2>
          <p className="text-lg text-muted-foreground">
            From web development to podcast production, we offer end-to-end
            digital marketing services powered by AI-enhanced workflows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="group block rounded-lg border bg-white/90 p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                  onClick={() =>
                    track("link_click", {
                      link_type: "service_card",
                      destination: service.title,
                    })
                  }
                >
                  <Icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


