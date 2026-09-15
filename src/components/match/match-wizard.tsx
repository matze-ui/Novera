"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { PropertyGrid } from "@/components/property/property-grid";
import { MatchBreakdown } from "@/components/property/match-breakdown";
import { ALL_FEATURES } from "@/lib/search";
import { DEFAULT_MATCH_PREFERENCES, matchProperties } from "@/lib/match";
import { demoProperties } from "@/lib/demo-properties";
import type { MatchPreferences } from "@/lib/types";
import { cn, propertyTypeLabel } from "@/lib/utils";

const steps = ["Location", "Budget", "Type", "Size & features", "Timing", "Your details", "Your matches"];
const DETAILS_STEP = 5;
const RESULTS_STEP = 6;

const propertyTypes: Array<{ value: MatchPreferences["propertyType"]; label: string }> = [
  { value: "any", label: "Any type" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
  { value: "loft", label: "Loft" },
  { value: "new-development", label: "New development" },
];

const timeframes = ["As soon as possible", "Within 3 months", "Within 6 months", "Just browsing"];

function summarizePreferences(prefs: MatchPreferences): string {
  const parts = [
    prefs.listingType === "rent" ? "Rent" : "Buy",
    prefs.location || "any location",
    `€${prefs.minBudget.toLocaleString("en-US")}–€${prefs.maxBudget.toLocaleString("en-US")}`,
    prefs.propertyType === "any" ? "any property type" : propertyTypeLabel(prefs.propertyType),
    prefs.bedrooms === "any" ? "any bedrooms" : `${prefs.bedrooms}+ bed`,
    `min ${prefs.minSize} m²`,
    prefs.features.length > 0 ? prefs.features.join(", ") : "no specific features",
    prefs.timeframe,
  ];
  return parts.join(" · ");
}

type SubmitStatus = "idle" | "submitting" | "error";

export function MatchWizard() {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState<MatchPreferences>(DEFAULT_MATCH_PREFERENCES);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isResults = step === RESULTS_STEP;
  const results = isResults ? matchProperties(prefs, demoProperties) : [];

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleFeature(feature: string) {
    setPrefs((p) => ({
      ...p,
      features: p.features.includes(feature)
        ? p.features.filter((f) => f !== feature)
        : [...p.features, feature],
    }));
  }

  async function submitAndAdvance() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "match",
          name,
          email,
          phone,
          propertyTitle: "NOVERA Match request",
          requirements: summarizePreferences(prefs),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("idle");
      next();
    } catch {
      setStatus("error");
    }
  }

  function handleDetailsFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    void submitAndAdvance();
  }

  if (isResults) {
    const top = results[0];
    return (
      <div>
        <Stepper steps={steps} currentStep={step} />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-graphite">Your NOVERA matches</h2>
          <button
            type="button"
            onClick={() => setStep(0)}
            className="text-sm font-medium text-signal hover:text-signal-dark"
          >
            Edit preferences
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">
          {results.length} {results.length === 1 ? "property" : "properties"} ranked by fit to
          what you told us. Our team has your details and will follow up personally if
          something closer to your needs comes up.
        </p>

        {results.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="font-semibold text-graphite">Nothing matches yet</p>
            <p className="mt-2 text-sm text-muted">
              We&rsquo;ve saved your requirements and will reach out as soon as something fits.
              In the meantime, try widening your budget or location.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
            <PropertyGrid
              properties={results.map((r) => r.property)}
              matchScores={Object.fromEntries(results.map((r) => [r.property.slug, r.score]))}
            />
            {top && (
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="mb-3 text-sm font-semibold text-graphite">
                  Top match: {top.property.title}
                </p>
                <MatchBreakdown score={top.score} breakdown={top.breakdown} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Stepper steps={steps} currentStep={step} />

      <div className="mt-10 max-w-xl">
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-graphite">What are you looking for?</h2>
            <div className="flex gap-1 rounded-full bg-line-soft p-1 text-sm font-medium w-fit">
              {(["rent", "buy"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPrefs((p) => ({ ...p, listingType: type }))}
                  aria-pressed={prefs.listingType === type}
                  className={cn(
                    "rounded-full px-4 py-1.5 transition-colors",
                    prefs.listingType === type
                      ? "bg-graphite text-white"
                      : "text-muted hover:text-graphite",
                  )}
                >
                  {type === "rent" ? "Rent" : "Buy"}
                </button>
              ))}
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-graphite">Location</span>
              <input
                type="text"
                value={prefs.location}
                onChange={(e) => setPrefs((p) => ({ ...p, location: e.target.value }))}
                placeholder="City, district or postal code"
                className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-signal"
              />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-graphite">What&rsquo;s your budget?</h2>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-graphite">Minimum</span>
                <input
                  type="number"
                  min={0}
                  value={prefs.minBudget}
                  onChange={(e) => setPrefs((p) => ({ ...p, minBudget: Number(e.target.value) }))}
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-signal"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-graphite">Maximum</span>
                <input
                  type="number"
                  min={0}
                  value={prefs.maxBudget}
                  onChange={(e) => setPrefs((p) => ({ ...p, maxBudget: Number(e.target.value) }))}
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-signal"
                />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-graphite">Property type & bedrooms</h2>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-graphite">Property type</span>
              <select
                value={prefs.propertyType}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, propertyType: e.target.value as MatchPreferences["propertyType"] }))
                }
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-signal"
              >
                {propertyTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-graphite">Bedrooms</span>
              <select
                value={prefs.bedrooms}
                onChange={(e) =>
                  setPrefs((p) => ({
                    ...p,
                    bedrooms: e.target.value === "any" ? "any" : Number(e.target.value),
                  }))
                }
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-signal"
              >
                <option value="any">Any</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-graphite">Size & features</h2>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-graphite">Minimum size (m²)</span>
              <input
                type="number"
                min={0}
                value={prefs.minSize}
                onChange={(e) => setPrefs((p) => ({ ...p, minSize: Number(e.target.value) }))}
                className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-signal"
              />
            </label>
            <div>
              <span className="mb-2 block text-sm font-medium text-graphite">Must-have features</span>
              <div className="flex flex-wrap gap-2">
                {ALL_FEATURES.map((feature) => (
                  <button
                    type="button"
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    aria-pressed={prefs.features.includes(feature)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      prefs.features.includes(feature)
                        ? "border-signal bg-signal-tint text-signal-dark"
                        : "border-line text-muted hover:border-graphite hover:text-graphite",
                    )}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-graphite">When do you want to move?</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {timeframes.map((tf) => (
                <button
                  type="button"
                  key={tf}
                  onClick={() => setPrefs((p) => ({ ...p, timeframe: tf }))}
                  aria-pressed={prefs.timeframe === tf}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                    prefs.timeframe === tf
                      ? "border-signal bg-signal-tint text-signal-dark"
                      : "border-line text-graphite hover:border-graphite",
                  )}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === DETAILS_STEP && (
          <form onSubmit={handleDetailsFormSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-graphite">Where should we send your matches?</h2>
              <p className="mt-2 text-sm text-muted">
                A member of the NOVERA team will follow up personally, especially if nothing
                on the site fits yet.
              </p>
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-graphite">Full name</span>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-signal"
              />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-graphite">Email</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-signal"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-graphite">Phone (optional)</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-signal"
                />
              </label>
            </div>
            {status === "error" && (
              <p className="text-sm text-red-600" role="alert">
                Something went wrong sending your details. Please try again.
              </p>
            )}
          </form>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 0}>
          Back
        </Button>
        {step === DETAILS_STEP ? (
          <Button
            onClick={() => void submitAndAdvance()}
            disabled={status === "submitting" || !name || !email}
          >
            {status === "submitting" ? "Sending…" : "See my matches"}
          </Button>
        ) : (
          <Button onClick={next}>Continue</Button>
        )}
      </div>
    </div>
  );
}
