"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Resources Teaser Section - Preview of blog/resources content
 * i18n: All visible text uses the global t() function
 */
export function ResourcesTeaser() {
  const { t } = useLanguage();

  const resources = [
    {
      typeKey: "resources.type.guide",
      icon: BookOpen,
      titleKey: "resources.item1.title",
      descKey: "resources.item1.desc",
      href: "/resources",
    },
    {
      typeKey: "resources.type.guide",
      icon: FileText,
      titleKey: "resources.item2.title",
      descKey: "resources.item2.desc",
      href: "/resources",
    },
    {
      typeKey: "resources.type.checklist",
      icon: CheckSquare,
      titleKey: "resources.item3.title",
      descKey: "resources.item3.desc",
      href: "/resources",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("resources.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("resources.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.titleKey}
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
                      {t(resource.typeKey)}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {t(resource.titleKey)}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t(resource.descKey)}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                    {t("resources.explore")}
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
              {t("resources.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
