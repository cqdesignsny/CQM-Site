import type { SiteLocale } from "@/lib/i18n/types";

/** Re-export SiteLocale as Locale for backward compatibility across proposal/assessment code */
export type Locale = SiteLocale;

export type ServiceCategory =
  | "strategy"
  | "website"
  | "ecommerce"
  | "social-media"
  | "content"
  | "video-production"
  | "email"
  | "seo"
  | "ads"
  | "ai-automation";

export type BillingType = "one-time" | "monthly";

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  name_es: string;
  name_fr: string;
  description: string;
  description_es: string;
  description_fr: string;
  price: number;
  priceMax?: number;
  billing: BillingType;
  quantifiable: boolean;
  unit?: string;
  unit_es?: string;
  unit_fr?: string;
  note?: string;
  note_es?: string;
  note_fr?: string;
  triggersHosting: boolean;
}

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  name_es: string;
  name_fr: string;
  icon: string;
}

export interface SelectedService {
  serviceId: string;
  quantity: number;
  unitPrice: number;
  billing: BillingType;
}

export interface CustomLineItem {
  id: string;
  name: string;
  price: number;
  billing: BillingType;
}

export interface Discount {
  type: "percentage" | "flat";
  value: number;
}

export interface PackageInfo {
  id: string;
  name: string;
  name_es: string;
  name_fr: string;
  tagline: string;
  tagline_es: string;
  tagline_fr: string;
  price: number;
  popular?: boolean;
  description: string;
  description_es: string;
  description_fr: string;
  features: string[];
  features_es: string[];
  features_fr: string[];
  serviceIds?: string[];
}

export interface ProposalContact {
  name: string;
  email: string;
  phone: string;
}

export type ProposalStatus =
  | "new"
  | "contacted"
  | "negotiating"
  | "won"
  | "lost";

export interface Proposal {
  id: string;
  parentId: string | null;
  version: number;
  locale: Locale;
  contact: ProposalContact;
  referredBy: string | null;
  status: ProposalStatus;
  selectedServices: SelectedService[];
  customLineItems: CustomLineItem[];
  packageId: string | null;
  oneTimeTotal: number;
  monthlyTotal: number;
  hostingFee: number;
  discountType: "percentage" | "flat" | null;
  discountValue: number | null;
  discountAmount: number;
  grandTotal: number;
  notionPageId: string | null;
  createdAt: string;
  acceptedAt: string | null;
  updatedAt: string;
}

export interface AssessmentAnswer {
  questionId: string;
  selectedOptionIndex: number;
  score: number;
}

export interface CategoryScore {
  category: ServiceCategory;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  id: string;
  contact: ProposalContact;
  answers: AssessmentAnswer[];
  categoryScores: CategoryScore[];
  overallScore: number;
  recommendedServiceIds: string[];
  locale: Locale;
  proposalId: string | null;
  notionPageId: string | null;
  createdAt: string;
}
