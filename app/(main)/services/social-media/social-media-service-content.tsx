"use client";

import { ServicePageTemplate } from "@/components/services/service-page-template";
import { useLanguage } from "@/lib/i18n/context";

export function SocialMediaServiceContent() {
  const { t } = useLanguage();
  return (
    <ServicePageTemplate
      serviceName={t("sd.social.name")}
      headline={t("sd.social.headline")}
      description={t("sd.social.desc")}
      path="/services/social-media"
      highlights={[t("sd.social.h1"), t("sd.social.h2"), t("sd.social.h3")]}
      outcomes={[
        t("sd.social.o1"), t("sd.social.o2"), t("sd.social.o3"),
        t("sd.social.o4"), t("sd.social.o5"), t("sd.social.o6"),
      ]}
      deliverables={[
        {
          title: t("sd.social.d1.title"),
          description: t("sd.social.d1.desc"),
          items: [t("sd.social.d1.i1"), t("sd.social.d1.i2"), t("sd.social.d1.i3"), t("sd.social.d1.i4")],
        },
        {
          title: t("sd.social.d2.title"),
          description: t("sd.social.d2.desc"),
          items: [t("sd.social.d2.i1"), t("sd.social.d2.i2"), t("sd.social.d2.i3"), t("sd.social.d2.i4")],
        },
      ]}
      processSteps={[
        { step: t("sd.social.p1.step"), description: t("sd.social.p1.desc") },
        { step: t("sd.social.p2.step"), description: t("sd.social.p2.desc") },
        { step: t("sd.social.p3.step"), description: t("sd.social.p3.desc") },
        { step: t("sd.social.p4.step"), description: t("sd.social.p4.desc") },
      ]}
      tiers={[
        {
          name: t("sd.social.t1.name"),
          price: t("sd.social.t1.price"),
          description: t("sd.social.t1.desc"),
          features: [t("sd.social.t1.f1"), t("sd.social.t1.f2"), t("sd.social.t1.f3"), t("sd.social.t1.f4")],
        },
        {
          name: t("sd.social.t2.name"),
          price: t("sd.social.t2.price"),
          description: t("sd.social.t2.desc"),
          features: [t("sd.social.t2.f1"), t("sd.social.t2.f2"), t("sd.social.t2.f3"), t("sd.social.t2.f4")],
        },
        {
          name: t("sd.social.t3.name"),
          price: t("sd.social.t3.price"),
          description: t("sd.social.t3.desc"),
          features: [t("sd.social.t3.f1"), t("sd.social.t3.f2"), t("sd.social.t3.f3"), t("sd.social.t3.f4")],
        },
      ]}
      faqs={[
        { question: t("sd.social.faq1.q"), answer: t("sd.social.faq1.a") },
        { question: t("sd.social.faq2.q"), answer: t("sd.social.faq2.a") },
        { question: t("sd.social.faq3.q"), answer: t("sd.social.faq3.a") },
        { question: t("sd.social.faq4.q"), answer: t("sd.social.faq4.a") },
      ]}
    />
  );
}
