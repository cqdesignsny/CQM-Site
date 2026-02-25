"use client";

import { ServicePageTemplate } from "@/components/services/service-page-template";
import { useLanguage } from "@/lib/i18n/context";

export function PaidAdsServiceContent() {
  const { t } = useLanguage();
  return (
    <ServicePageTemplate
      serviceName={t("sd.ads.name")}
      headline={t("sd.ads.headline")}
      description={t("sd.ads.desc")}
      path="/services/paid-ads"
      highlights={[t("sd.ads.h1"), t("sd.ads.h2"), t("sd.ads.h3")]}
      outcomes={[
        t("sd.ads.o1"), t("sd.ads.o2"), t("sd.ads.o3"),
        t("sd.ads.o4"), t("sd.ads.o5"), t("sd.ads.o6"),
      ]}
      deliverables={[
        {
          title: t("sd.ads.d1.title"),
          description: t("sd.ads.d1.desc"),
          items: [t("sd.ads.d1.i1"), t("sd.ads.d1.i2"), t("sd.ads.d1.i3"), t("sd.ads.d1.i4")],
        },
        {
          title: t("sd.ads.d2.title"),
          description: t("sd.ads.d2.desc"),
          items: [t("sd.ads.d2.i1"), t("sd.ads.d2.i2"), t("sd.ads.d2.i3"), t("sd.ads.d2.i4")],
        },
      ]}
      processSteps={[
        { step: t("sd.ads.p1.step"), description: t("sd.ads.p1.desc") },
        { step: t("sd.ads.p2.step"), description: t("sd.ads.p2.desc") },
        { step: t("sd.ads.p3.step"), description: t("sd.ads.p3.desc") },
        { step: t("sd.ads.p4.step"), description: t("sd.ads.p4.desc") },
      ]}
      tiers={[
        {
          name: t("sd.ads.t1.name"),
          price: t("sd.ads.t1.price"),
          description: t("sd.ads.t1.desc"),
          features: [t("sd.ads.t1.f1"), t("sd.ads.t1.f2"), t("sd.ads.t1.f3"), t("sd.ads.t1.f4")],
        },
        {
          name: t("sd.ads.t2.name"),
          price: t("sd.ads.t2.price"),
          description: t("sd.ads.t2.desc"),
          features: [t("sd.ads.t2.f1"), t("sd.ads.t2.f2"), t("sd.ads.t2.f3"), t("sd.ads.t2.f4")],
        },
        {
          name: t("sd.ads.t3.name"),
          price: t("sd.ads.t3.price"),
          description: t("sd.ads.t3.desc"),
          features: [t("sd.ads.t3.f1"), t("sd.ads.t3.f2"), t("sd.ads.t3.f3"), t("sd.ads.t3.f4")],
        },
      ]}
      faqs={[
        { question: t("sd.ads.faq1.q"), answer: t("sd.ads.faq1.a") },
        { question: t("sd.ads.faq2.q"), answer: t("sd.ads.faq2.a") },
        { question: t("sd.ads.faq3.q"), answer: t("sd.ads.faq3.a") },
        { question: t("sd.ads.faq4.q"), answer: t("sd.ads.faq4.a") },
      ]}
    />
  );
}
