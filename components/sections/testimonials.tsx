"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

/**
 * Testimonials Section - Client voice and trust
 */
export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah O'Flaherty",
      role: "Founder",
      company: "SaGrah Beauty",
      content:
        "It feels like its our company, like we are in it together.",
      note: "Client feedback from live-site testimonial.",
    },
    {
      name: "Client Partner",
      role: "Owner",
      company: "Hudson Valley Service Brand",
      content:
        "They simplified our marketing plan, improved execution, and helped our team focus on what actually drives leads.",
      note: "Representative client feedback theme.",
    },
    {
      name: "Client Partner",
      role: "Founder",
      company: "Growth-Stage Brand",
      content:
        "The blend of strategy, creative support, and AI-powered optimization gave us a much more consistent growth system.",
      note: "Representative client feedback theme.",
    },
  ];

  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            What Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            We build long-term partnerships focused on results and reliability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.company}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg border bg-card p-6"
            >
              <Quote className="mb-4 h-8 w-8 text-primary opacity-50" />
              <p className="mb-4 text-sm leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{testimonial.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
