import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Camera, Megaphone, PenTool, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers | Creative Quality Marketing",
  description:
    "Explore careers at Creative Quality Marketing. Join an AI-forward team building measurable growth for client brands.",
  path: "/careers",
  keywords: ["marketing careers", "creative agency jobs", "AI marketing team"],
});

/**
 * Careers Page - Job listings and company culture
 */
export default function CareersPage() {
  const roleAreas = [
    {
      icon: Megaphone,
      title: "Performance Marketing",
      description: "Paid media specialists, account strategists, and growth operators.",
    },
    {
      icon: PenTool,
      title: "Creative & Content",
      description: "Copywriters, social content creators, editors, and brand storytellers.",
    },
    {
      icon: Camera,
      title: "Production",
      description: "Photographers, videographers, and studio production contributors.",
    },
    {
      icon: Workflow,
      title: "Operations & Client Success",
      description: "Project managers and client success coordinators who drive execution quality.",
    },
  ];

  const expectations = [
    "Strong communication and ownership mindset",
    "Comfort with fast iteration and structured feedback",
    "Curiosity around AI tools and practical automation",
    "Focus on quality, deadlines, and client outcomes",
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          Careers
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Join an AI-Forward Marketing Team
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          We help businesses grow through strategy, creative execution, and
          modern technology. If you care about results and craft, we&apos;d love
          to connect.
        </p>

        <section className="mb-14 rounded-xl border bg-muted/30 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">How We Work</h2>
          </div>
          <p className="text-muted-foreground">
            Our team blends human strategy with AI-powered systems to move
            faster and deliver better output. We value initiative, collaboration,
            and clear communication.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-semibold">Role Areas We Hire For</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {roleAreas.map((role) => {
              const Icon = role.icon;
              return (
                <article key={role.title} className="rounded-lg border p-5">
                  <Icon className="mb-3 h-5 w-5 text-primary" />
                  <h3 className="mb-2 font-semibold">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-semibold">What We Look For</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {expectations.map((item) => (
              <div key={item} className="rounded-md border p-4 text-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">No Open Role Listed?</h2>
          <p className="mb-6 text-muted-foreground">
            Send your resume, portfolio, and a short note on how you use AI in
            your workflow to{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary hover:underline"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">Learn About Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
