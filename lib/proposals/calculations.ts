import type { SelectedService, CustomLineItem, Discount, Locale } from "./types";
import { SERVICES, HOSTING_FEE, needsHostingFee } from "./services-data";

export function calculateOneTimeTotal(
  services: SelectedService[],
  customItems: CustomLineItem[]
): number {
  const servicesTotal = services
    .filter((s) => s.billing === "one-time")
    .reduce((sum, s) => sum + s.unitPrice * s.quantity, 0);

  const customTotal = customItems
    .filter((i) => i.billing === "one-time")
    .reduce((sum, i) => sum + i.price, 0);

  return servicesTotal + customTotal;
}

export function calculateMonthlyTotal(
  services: SelectedService[],
  customItems: CustomLineItem[]
): number {
  const servicesTotal = services
    .filter((s) => s.billing === "monthly")
    .reduce((sum, s) => sum + s.unitPrice * s.quantity, 0);

  const customTotal = customItems
    .filter((i) => i.billing === "monthly")
    .reduce((sum, i) => sum + i.price, 0);

  return servicesTotal + customTotal;
}

export function calculateHostingFee(selectedServiceIds: string[]): number {
  // Auto-add $50/mo hosting if any website/ecommerce build service is selected
  // but only if the user hasn't already explicitly selected website-hosting
  if (selectedServiceIds.includes("website-hosting")) {
    return 0; // Already included as a selected service
  }
  return needsHostingFee(selectedServiceIds) ? HOSTING_FEE : 0;
}

export function calculateDiscountAmount(
  subtotal: number,
  discount: Discount | null
): number {
  if (!discount || discount.value <= 0) return 0;

  if (discount.type === "percentage") {
    const clamped = Math.min(discount.value, 100);
    return Math.round(subtotal * (clamped / 100) * 100) / 100;
  }

  // Flat discount capped at subtotal
  return Math.min(discount.value, subtotal);
}

export function calculateGrandTotal(
  oneTimeTotal: number,
  monthlyTotal: number,
  hostingFee: number,
  discountAmount: number
): number {
  // Grand total = one-time investment + first month recurring + hosting - discount
  return Math.max(0, oneTimeTotal + monthlyTotal + hostingFee - discountAmount);
}

export function calculateAllTotals(
  services: SelectedService[],
  customItems: CustomLineItem[],
  discount: Discount | null
) {
  const selectedServiceIds = services.map((s) => s.serviceId);
  const oneTimeTotal = calculateOneTimeTotal(services, customItems);
  const monthlyTotal = calculateMonthlyTotal(services, customItems);
  const hostingFee = calculateHostingFee(selectedServiceIds);
  const subtotal = oneTimeTotal + monthlyTotal + hostingFee;
  const discountAmount = calculateDiscountAmount(subtotal, discount);
  const grandTotal = calculateGrandTotal(
    oneTimeTotal,
    monthlyTotal,
    hostingFee,
    discountAmount
  );

  return {
    oneTimeTotal,
    monthlyTotal,
    hostingFee,
    subtotal,
    discountAmount,
    grandTotal,
  };
}

export function formatCurrency(amount: number, _locale: Locale = "en"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getServiceName(
  serviceId: string,
  locale: Locale
): string {
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) return serviceId;
  return locale === "es" ? service.name_es : locale === "fr" ? service.name_fr : service.name;
}

export function getServiceDescription(
  serviceId: string,
  locale: Locale
): string {
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) return "";
  return locale === "es" ? service.description_es : locale === "fr" ? service.description_fr : service.description;
}
