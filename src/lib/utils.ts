import type { Property } from "./types";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(property: Pick<Property, "price" | "priceUnit">): string {
  const amount = new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(property.price);
  return property.priceUnit === "month" ? `${amount} / month` : amount;
}

export function formatSize(size: number): string {
  return `${size} m²`;
}

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "Apartment",
  house: "House",
  penthouse: "Penthouse",
  studio: "Studio",
  loft: "Loft",
  "new-development": "New development",
};

export function propertyTypeLabel(type: string): string {
  return PROPERTY_TYPE_LABELS[type] ?? type;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Same as formatDate but with the full month name, for confirmation copy. */
export function formatDateLong(iso: string): string {
  if (!iso) return "date to be confirmed";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
