import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPaginateParams(params: URLSearchParams) {
  return {
    page: parseInt(params.get("page") ?? "0"),
  };
}

/**
 * Converts a database integer to decimal value to display in UI
 * @param price
 * @returns Decimal Number
 */
export function displayPrice(price: number) {
  return (price / 100).toFixed(2);
}
