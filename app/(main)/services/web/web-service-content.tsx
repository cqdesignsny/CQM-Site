"use client";

import { ServicePageTemplate } from "@/components/services/service-page-template";
import { useLanguage } from "@/lib/i18n/context";

export function WebServiceContent() {
  const { t } = useLanguage();
  return (
    <ServicePageTemplate
      serviceName={t("sd.web.name")}
      headline={t("sd.web.headline")}
      description={t("sd.web.desc")}
      path="/services/web"
      highlights={[t("sd.web.h1"), t("sd.web.h2"), t("sd.web.h3")]}
      outcomes={[
        t("sd.web.o1"), t("sd.web.o2"), t("sd.web.o3"),
        t("sd.web.o4"), t("sd.web.o5"), t("sd.web.o6"),
      ]}
      deliverables={[
        {
          title: t("sd.web.d1.title"),
          description: t("sd.web.d1.desc"),
          items: [t("sd.web.d1.i1"), t("sd.web.d1.i2"), t("sd.web.d1.i3"), t("sd.web.d1.i4")],
        },
        {
          title: t("sd.web.d2.title"),
          description: t("sd.web.d2.desc"),
          items: [t("sd.web.d2.i1"), t("sd.web.d2.i2"), t("sd.web.d2.i3"), t("sd.web.d2.i4")],
        },
      ]}
      processSteps={[
        { step: t("sd.web.p1.step"), description: t("sd.web.p1.desc") },
        { step: t("sd.web.p2.step"), description: t("sd.web.p2.desc") },
        { step: t("sd.web.p3.step"), description: t("sd.web.p3.desc") },
        { step: t("sd.web.p4.step"), description: t("sd.web.p4.desc") },
      ]}
      tiers={[
        {
          name: t("sd.web.t1.name"),
          price: t("sd.web.t1.price"),
          description: t("sd.web.t1.desc"),
          features: [t("sd.web.t1.f1"), t("sd.web.t1.f2"), t("sd.web.t1.f3"), t("sd.web.t1.f4"), t("sd.web.t1.f5")],
        },
        {
          name: t("sd.web.t2.name"),
          price: t("sd.web.t2.price"),
          description: t("sd.web.t2.desc"),
          features: [t("sd.web.t2.f1"), t("sd.web.t2.f2"), t("sd.web.t2.f3"), t("sd.web.t2.f4"), t("sd.web.t2.f5")],
        },
        {
          name: t("sd.web.t3.name"),
          price: t("sd.web.t3.price"),
          description: t("sd.web.t3.desc"),
          features: [t("sd.web.t3.f1"), t("sd.web.t3.f2"), t("sd.web.t3.f3"), t("sd.web.t3.f4"), t("sd.web.t3.f5")],
        },
      ]}
      faqs={[
        { question: t("sd.web.faq1.q"), answer: t("sd.web.faq1.a") },
        { question: t("sd.web.faq2.q"), answer: t("sd.web.faq2.a") },
        { question: t("sd.web.faq3.q"), answer: t("sd.web.faq3.a") },
        { question: t("sd.web.faq4.q"), answer: t("sd.web.faq4.a") },
      ]}
    />
  );
}
