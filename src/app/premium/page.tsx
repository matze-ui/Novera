import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "NOVERA Premium",
  description: "Compare NOVERA Free and NOVERA Premium for property seekers.",
  alternates: { canonical: "/premium" },
};

const freeFeatures = [
  "Browse and search all active properties",
  "Basic filters (location, budget, type, bedrooms)",
  "Public property pages",
  "Basic NOVERA Match scoring",
];

const premiumFeatures = [
  "Advanced matching with finer-grained preferences",
  "Unlimited saved properties",
  "Unlimited saved searches",
  "Personalized alerts for new matches",
  "Advanced filters (features, availability, size ranges)",
  "Early access to selected new listings",
  "Enhanced recommendations",
  "Priority viewing requests where the owner supports it",
];

export default function PremiumPage() {
  return (
    <div className="py-10 sm:py-14">
      <Container className="max-w-4xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            NOVERA Premium
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-graphite sm:text-4xl">
            Unlock NOVERA Premium
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            NOVERA is free to browse, search and match. Premium adds more control for
            seekers who are actively looking.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Badge tone="warning">Payments not yet connected</Badge>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-8">
            <h2 className="text-lg font-semibold text-graphite">Free</h2>
            <p className="mt-1 text-3xl font-semibold text-graphite">€0</p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f) => (
                <FeatureRow key={f} label={f} />
              ))}
            </ul>
            <Button href="/search" variant="ghost" className="mt-8 w-full justify-center">
              Continue with Free
            </Button>
          </div>

          <div className="relative rounded-2xl border-2 border-signal bg-white p-8">
            <span className="absolute -top-3 right-6 rounded-full bg-signal px-3 py-1 text-xs font-semibold text-white">
              Recommended
            </span>
            <h2 className="text-lg font-semibold text-graphite">Premium</h2>
            <p className="mt-1 text-3xl font-semibold text-graphite">
              Price to be announced
            </p>
            <ul className="mt-6 space-y-3">
              {premiumFeatures.map((f) => (
                <FeatureRow key={f} label={f} highlight />
              ))}
            </ul>
            <Button disabled className="mt-8 w-full justify-center">
              Coming soon
            </Button>
            <p className="mt-3 text-center text-xs text-muted-soft">
              Premium isn&rsquo;t billable yet — no payment is collected, and nothing here
              simulates a completed purchase. Payments will be added through Stripe or a
              similar provider before this goes live.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

function FeatureRow({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={
          highlight
            ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-white"
            : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-line-soft text-muted"
        }
        aria-hidden="true"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M1.5 5.2 3.7 7.5 8.5 2.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm text-graphite">{label}</span>
    </li>
  );
}
