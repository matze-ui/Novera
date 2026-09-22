/**
 * Central business and legal-notice configuration.
 *
 * Two ways to fill these in, in order of precedence:
 *
 *   1. Environment variables at build time (NEXT_PUBLIC_BUSINESS_*), useful
 *      for values that differ per deployment.
 *   2. The committed fallbacks below, for details that are simply facts about
 *      the business and belong in the repository.
 *
 * Anything still unset stays `null`. Every place that renders contact or
 * legal-notice details checks for `null` and either omits the line or falls
 * back to an honest "to be added" state, instead of inventing a value.
 */

function detail(fromEnv: string | undefined, committed: string | null = null): string | null {
  return fromEnv?.trim() || committed;
}

export const BUSINESS_EMAIL = detail(process.env.NEXT_PUBLIC_BUSINESS_EMAIL);
export const BUSINESS_PHONE = detail(process.env.NEXT_PUBLIC_BUSINESS_PHONE);
export const BUSINESS_ADDRESS = detail(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS);

/** Legal name including the legal form, e.g. "Novera GmbH". */
export const BUSINESS_LEGAL_NAME = detail(process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME);
/** Commercial register entry, e.g. "FN 123456a, Handelsgericht Wien". Empty for a sole trader. */
export const BUSINESS_REGISTER = detail(process.env.NEXT_PUBLIC_BUSINESS_REGISTER);
/** VAT identification number, e.g. "ATU12345678". Empty below the small-business threshold. */
export const BUSINESS_VAT_ID = detail(process.env.NEXT_PUBLIC_BUSINESS_VAT_ID);
/** Person responsible for the content, e.g. "Matthias Muster, Geschäftsführer". */
export const BUSINESS_REPRESENTATIVE = detail(process.env.NEXT_PUBLIC_BUSINESS_REPRESENTATIVE);
/** Trade authority, e.g. "Magistrat der Stadt Wien". Only where a trade licence applies. */
export const BUSINESS_AUTHORITY = detail(process.env.NEXT_PUBLIC_BUSINESS_AUTHORITY);
/** Chamber membership, e.g. "Wirtschaftskammer Wien, Fachgruppe Immobilientreuhänder". */
export const BUSINESS_CHAMBER = detail(process.env.NEXT_PUBLIC_BUSINESS_CHAMBER);

/**
 * The details § 5 ECG / § 25 MedienG require of every business, regardless of
 * legal form. The register number, VAT number, trade authority and chamber are
 * not on this list because they do not apply to every business.
 */
export const LEGAL_NOTICE_IS_COMPLETE = Boolean(
  BUSINESS_LEGAL_NAME && BUSINESS_ADDRESS && BUSINESS_EMAIL && BUSINESS_REPRESENTATIVE,
);

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
