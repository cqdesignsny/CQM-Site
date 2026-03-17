"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/context";

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface ServicePricingProps {
  serviceName: string;
  tiers?: PricingTier[];
}

export function ServicePricing({ serviceName }: ServicePricingProps) {
  const { t } = useLanguage();

  const handleCTAClick = (type: string) => {
    track("cta_click", {
      cta_type: type,
      service: serviceName,
    });
  };

  return (
    <section className="mb-20" id="pricing">
      <div className="rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-950/20 to-black/40 p-8 text-center md:p-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20">
            <Sparkles className="h-6 w-6 text-red-400" />
          </div>
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            {t("serviceDetail.pricingCTA")}
          </h2>
          <p className="mb-8 text-muted-foreground">
            {t("serviceDetail.pricingCTADesc")}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" onClick={() => handleCTAClick("build_proposal")}>
              <Link href="/proposals">
                {t("cta.buildPackage")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              onClick={() => handleCTAClick("take_assessment")}
            >
              <Link href="/assessment">
                {t("cta.takeQuiz")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
