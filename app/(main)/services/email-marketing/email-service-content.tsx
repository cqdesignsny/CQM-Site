"use client";

import { ServicePageTemplate } from "@/components/services/service-page-template";
import { useLanguage } from "@/lib/i18n/context";

export function EmailServiceContent() {
  const { t } = useLanguage();
  return (
    <ServicePageTemplate
      serviceName={t("sd.email.name")}
      headline={t("sd.email.headline")}
      description={t("sd.email.desc")}
      path="/services/email-marketing"
      highlights={[t("sd.email.h1"), t("sd.email.h2"), t("sd.email.h3")]}
      outcomes={[
        t("sd.email.o1"), t("sd.email.o2"), t("sd.email.o3"),
        t("sd.email.o4"), t("sd.email.o5"), t("sd.email.o6"),
      ]}
      deliverables={[
        {
          title: t("sd.email.d1.title"),
          description: t("sd.email.d1.desc"),
          items: [t("sd.email.d1.i1"), t("sd.email.d1.i2"), t("sd.email.d1.i3"), t("sd.email.d1.i4")],
        },
        {
          title: t("sd.email.d2.title"),
          description: t("sd.email.d2.desc"),
          items: [t("sd.email.d2.i1"), t("sd.email.d2.i2"), t("sd.email.d2.i3"), t("sd.email.d2.i4")],
        },
      ]}
      processSteps={[
        { step: t("sd.email.p1.step"), description: t("sd.email.p1.desc") },
        { step: t("sd.email.p2.step"), description: t("sd.email.p2.desc") },
        { step: t("sd.email.p3.step"), description: t("sd.email.p3.desc") },
        { step: t("sd.email.p4.step"), description: t("sd.email.p4.desc") },
      ]}
      tiers={[
        {
          name: t("sd.email.t1.name"),
          price: t("sd.email.t1.price"),
          description: t("sd.email.t1.desc"),
          features: [t("sd.email.t1.f1"), t("sd.email.t1.f2"), t("sd.email.t1.f3"), t("sd.email.t1.f4")],
        },
        {
          name: t("sd.email.t2.name"),
          price: t("sd.email.t2.price"),
          description: t("sd.email.t2.desc"),
          features: [t("sd.email.t2.f1"), t("sd.email.t2.f2"), t("sd.email.t2.f3"), t("sd.email.t2.f4")],
        },
        {
          name: t("sd.email.t3.name"),
          price: t("sd.email.t3.price"),
          description: t("sd.email.t3.desc"),
          features: [t("sd.email.t3.f1"), t("sd.email.t3.f2"), t("sd.email.t3.f3"), t("sd.email.t3.f4")],
        },
      ]}
      faqs={[
        { question: t("sd.email.faq1.q"), answer: t("sd.email.faq1.a") },
        { question: t("sd.email.faq2.q"), answer: t("sd.email.faq2.a") },
        { question: t("sd.email.faq3.q"), answer: t("sd.email.faq3.a") },
        { question: t("sd.email.faq4.q"), answer: t("sd.email.faq4.a") },
      ]}
    />
  );
}
