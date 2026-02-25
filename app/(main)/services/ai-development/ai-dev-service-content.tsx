"use client";

import { ServicePageTemplate } from "@/components/services/service-page-template";
import { useLanguage } from "@/lib/i18n/context";

export function AiDevServiceContent() {
  const { t } = useLanguage();
  return (
    <ServicePageTemplate
      serviceName={t("sd.aiDev.name")}
      headline={t("sd.aiDev.headline")}
      description={t("sd.aiDev.desc")}
      path="/services/ai-development"
      highlights={[t("sd.aiDev.h1"), t("sd.aiDev.h2"), t("sd.aiDev.h3")]}
      outcomes={[
        t("sd.aiDev.o1"), t("sd.aiDev.o2"), t("sd.aiDev.o3"),
        t("sd.aiDev.o4"), t("sd.aiDev.o5"), t("sd.aiDev.o6"),
      ]}
      deliverables={[
        {
          title: t("sd.aiDev.d1.title"),
          description: t("sd.aiDev.d1.desc"),
          items: [t("sd.aiDev.d1.i1"), t("sd.aiDev.d1.i2"), t("sd.aiDev.d1.i3"), t("sd.aiDev.d1.i4")],
        },
        {
          title: t("sd.aiDev.d2.title"),
          description: t("sd.aiDev.d2.desc"),
          items: [t("sd.aiDev.d2.i1"), t("sd.aiDev.d2.i2"), t("sd.aiDev.d2.i3"), t("sd.aiDev.d2.i4")],
        },
      ]}
      processSteps={[
        { step: t("sd.aiDev.p1.step"), description: t("sd.aiDev.p1.desc") },
        { step: t("sd.aiDev.p2.step"), description: t("sd.aiDev.p2.desc") },
        { step: t("sd.aiDev.p3.step"), description: t("sd.aiDev.p3.desc") },
        { step: t("sd.aiDev.p4.step"), description: t("sd.aiDev.p4.desc") },
      ]}
      tiers={[
        {
          name: t("sd.aiDev.t1.name"),
          price: t("sd.aiDev.t1.price"),
          description: t("sd.aiDev.t1.desc"),
          features: [t("sd.aiDev.t1.f1"), t("sd.aiDev.t1.f2"), t("sd.aiDev.t1.f3"), t("sd.aiDev.t1.f4")],
        },
        {
          name: t("sd.aiDev.t2.name"),
          price: t("sd.aiDev.t2.price"),
          description: t("sd.aiDev.t2.desc"),
          features: [t("sd.aiDev.t2.f1"), t("sd.aiDev.t2.f2"), t("sd.aiDev.t2.f3"), t("sd.aiDev.t2.f4")],
        },
        {
          name: t("sd.aiDev.t3.name"),
          price: t("sd.aiDev.t3.price"),
          description: t("sd.aiDev.t3.desc"),
          features: [t("sd.aiDev.t3.f1"), t("sd.aiDev.t3.f2"), t("sd.aiDev.t3.f3"), t("sd.aiDev.t3.f4")],
        },
      ]}
      faqs={[
        { question: t("sd.aiDev.faq1.q"), answer: t("sd.aiDev.faq1.a") },
        { question: t("sd.aiDev.faq2.q"), answer: t("sd.aiDev.faq2.a") },
        { question: t("sd.aiDev.faq3.q"), answer: t("sd.aiDev.faq3.a") },
        { question: t("sd.aiDev.faq4.q"), answer: t("sd.aiDev.faq4.a") },
      ]}
    />
  );
}
