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
