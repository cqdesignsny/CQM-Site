"use client";

import { ServicePageTemplate } from "@/components/services/service-page-template";
import { useLanguage } from "@/lib/i18n/context";

export function VideoServiceContent() {
  const { t } = useLanguage();
  return (
    <ServicePageTemplate
      serviceName={t("sd.video.name")}
      headline={t("sd.video.headline")}
      description={t("sd.video.desc")}
      path="/services/video"
      highlights={[t("sd.video.h1"), t("sd.video.h2"), t("sd.video.h3")]}
      outcomes={[
        t("sd.video.o1"), t("sd.video.o2"), t("sd.video.o3"),
        t("sd.video.o4"), t("sd.video.o5"), t("sd.video.o6"),
      ]}
      deliverables={[
        {
          title: t("sd.video.d1.title"),
          description: t("sd.video.d1.desc"),
          items: [t("sd.video.d1.i1"), t("sd.video.d1.i2"), t("sd.video.d1.i3"), t("sd.video.d1.i4")],
        },
        {
          title: t("sd.video.d2.title"),
          description: t("sd.video.d2.desc"),
          items: [t("sd.video.d2.i1"), t("sd.video.d2.i2"), t("sd.video.d2.i3"), t("sd.video.d2.i4")],
        },
      ]}
      processSteps={[
        { step: t("sd.video.p1.step"), description: t("sd.video.p1.desc") },
        { step: t("sd.video.p2.step"), description: t("sd.video.p2.desc") },
        { step: t("sd.video.p3.step"), description: t("sd.video.p3.desc") },
        { step: t("sd.video.p4.step"), description: t("sd.video.p4.desc") },
      ]}
      tiers={[
        {
          name: t("sd.video.t1.name"),
          price: t("sd.video.t1.price"),
          description: t("sd.video.t1.desc"),
          features: [t("sd.video.t1.f1"), t("sd.video.t1.f2"), t("sd.video.t1.f3"), t("sd.video.t1.f4")],
        },
        {
          name: t("sd.video.t2.name"),
          price: t("sd.video.t2.price"),
          description: t("sd.video.t2.desc"),
          features: [t("sd.video.t2.f1"), t("sd.video.t2.f2"), t("sd.video.t2.f3"), t("sd.video.t2.f4")],
        },
        {
          name: t("sd.video.t3.name"),
          price: t("sd.video.t3.price"),
          description: t("sd.video.t3.desc"),
          features: [t("sd.video.t3.f1"), t("sd.video.t3.f2"), t("sd.video.t3.f3"), t("sd.video.t3.f4")],
        },
      ]}
      faqs={[
        { question: t("sd.video.faq1.q"), answer: t("sd.video.faq1.a") },
        { question: t("sd.video.faq2.q"), answer: t("sd.video.faq2.a") },
        { question: t("sd.video.faq3.q"), answer: t("sd.video.faq3.a") },
        { question: t("sd.video.faq4.q"), answer: t("sd.video.faq4.a") },
      ]}
    />
  );
}
