"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Service FAQs Component - Accordion-style FAQ section
 *
 * Approach: Using Radix UI Accordion for accessibility
 * Why Radix?
 * - Built-in keyboard navigation
 * - ARIA attributes handled automatically
 * - Smooth animations
 */
export interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQsProps {
  faqs: FAQ[];
}

export function ServiceFAQs({ faqs }: ServiceFAQsProps) {
  return (
    <section className="mb-20" id="faqs">
      <div className="mb-8">
        <p className="brand-section-title mb-2">FAQs</p>
        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Straight answers to the most common implementation and engagement
          questions.
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-xl border bg-white/95 p-3 md:p-4"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`item-${index}`}
            className="rounded-lg border px-4 transition-colors hover:border-primary/40"
          >
            <AccordionTrigger className="text-left font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}




