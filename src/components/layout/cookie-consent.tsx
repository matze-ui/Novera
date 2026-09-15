"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useExternalValue } from "@/lib/use-external-value";

const CONSENT_KEY = "novera.cookieConsent.v1";
export const CONSENT_EVENT = "novera:consent-changed";

export type ConsentState = "accepted-all" | "essential-only";

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw === "accepted-all" || raw === "essential-only" ? raw : null;
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState) {
  try {
    window.localStorage.setItem(CONSENT_KEY, state);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

/**
 * NOVERA currently loads no non-essential analytics or marketing scripts.
 * This banner exists so the consent architecture is in place before any
 * such script is added — nothing beyond essential, functional storage
 * (like saved properties) runs regardless of the choice made here.
 */
export function CookieConsent() {
  const visible = useExternalValue(() => readConsent() === null, CONSENT_EVENT, false);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-4 backdrop-blur-sm sm:p-6"
    >
      <div className="novera-container flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          NOVERA uses only essential, functional storage today (for example to remember
          saved properties on this device). No analytics or marketing cookies are loaded.
          See our{" "}
          <Link href="/cookie-settings" className="text-graphite underline hover:text-signal">
            cookie settings
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="ghost" size="sm" onClick={() => writeConsent("essential-only")}>
            Essential only
          </Button>
          <Button size="sm" onClick={() => writeConsent("accepted-all")}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
