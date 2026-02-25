import type {
  SelectedService,
  CustomLineItem,
  Discount,
  BillingType,
} from "./types";
import { getServiceById, PACKAGES } from "./services-data";

export interface ProposalBuilderState {
  mode: "packages" | "custom";
  activeCategory: string;
  selectedServices: Map<string, SelectedService>;
  activePackage: string | null;
  customLineItems: CustomLineItem[];
  discount: Discount | null;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  referredBy: string;
  step: "build" | "review" | "submit";
  isSubmitting: boolean;
  submitResult: { proposalId: string; viewUrl: string } | null;
  submitError: string | null;
  // Assessment pre-population
  assessmentId: string | null;
  assessmentRecommendations: string[] | null;
}

export const initialState: ProposalBuilderState = {
  mode: "packages",
  activeCategory: "strategy",
  selectedServices: new Map(),
  activePackage: null,
  customLineItems: [],
  discount: null,
  contact: { name: "", email: "", phone: "" },
  referredBy: "",
  step: "build",
  isSubmitting: false,
  submitResult: null,
  submitError: null,
  assessmentId: null,
  assessmentRecommendations: null,
};

export type ProposalBuilderAction =
  | { type: "SET_MODE"; mode: "packages" | "custom" }
  | { type: "SET_CATEGORY"; category: string }
  | { type: "TOGGLE_SERVICE"; serviceId: string }
  | { type: "SET_QUANTITY"; serviceId: string; quantity: number }
  | { type: "SELECT_PACKAGE"; packageId: string }
  | { type: "CLEAR_PACKAGE" }
  | {
      type: "ADD_CUSTOM_ITEM";
      item: { name: string; price: number; billing: BillingType };
    }
  | { type: "REMOVE_CUSTOM_ITEM"; itemId: string }
  | {
      type: "UPDATE_CUSTOM_ITEM";
      itemId: string;
      updates: Partial<Pick<CustomLineItem, "name" | "price" | "billing">>;
    }
  | { type: "SET_DISCOUNT"; discount: Discount | null }
  | {
      type: "UPDATE_CONTACT";
      field: "name" | "email" | "phone";
      value: string;
    }
  | { type: "SET_REFERRED_BY"; value: string }
  | { type: "SET_STEP"; step: "build" | "review" | "submit" }
  | { type: "SUBMIT_START" }
  | {
      type: "SUBMIT_SUCCESS";
      result: { proposalId: string; viewUrl: string };
    }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "RESET" }
  | {
      type: "LOAD_RECOMMENDATIONS";
      assessmentId: string;
      serviceIds: string[];
    };

let customItemCounter = 0;

export function proposalBuilderReducer(
  state: ProposalBuilderState,
  action: ProposalBuilderAction
): ProposalBuilderState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.mode };

    case "SET_CATEGORY":
      return { ...state, activeCategory: action.category };

    case "TOGGLE_SERVICE": {
      const next = new Map(state.selectedServices);
      if (next.has(action.serviceId)) {
        next.delete(action.serviceId);
      } else {
        const service = getServiceById(action.serviceId);
        if (service) {
          next.set(action.serviceId, {
            serviceId: action.serviceId,
            quantity: 1,
            unitPrice: service.price,
            billing: service.billing,
          });
        }
      }
      return { ...state, selectedServices: next, activePackage: null };
    }

    case "SET_QUANTITY": {
      const next = new Map(state.selectedServices);
      const existing = next.get(action.serviceId);
      if (existing) {
        next.set(action.serviceId, {
          ...existing,
          quantity: Math.max(1, action.quantity),
        });
      }
      return { ...state, selectedServices: next };
    }

    case "SELECT_PACKAGE": {
      const pkg = PACKAGES.find((p) => p.id === action.packageId);
      if (!pkg) return state;

      // Populate services from package serviceIds
      const next = new Map<string, SelectedService>();
      if (pkg.serviceIds) {
        for (const serviceId of pkg.serviceIds) {
          const service = getServiceById(serviceId);
          if (service) {
            next.set(serviceId, {
              serviceId,
              quantity: 1,
              unitPrice: service.price,
              billing: service.billing,
            });
          }
        }
      }

      return {
        ...state,
        activePackage: action.packageId,
        selectedServices: next,
        mode: "custom",
        // Stay on build step so the user can review selections before continuing
      };
    }

    case "CLEAR_PACKAGE":
      return { ...state, activePackage: null };

    case "ADD_CUSTOM_ITEM": {
      customItemCounter++;
      const newItem: CustomLineItem = {
        id: `custom_${customItemCounter}_${Date.now()}`,
        name: action.item.name,
        price: action.item.price,
        billing: action.item.billing,
      };
      return {
        ...state,
        customLineItems: [...state.customLineItems, newItem],
      };
    }

    case "REMOVE_CUSTOM_ITEM":
      return {
        ...state,
        customLineItems: state.customLineItems.filter(
          (i) => i.id !== action.itemId
        ),
      };

    case "UPDATE_CUSTOM_ITEM":
      return {
        ...state,
        customLineItems: state.customLineItems.map((i) =>
          i.id === action.itemId ? { ...i, ...action.updates } : i
        ),
      };

    case "SET_DISCOUNT":
      return { ...state, discount: action.discount };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contact: { ...state.contact, [action.field]: action.value },
      };

    case "SET_REFERRED_BY":
      return { ...state, referredBy: action.value };

    case "SET_STEP":
      return { ...state, step: action.step };

    case "SUBMIT_START":
      return { ...state, isSubmitting: true, submitError: null };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        submitResult: action.result,
        submitError: null,
      };

    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error,
      };

    case "RESET":
      return { ...initialState };

    case "LOAD_RECOMMENDATIONS": {
      const next = new Map<string, SelectedService>();
      for (const serviceId of action.serviceIds) {
        const service = getServiceById(serviceId);
        if (service) {
          next.set(serviceId, {
            serviceId,
            quantity: 1,
            unitPrice: service.price,
            billing: service.billing,
          });
        }
      }
      return {
        ...state,
        selectedServices: next,
        assessmentId: action.assessmentId,
        assessmentRecommendations: action.serviceIds,
        mode: "custom",
        step: "build",
      };
    }

    default:
      return state;
  }
}
