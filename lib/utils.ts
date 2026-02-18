import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx (for conditional classes) and tailwind-merge (for conflict resolution)
 *
 * Why this approach?
 * - clsx: Handles conditional/boolean class names elegantly
 * - tailwind-merge: Resolves Tailwind class conflicts (e.g., p-4 vs p-6 → keeps p-6)
 * - Together: Clean, predictable class merging for component variants
 *
 * @param inputs - Class names to merge (strings, objects, arrays, booleans)
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * cn("px-2 py-1", "px-4") // Returns "py-1 px-4" (px-2 is overridden)
 * cn("bg-red", { "bg-blue": isActive }) // Returns "bg-blue" if isActive is true
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

