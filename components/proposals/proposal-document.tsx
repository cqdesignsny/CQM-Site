"use client";

import type { Proposal } from "@/lib/proposals/types";
import { t } from "@/lib/proposals/translations";
import { formatCurrency, getServiceName } from "@/lib/proposals/calculations";
import { CATEGORIES, SERVICES } from "@/lib/proposals/services-data";
import { AcceptButton } from "./accept-button";
import { PrintStyles } from "./print-styles";
import {
  Calendar,
  User,
  Mail,
  Phone,
  Hash,
  AlertTriangle,
  Printer,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Props {
  proposal: Proposal;
  isStale: boolean;
}

export function ProposalDocument({ proposal, isStale }: Props) {
  const locale = proposal.locale;

  // Group services by category
  const groupedServices = CATEGORIES.map((cat) => {
    const services = proposal.selectedServices.filter((s) => {
      const full = SERVICES.find((svc) => svc.id === s.serviceId);
      return full?.category === cat.id;
    });
    return { category: cat, services };
  }).filter((group) => group.services.length > 0);

  const createdDate = new Date(proposal.createdAt).toLocaleDateString(
    locale === "es" ? "es-US" : locale === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <PrintStyles />
      <div className="bg-gradient-to-b from-black via-zinc-950 to-zinc-900 pb-20">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          {/* Stale notice */}
          {isStale && (
            <div className="no-print mb-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <p className="text-sm text-amber-300/80">
                {t("proposal.staleNotice", locale)}
              </p>
            </div>
          )}

          {/* Header card */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
                  {t("proposal.title", locale)}
                </p>
                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  {proposal.contact.name}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                  <Hash className="h-3 w-3" />
                  {proposal.id.replace("prop_", "")}
                </span>
                <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                  <span className="font-medium">{t("proposal.version", locale)}</span>{" "}
                  {proposal.version}
                </span>
              </div>
            </div>

            {/* Contact details */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar className="h-4 w-4 text-white/30" />
                <span>{createdDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-4 w-4 text-white/30" />
                <span>{proposal.contact.email}</span>
              </div>
              {proposal.contact.phone && (
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Phone className="h-4 w-4 text-white/30" />
                  <span>{proposal.contact.phone}</span>
                </div>
              )}
              {proposal.referredBy && (
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <User className="h-4 w-4 text-white/30" />
                  <span>
                    {t("proposal.referredBy", locale)}: {proposal.referredBy}
                  </span>
                </div>
              )}
            </div>

            {/* Accepted badge */}
            {proposal.acceptedAt && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-green-300">
                  {t("proposal.accepted", locale)} &middot;{" "}
                  {new Date(proposal.acceptedAt).toLocaleDateString(
                    locale === "es" ? "es-US" : locale === "fr" ? "fr-FR" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Services breakdown */}
          <div className="mt-6 space-y-4">
            {groupedServices.map(({ category, services }) => (
              <div
                key={category.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="text-base">{category.icon}</span>
                  {locale === "es" ? category.name_es : locale === "fr" ? category.name_fr : category.name}
                </h3>
                <div className="space-y-3">
                  {services.map((s) => {
                    const full = SERVICES.find(
                      (svc) => svc.id === s.serviceId
                    );
                    const desc = full
                      ? locale === "es"
                        ? full.description_es
                        : locale === "fr"
                          ? full.description_fr
                          : full.description
                      : "";
                    return (
                      <div
                        key={s.serviceId}
                        className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">
                            {getServiceName(s.serviceId, locale)}
                            {s.quantity > 1 && (
                              <span className="ml-1.5 text-white/40">
                                x{s.quantity}
                              </span>
                            )}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-white/40">
                            {desc}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold text-white">
                            {formatCurrency(s.unitPrice * s.quantity)}
                          </p>
                          {full && (
                            <p className="text-[10px] text-white/30">
                              {t(`billing.${full.billing}`, locale)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Custom line items */}
            {proposal.customLineItems.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  {t("custom.title", locale)}
                </h3>
                <div className="space-y-3">
                  {proposal.customLineItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-white">{item.name}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-white">
                          {formatCurrency(item.price)}
                        </span>
                        <span className="ml-1 text-[10px] text-white/30">
                          {t(`billing.${item.billing}`, locale)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing summary */}
          <div className="mt-6 rounded-2xl border border-red-600/20 bg-gradient-to-br from-red-600/[0.06] to-transparent p-6">
            <div className="space-y-3">
              {proposal.oneTimeTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">
                    {t("label.onetime", locale)}
                  </span>
                  <span className="font-medium text-white">
                    {formatCurrency(proposal.oneTimeTotal)}
                  </span>
                </div>
              )}
              {proposal.monthlyTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">
                    {t("label.monthly", locale)}
                  </span>
                  <span className="font-medium text-white">
                    {formatCurrency(proposal.monthlyTotal)}
                    <span className="text-white/40">/mo</span>
                  </span>
                </div>
              )}
              {proposal.hostingFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">
                    {t("label.hosting", locale)}
                  </span>
                  <span className="font-medium text-white">
                    {formatCurrency(proposal.hostingFee)}
                    <span className="text-white/40">/mo</span>
                  </span>
                </div>
              )}
              {proposal.discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400/80">
                    {t("label.discount", locale)}
                    {proposal.discountType && (
                      <span className="ml-1 text-xs text-white/30">
                        (
                        {proposal.discountType === "percentage"
                          ? `${proposal.discountValue}%`
                          : formatCurrency(proposal.discountValue || 0)}
                        )
                      </span>
                    )}
                  </span>
                  <span className="font-medium text-green-400">
                    -{formatCurrency(proposal.discountAmount)}
                  </span>
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-end justify-between">
                  <span className="text-base font-semibold text-white">
                    {t("label.total", locale)}
                  </span>
                  <span className="text-3xl font-bold text-red-400">
                    {formatCurrency(proposal.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Validity note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/30">
            <Clock className="h-3 w-3" />
            {t("proposal.validNote", locale)}
          </div>

          {/* Actions */}
          <div className="no-print mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {!proposal.acceptedAt && (
              <AcceptButton
                proposalId={proposal.id}
                locale={locale}
              />
            )}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
            >
              <Printer className="h-4 w-4" />
              {t("proposal.print", locale)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
