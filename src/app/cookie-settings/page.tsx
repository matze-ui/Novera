"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { readConsent, writeConsent, CONSENT_EVENT, type ConsentState } from "@/components/layout/cookie-consent";
import { useExternalValue } from "@/lib/use-external-value";

export default function CookieSettingsPage() {
  const consent = useExternalValue<ConsentState | null>(readConsent, CONSENT_EVENT, null);

  return (
    <div className="py-14">
      <Container className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-graphite">Cookie settings</h1>
        <p className="mt-3 text-sm text-muted">
          NOVERA keeps this simple because there isn&rsquo;t much to configure yet: no
          analytics or marketing scripts are loaded on this site today.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-graphite">Essential & functional storage</h2>
              <Badge tone="success">Always on</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">
              Used to remember your cookie choice and, on the account pages, to remember
              properties and searches you&rsquo;ve saved on this device. Nothing here is sent
              to NOVERA or any third party.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-graphite">Analytics</h2>
              <Badge tone="neutral">Not in use</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">
              Not currently loaded. If NOVERA adds analytics in the future, a consent toggle
              will appear here and no analytics script will load before you accept it.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-graphite">Marketing</h2>
              <Badge tone="neutral">Not in use</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">
              Not currently loaded, for the same reason as above.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
          <p className="text-sm text-graphite">
            Current choice:{" "}
            <strong>
              {consent === "accepted-all"
                ? "Accepted"
                : consent === "essential-only"
                  ? "Essential only"
                  : "Not yet chosen"}
            </strong>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" onClick={() => writeConsent("accepted-all")}>
              Accept
            </Button>
            <Button size="sm" variant="ghost" onClick={() => writeConsent("essential-only")}>
              Essential only
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
