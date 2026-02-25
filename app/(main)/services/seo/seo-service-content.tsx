"use client";

import { ServicePageTemplate } from "@/components/services/service-page-template";
import { useLanguage } from "@/lib/i18n/context";

export function SeoServiceContent() {
  const { t } = useLanguage();
  return (
    <ServicePageTemplate
      serviceName={t("sd.seo.name")}
      headline={t("sd.seo.headline")}
      description={t("sd.seo.desc")}
      path="/services/seo"
      highlights={[t("sd.seo.h1"), t("sd.seo.h2"), t("sd.seo.h3")]}
      outcomes={[
        t("sd.seo.o1"), t("sd.seo.o2"), t("sd.seo.o3"),
        t("sd.seo.o4"), t("sd.seo.o5"), t("sd.seo.o6"),
      ]}
      deliverables={[
        {
          title: t("sd.seo.d1.title"),
          description: t("sd.seo.d1.desc"),
          items: [t("sd.seo.d1.i1"), t("sd.seo.d1.i2"), t("sd.seo.d1.i3"), t("sd.seo.d1.i4")],
        },
        {
          title: t("sd.seo.d2.title"),
          description: t("sd.seo.d2.desc"),
          items: [t("sd.seo.d2.i1"), t("sd.seo.d2.i2"), t("sd.seo.d2.i3"), t("sd.seo.d2.i4")],
        },
      ]}
      processSteps={[
        { step: t("sd.seo.p1.step"), description: t("sd.seo.p1.desc") },
        { step: t("sd.seo.p2.step"), description: t("sd.seo.p2.desc") },
        { step: t("sd.seo.p3.step"), description: t("sd.seo.p3.desc") },
        { step: t("sd.seo.p4.step"), description: t("sd.seo.p4.desc") },
      ]}
      tiers={[
        {
          name: t("sd.seo.t1.name"),
          price: t("sd.seo.t1.price"),
          description: t("sd.seo.t1.desc"),
          features: [t("sd.seo.t1.f1"), t("sd.seo.t1.f2"), t("sd.seo.t1.f3"), t("sd.seo.t1.f4")],
        },
        {
          name: t("sd.seo.t2.name"),
          price: t("sd.seo.t2.price"),
          description: t("sd.seo.t2.desc"),
          features: [t("sd.seo.t2.f1"), t("sd.seo.t2.f2"), t("sd.seo.t2.f3"), t("sd.seo.t2.f4")],
        },
        {
          name: t("sd.seo.t3.name"),
          price: t("sd.seo.t3.price"),
          description: t("sd.seo.t3.desc"),
          features: [t("sd.seo.t3.f1"), t("sd.seo.t3.f2"), t("sd.seo.t3.f3"), t("sd.seo.t3.f4")],
        },
      ]}
      faqs={[
        { question: t("sd.seo.faq1.q"), answer: t("sd.seo.faq1.a") },
        { question: t("sd.seo.faq2.q"), answer: t("sd.seo.faq2.a") },
        { question: t("sd.seo.faq3.q"), answer: t("sd.seo.faq3.a") },
        { question: t("sd.seo.faq4.q"), answer: t("sd.seo.faq4.a") },
      ]}
    />
  );
}
