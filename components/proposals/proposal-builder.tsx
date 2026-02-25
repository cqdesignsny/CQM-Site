"use client";

import { useReducer, useEffect, use } from "react";
import {
  proposalBuilderReducer,
  initialState,
} from "@/lib/proposals/reducer";
import { calculateAllTotals } from "@/lib/proposals/calculations";
import { useProposalLocale } from "@/lib/i18n/use-proposal-locale";
import { SERVICES } from "@/lib/proposals/services-data";
import { PackageSelector } from "./package-selector";
import { CategoryTabs } from "./category-tabs";
import { ServiceCard } from "./service-card";
import { CustomItemsEditor } from "./custom-items-editor";
import { DiscountField } from "./discount-field";
import { ProposalSummary } from "./proposal-summary";
import { ReviewStep } from "./review-step";
import { ContactStep } from "./contact-step";
import { track } from "@/lib/analytics";

interface Props {
  searchParamsPromise: Promise<{ from?: string; id?: string; services?: string }>;
}

export function ProposalBuilder({ searchParamsPromise }: Props) {
  const searchParams = use(searchParamsPromise);
  const [state, dispatch] = useReducer(proposalBuilderReducer, initialState);
  const { locale, pt } = useProposalLocale();

  // Load assessment recommendations if coming from assessment
  useEffect(() => {
    if (searchParams.from === "assessment" && searchParams.id) {
      // Try fetching from API first, fall back to URL-encoded services
      fetch(`/api/assessment/${searchParams.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.recommendedServices) {
            dispatch({
              type: "LOAD_RECOMMENDATIONS",
              assessmentId: searchParams.id!,
              serviceIds: data.recommendedServices,
            });
          }
        })
        .catch(() => {
          // API unavailable — use services from URL params
          if (searchParams.services) {
            const serviceIds = searchParams.services.split(",").filter(Boolean);
            if (serviceIds.length > 0) {
              dispatch({
                type: "LOAD_RECOMMENDATIONS",
                assessmentId: searchParams.id!,
                serviceIds,
              });
            }
          }
        });

      // Also check URL services param as immediate fallback
      if (searchParams.services) {
        const serviceIds = searchParams.services.split(",").filter(Boolean);
        if (serviceIds.length > 0) {
          dispatch({
            type: "LOAD_RECOMMENDATIONS",
            assessmentId: searchParams.id!,
            serviceIds,
          });
        }
      }
    }
  }, [searchParams.from, searchParams.id, searchParams.services]);

  useEffect(() => {
    track("proposal_started" as never);
  }, []);

  const selectedArray = Array.from(state.selectedServices.values());
  const totals = calculateAllTotals(
    selectedArray,
    state.customLineItems,
    state.discount
  );

  // Filter services by active category
  const filteredServices = SERVICES.filter(
    (s) => s.category === state.activeCategory
  );

  const handleSubmit = async () => {
    dispatch({ type: "SUBMIT_START" });

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          contact: state.contact,
          referredBy: state.referredBy,
          selectedServices: selectedArray,
          customLineItems: state.customLineItems,
          discount: state.discount,
          packageId: state.activePackage,
          assessmentId: state.assessmentId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: "SUBMIT_ERROR",
          error: data.error || "Something went wrong",
        });
        return;
      }

      dispatch({
        type: "SUBMIT_SUCCESS",
        result: {
          proposalId: data.proposalId,
          viewUrl: data.viewUrl,
        },
      });

      track("proposal_submitted" as never, {
        proposalId: data.proposalId,
        total: totals.grandTotal,
      });
    } catch {
      dispatch({
        type: "SUBMIT_ERROR",
        error: "Network error. Please try again.",
      });
    }
  };

  return (
    <div className={`bg-gradient-to-b from-black via-zinc-950 to-zinc-900${state.step === "build" ? " pb-20" : ""}`}>
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="brand-section-title mb-1">
              {pt("builder.title")}
            </p>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {pt("builder.subtitle")}
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {pt("builder.instructions")}
            </p>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 text-sm">
          {(["build", "review", "submit"] as const).map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (
                    step === "build" ||
                    (step === "review" && selectedArray.length > 0) ||
                    (step === "submit" && state.step === "submit")
                  ) {
                    dispatch({ type: "SET_STEP", step });
                  }
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  state.step === step
                    ? "bg-red-600 text-white"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {i + 1}
              </button>
              <span
                className={`hidden sm:inline ${
                  state.step === step
                    ? "font-medium text-white"
                    : "text-white/40"
                }`}
              >
                {step === "build"
                  ? pt("mode.custom")
                  : step === "review"
                    ? pt("review.title")
                    : pt("contact.title")}
              </span>
              {i < 2 && (
                <div className="mx-2 h-px w-8 bg-white/10 sm:w-16" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* BUILD STEP */}
        {state.step === "build" && (
          <>
            {/* Package Selector */}
            <PackageSelector
              activePackage={state.activePackage}
              locale={locale}
              onSelect={(pkgId) => {
                if (pkgId) {
                  dispatch({ type: "SELECT_PACKAGE", packageId: pkgId });
                } else {
                  dispatch({ type: "CLEAR_PACKAGE" });
                }
                dispatch({ type: "SET_MODE", mode: "custom" });
              }}
            />

            {/* Category tabs — full width, wrapping on mobile */}
            <div className="mt-8">
              <CategoryTabs
                activeCategory={state.activeCategory}
                locale={locale}
                selectedServices={state.selectedServices}
                onSelect={(cat) =>
                  dispatch({ type: "SET_CATEGORY", category: cat })
                }
              />
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_380px]">
              {/* Left: Service cards + custom items */}
              <div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      locale={locale}
                      selected={state.selectedServices.has(service.id)}
                      quantity={
                        state.selectedServices.get(service.id)?.quantity ?? 1
                      }
                      onToggle={() =>
                        dispatch({
                          type: "TOGGLE_SERVICE",
                          serviceId: service.id,
                        })
                      }
                      onQuantityChange={(qty) =>
                        dispatch({
                          type: "SET_QUANTITY",
                          serviceId: service.id,
                          quantity: qty,
                        })
                      }
                    />
                  ))}
                </div>

                {/* Custom items */}
                <div className="mt-8">
                  <CustomItemsEditor
                    items={state.customLineItems}
                    locale={locale}
                    onAdd={(item) =>
                      dispatch({ type: "ADD_CUSTOM_ITEM", item })
                    }
                    onRemove={(id) =>
                      dispatch({
                        type: "REMOVE_CUSTOM_ITEM",
                        itemId: id,
                      })
                    }
                  />
                </div>
              </div>

              {/* Right: Summary sidebar */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <ProposalSummary
                  selectedServices={selectedArray}
                  customLineItems={state.customLineItems}
                  discount={state.discount}
                  locale={locale}
                  totals={totals}
                  onContinue={() =>
                    dispatch({ type: "SET_STEP", step: "review" })
                  }
                  onClear={() => dispatch({ type: "RESET" })}
                  onRemoveService={(id) =>
                    dispatch({ type: "TOGGLE_SERVICE", serviceId: id })
                  }
                />
              </div>
            </div>
          </>
        )}

        {/* REVIEW STEP */}
        {state.step === "review" && (
          <ReviewStep
            selectedServices={selectedArray}
            customLineItems={state.customLineItems}
            discount={state.discount}
            locale={locale}
            totals={totals}
            onBack={() => dispatch({ type: "SET_STEP", step: "build" })}
            onContinue={() =>
              dispatch({ type: "SET_STEP", step: "submit" })
            }
          />
        )}

        {/* CONTACT / SUBMIT STEP */}
        {state.step === "submit" && (
          <ContactStep
            contact={state.contact}
            referredBy={state.referredBy}
            locale={locale}
            isSubmitting={state.isSubmitting}
            submitError={state.submitError}
            submitResult={state.submitResult}
            totals={totals}
            serviceCount={selectedArray.length + state.customLineItems.length}
            onUpdateContact={(field, value) =>
              dispatch({ type: "UPDATE_CONTACT", field, value })
            }
            onSetReferredBy={(v) =>
              dispatch({ type: "SET_REFERRED_BY", value: v })
            }
            onSubmit={handleSubmit}
            onBack={() => dispatch({ type: "SET_STEP", step: "review" })}
            onReset={() => dispatch({ type: "RESET" })}
          />
        )}
      </div>
    </div>
  );
}
