/**
 * Central business contact configuration.
 *
 * NOVERA has not yet finalized its business contact details. These are
 * intentionally left unset rather than filled with invented values.
 * Populate via environment variables once real details exist:
 *
 *   NEXT_PUBLIC_BUSINESS_EMAIL
 *   NEXT_PUBLIC_BUSINESS_PHONE
 *   NEXT_PUBLIC_BUSINESS_ADDRESS
 *
 * Every place that renders contact info checks for `null` and falls back
 * to an honest "coming soon" state instead of a dead or fake link.
 */

export const BUSINESS_EMAIL: string | null =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL || null;

export const BUSINESS_PHONE: string | null =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE || null;

export const BUSINESS_ADDRESS: string | null =
  process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || null;

export const SITE_NAME = "NOVERA";
export const SITE_TAGLINE = "Property demand, delivered.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://novera.example";

export function mailtoHref(email: string | null): string | null {
  return email ? `mailto:${email}` : null;
}

export function telHref(phone: string | null): string | null {
  return phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : null;
}
