"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/**
 * Resources Teaser Section - Preview of blog/resources content
 *
 * Approach: Show 3 featured resources with links to full resources page
 * Preview of live resource focus areas
 */
export function ResourcesTeaser() {
  const resources = [
    {
      type: "Guide",
      icon: BookOpen,
      title: "AI Marketing Stack Guide",
      description:
        "A practical playbook for choosing the right AI tools for planning, content, and reporting.",
      href: "/resources",
    },
    {
      type: "Guide",
      icon: FileText,
      title: "Content Planning for Small Teams",
      description:
        "Build a repeatable monthly content system without overloading your internal team.",
      href: "/resources",
    },
    {
      type: "Checklist",
      icon: CheckSquare,
      title: "Local SEO Growth Checklist",
      description:
        "A simple checklist to improve local visibility and turn search traffic into leads.",
      href: "/resources",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Resources & Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            Practical guidance for teams using AI and modern marketing systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={resource.href}
                  className="group block rounded-lg border p-6 transition-all hover:border-primary hover:shadow-md"
                  onClick={() =>
                    track("link_click", {
                      link_type: "resource",
                      destination: resource.href,
                    })
                  }
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {resource.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                    Explore resource
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/resources">
              View All Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


