"use client";

import { ServicePageTemplate } from "@/components/services/service-page-template";
import { useLanguage } from "@/lib/i18n/context";

export function AiIntServiceContent() {
  const { t } = useLanguage();
  return (
    <ServicePageTemplate
      serviceName={t("sd.aiInt.name")}
      headline={t("sd.aiInt.headline")}
      description={t("sd.aiInt.desc")}
      path="/services/ai-integration"
      highlights={[t("sd.aiInt.h1"), t("sd.aiInt.h2"), t("sd.aiInt.h3")]}
      outcomes={[
        t("sd.aiInt.o1"), t("sd.aiInt.o2"), t("sd.aiInt.o3"),
        t("sd.aiInt.o4"), t("sd.aiInt.o5"), t("sd.aiInt.o6"),
      ]}
      deliverables={[
        {
          title: t("sd.aiInt.d1.title"),
          description: t("sd.aiInt.d1.desc"),
          items: [t("sd.aiInt.d1.i1"), t("sd.aiInt.d1.i2"), t("sd.aiInt.d1.i3"), t("sd.aiInt.d1.i4")],
        },
        {
          title: t("sd.aiInt.d2.title"),
          description: t("sd.aiInt.d2.desc"),
          items: [t("sd.aiInt.d2.i1"), t("sd.aiInt.d2.i2"), t("sd.aiInt.d2.i3"), t("sd.aiInt.d2.i4")],
        },
      ]}
      processSteps={[
        { step: t("sd.aiInt.p1.step"), description: t("sd.aiInt.p1.desc") },
        { step: t("sd.aiInt.p2.step"), description: t("sd.aiInt.p2.desc") },
        { step: t("sd.aiInt.p3.step"), description: t("sd.aiInt.p3.desc") },
        { step: t("sd.aiInt.p4.step"), description: t("sd.aiInt.p4.desc") },
      ]}
      tiers={[
        {
          name: t("sd.aiInt.t1.name"),
          price: t("sd.aiInt.t1.price"),
          description: t("sd.aiInt.t1.desc"),
          features: [t("sd.aiInt.t1.f1"), t("sd.aiInt.t1.f2"), t("sd.aiInt.t1.f3"), t("sd.aiInt.t1.f4")],
        },
        {
          name: t("sd.aiInt.t2.name"),
          price: t("sd.aiInt.t2.price"),
          description: t("sd.aiInt.t2.desc"),
          features: [t("sd.aiInt.t2.f1"), t("sd.aiInt.t2.f2"), t("sd.aiInt.t2.f3"), t("sd.aiInt.t2.f4")],
        },
        {
          name: t("sd.aiInt.t3.name"),
          price: t("sd.aiInt.t3.price"),
          description: t("sd.aiInt.t3.desc"),
          features: [t("sd.aiInt.t3.f1"), t("sd.aiInt.t3.f2"), t("sd.aiInt.t3.f3"), t("sd.aiInt.t3.f4")],
        },
      ]}
      faqs={[
        { question: t("sd.aiInt.faq1.q"), answer: t("sd.aiInt.faq1.a") },
        { question: t("sd.aiInt.faq2.q"), answer: t("sd.aiInt.faq2.a") },
        { question: t("sd.aiInt.faq3.q"), answer: t("sd.aiInt.faq3.a") },
        { question: t("sd.aiInt.faq4.q"), answer: t("sd.aiInt.faq4.a") },
      ]}
    />
  );
}
