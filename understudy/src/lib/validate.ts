import type { WaitlistSource } from "@/lib/types";

/**
 * Deliberately permissive. The only thing worth rejecting at this stage is
 * input that clearly isn't an address — real deliverability is confirmed by
 * the double-opt-in email, not by a clever regex. Over-strict patterns
 * reject valid addresses (plus tags, new TLDs, apostrophes) and lose signups.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  email: 254,
  company: 120,
  role: 120,
  useCase: 1200,
} as const;

export const WAITLIST_SOURCES: WaitlistSource[] = ["hero", "closing", "early-access"];

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= LIMITS.email && EMAIL.test(trimmed);
}

/** Trim and hard-cap a free-text field so one request can't bloat the store. */
export function clamp(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
