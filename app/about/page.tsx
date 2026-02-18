import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Brain, PawPrint, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Creative Quality Marketing",
  description:
    "Meet the Creative Quality Marketing team, our story, core values, and AI-powered approach to growth.",
  path: "/about",
  keywords: ["about creative quality marketing", "marketing agency team", "agency core values"],
});

export default function AboutPage() {
  const leadership = [
    {
      name: "Cesar Q.",
      role: "Founder & CEO",
      summary:
        "Digital marketer, branding strategist, web designer/developer, and growth-focused campaign leader.",
      image:
        "https://creativequalitymarketing.com/wp-content/uploads/2022/07/cez-480x480.jpg",
    },
    {
      name: "Laura B.",
      role: "Co-Founder & COO",
      summary:
        "Leads strategy execution across social, paid ads, content, and email marketing workflows.",
      image:
        "https://creativequalitymarketing.com/wp-content/uploads/2021/03/laura-480x480.jpg",
    },
    {
      name: "Kevin Page",
      role: "Photo & Video Producer",
      summary:
        "Videographer, photographer, editor, and animator driving high-quality media production.",
      image:
        "https://creativequalitymarketing.com/wp-content/uploads/2021/03/kevin-480x480.jpg",
    },
    {
      name: "Dennis Rodriguez",
      role: "AI & Web Developer",
      summary:
        "Designer/developer focused on AI-enabled systems, web builds, and execution support.",
      image:
        "https://creativequalitymarketing.com/wp-content/uploads/2024/03/Dennis-Headshot-480x480.png",
    },
    {
      name: "Broly",
      role: "Chief Play Officer",
      summary:
        "Happiness manager, morale booster, and the most important member of the culture team.",
      image:
        "https://creativequalitymarketing.com/wp-content/uploads/2021/03/broly-480x480.jpg",
    },
  ];

  const coreValues = [
    {
      title: "Passionate",
      description:
        "We love what we do, keep learning, and bring consistent energy to every campaign.",
      icon: Sparkles,
    },
    {
      title: "Creative",
      description:
        "We think outside the box and turn bold ideas into real deliverables.",
      icon: Brain,
    },
    {
      title: "Quality",
      description:
        "We hold a high quality bar because your brand and ours are both on the line.",
      icon: ShieldCheck,
    },
    {
      title: "Problem Solving",
      description:
        "There is always a solution. We research, test, and build until we find it.",
      icon: Target,
    },
    {
      title: "Balance",
      description:
        "Work hard, play harder. We make the growth journey productive and enjoyable.",
      icon: PawPrint,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="brand-section-title mb-3">About Creative Quality Marketing</p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Built on Creativity, Powered by AI, Focused on Results
        </h1>
        <p className="mb-12 max-w-4xl text-lg text-muted-foreground">
          We started with one simple goal: connect businesses to their future
          customers. That mission still drives everything we do, now with a
          modern AI-forward workflow and a hands-on team behind every campaign.
        </p>

        <section className="mb-14 brand-panel p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-semibold">Our Story</h2>
          <p className="mb-4 text-muted-foreground">
            Creative Quality Marketing began by helping family businesses that
            needed better marketing execution. We built brands, websites,
            content, and campaigns that turned into measurable growth. Over time,
            that became a full-service agency serving businesses across multiple
            industries.
          </p>
          <p className="text-muted-foreground">
            Today, we combine strategy, creative production, and AI-enabled
            systems to help brands scale without making the process overwhelming.
          </p>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Our Leadership Team</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member) => (
              <article
                key={member.name}
                className="group rounded-xl border bg-white/95 p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="mb-2 text-sm font-medium text-primary">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 rounded-xl border bg-black p-6 text-white md:p-8">
          <h2 className="mb-4 text-2xl font-semibold">Our Core Values Wheel</h2>
          <p className="mb-6 text-white/75">
            These values shape how we collaborate, build, and deliver for every
            client relationship.
          </p>
          <div className="mb-6 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4">
            <Image
              src="https://creativequalitymarketing.com/wp-content/uploads/2021/09/core_values_cq-980x878-2.png"
              alt="Creative Quality Marketing core values wheel"
              width={980}
              height={878}
              className="h-auto w-full rounded-md"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-red-300/40 hover:bg-white/[0.08]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-red-300" />
                    <h3 className="font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-sm text-white/75">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl border p-6 text-center md:p-8">
          <h2 className="mb-3 text-2xl font-semibold">Ready to Build With Our Team?</h2>
          <p className="mb-6 text-muted-foreground">
            We&apos;ll map the right strategy for your stage and show how AI can
            accelerate results without sacrificing quality.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">Book a Strategy Call</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
