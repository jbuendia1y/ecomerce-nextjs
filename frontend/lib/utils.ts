import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPaginateParams(params: URLSearchParams) {
  return {
    page: parseInt(params.get("page") ?? "1"),
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

/**
 * Formats date to a display string date
 * @param date
 * @returns
 */
export function displayDate(date: string | Date): string {
  let _date: Date;
  if (typeof date === "string") _date = new Date(date);
  else _date = date;

  const formatter = new Intl.DateTimeFormat();
  return formatter.format(_date);
}
