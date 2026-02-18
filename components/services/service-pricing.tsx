"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/**
 * Service Pricing Component - 3-tier pricing table
 *
 * Approach: Simple card-based pricing display
 * Trade-offs:
 * - Could use a more complex pricing calculator
 * - Could integrate with Stripe for direct checkout
 * - Keeping simple for now - CTAs lead to contact form
 */
export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface ServicePricingProps {
  serviceName: string;
  tiers: PricingTier[];
}

export function ServicePricing({ serviceName, tiers }: ServicePricingProps) {
  const handleCTAClick = (tier: string) => {
    track("cta_click", {
      cta_type: "pricing_tier",
      service: serviceName,
      tier,
    });
  };

  return (
    <section className="mb-20" id="pricing">
      <div className="mb-10 text-center">
        <p className="brand-section-title mb-2">Pricing</p>
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Plans Built for {serviceName}
        </h2>
        <p className="text-muted-foreground">
          Start with the baseline that fits your stage. Final scope is tailored
          to your goals, channels, and complexity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <article
            key={tier.name}
            className={`group relative overflow-hidden rounded-xl border bg-white/95 p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${
              index === 1
                ? "border-red-300 shadow-xl ring-1 ring-red-200/60"
                : "hover:border-primary"
            }`}
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 ${
                index === 1 ? "bg-red-600" : "bg-black"
              }`}
            />
            {index === 1 && (
              <div className="mb-4 text-center">
                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              </div>
            )}
            <h3 className="mb-2 text-2xl font-bold">{tier.name}</h3>
            <div className="mb-2 text-3xl font-bold text-foreground">{tier.price}</div>
            <p className="mb-6 min-h-10 text-sm text-muted-foreground">
              {tier.description}
            </p>
            <ul className="mb-6 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              variant={index === 1 ? "default" : "outline"}
              onClick={() => handleCTAClick(tier.name)}
              asChild
            >
              <a href={`/contact?service=${encodeURIComponent(serviceName)}`}>
                Start This Plan
              </a>
            </Button>
          </article>
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        All plans include strategy support and transparent reporting.
      </p>
    </section>
  );
}



