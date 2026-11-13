import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number | null | undefined, currency: string = "INR"): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "Price on request";
  }
  return currencyFormatter.format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSec < 60) return "Just now";
    if (diffInSec < 3600) return `${Math.floor(diffInSec / 60)}m ago`;
    if (diffInSec < 86400) return `${Math.floor(diffInSec / 3600)}h ago`;
    if (diffInSec < 604800) return `${Math.floor(diffInSec / 86400)}d ago`;
    return formatDate(dateString);
  } catch {
    return dateString;
  }
}
