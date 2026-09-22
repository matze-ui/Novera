/**
 * Understudy is pre-launch. Everything here that isn't a hard-coded brand
 * string is intentionally blank until a real value exists — the UI checks
 * for that and degrades to the waitlist form rather than rendering a dead
 * mailto: link or a fake address.
 */

export const SITE_NAME = "Understudy";
export const SITE_TAGLINE = "It learns the job. Then it does the job.";

export const SITE_DESCRIPTION =
  "Understudy builds AI automations that shadow how your team actually works, rehearse against your real cases, then run the workflow end to end — with an audit trail and a human escalation path.";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Set NEXT_PUBLIC_CONTACT_EMAIL to show a direct contact link in the footer. */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

/** Set NEXT_PUBLIC_COMPANY_LEGAL_NAME once the entity is registered. */
export const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || "";

export const LAUNCH_WINDOW = "first pilots, Q1 2027";

/**
 * Where the waitlist forms post.
 *
 * Defaults to this app's own API route. Set it to an external form endpoint
 * when the app is deployed somewhere that can't run server code (a static
 * host such as GitHub Pages), or set it to an empty string to render the
 * forms as "not open yet" — which is what a static build does, rather than
 * showing an input that silently fails.
 */
export const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "/api/waitlist";

/**
 * Company identity for the Impressum (§ 5 ECG, § 25 MedienG) and the privacy
 * policy. All of it is intentionally blank until real values exist — the
 * legal pages render a visible "not yet configured" marker for anything
 * missing rather than inventing plausible-looking company data, which on a
 * legal page would be worse than an obvious gap.
 */
export const LEGAL = {
  /** Registered name, or your own name if you trade as a sole proprietor. */
  name: process.env.NEXT_PUBLIC_LEGAL_NAME || "",
  /** Street, postcode, city, country. */
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "",
  email: process.env.NEXT_PUBLIC_LEGAL_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_LEGAL_PHONE || "",
  /** VAT ID, e.g. ATU12345678. Only if VAT-registered. */
  vatId: process.env.NEXT_PUBLIC_LEGAL_VAT_ID || "",
  /** Firmenbuchnummer, e.g. FN 123456a. Only if entered in the register. */
  registerNumber: process.env.NEXT_PUBLIC_LEGAL_REGISTER_NUMBER || "",
  /** Firmenbuchgericht, e.g. Handelsgericht Wien. */
  registerCourt: process.env.NEXT_PUBLIC_LEGAL_REGISTER_COURT || "",
  /** Person(s) authorised to represent the company. */
  representative: process.env.NEXT_PUBLIC_LEGAL_REPRESENTATIVE || "",
  /** Chamber membership, e.g. WKO Wien. */
  chamber: process.env.NEXT_PUBLIC_LEGAL_CHAMBER || "",
  /** Trade authority, e.g. Magistratisches Bezirksamt des I. Bezirks. */
  authority: process.env.NEXT_PUBLIC_LEGAL_AUTHORITY || "",
  /** Where the waitlist database physically lives, e.g. "Frankfurt, Germany". */
  dataRegion: process.env.NEXT_PUBLIC_LEGAL_DATA_REGION || "",
  /** Who hosts the site, e.g. "Vercel Inc.". Named as a processor. */
  hostingProvider: process.env.NEXT_PUBLIC_LEGAL_HOSTING_PROVIDER || "",
} as const;

/** The fields without which an Austrian Impressum is not valid. */
export const IMPRESSUM_REQUIRED = ["name", "address", "email"] as const;

export function impressumMissingFields(): string[] {
  return IMPRESSUM_REQUIRED.filter((k) => !LEGAL[k]);
}
