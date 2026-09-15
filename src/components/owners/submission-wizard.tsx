"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { ALL_FEATURES } from "@/lib/search";
import { cn } from "@/lib/utils";

const steps = ["Goal", "Property", "Contact", "Media", "Review"];

type Goal = "sell" | "rent" | "development";

interface FormState {
  goal: Goal | null;
  propertyType: string;
  location: string;
  price: string;
  size: string;
  bedrooms: string;
  bathrooms: string;
  availability: string;
  features: string[];
  description: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  mediaFileNames: string[];
}

const initialState: FormState = {
  goal: null,
  propertyType: "apartment",
  location: "",
  price: "",
  size: "",
  bedrooms: "",
  bathrooms: "",
  availability: "",
  features: [],
  description: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  mediaFileNames: [],
};

type SubmitStatus = "idle" | "submitting" | "submitted" | "error";

export function SubmissionWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleFeature(feature: string) {
    update(
      "features",
      form.features.includes(feature)
        ? form.features.filter((f) => f !== feature)
        : [...form.features, feature],
    );
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setStatus("submitting");
    const goalLabel =
      form.goal === "sell" ? "Sell" : form.goal === "rent" ? "Rent out" : "Promote a development";
    const propertyTitle = `${goalLabel}: ${form.propertyType} in ${form.location || "location tbc"}`;
    const requirements = [
      `Type: ${form.propertyType}`,
      `Location: ${form.location || "—"}`,
      `Price: ${form.price ? `€${form.price}${form.goal === "rent" ? "/month" : ""}` : "—"}`,
      `Size: ${form.size ? `${form.size} m²` : "—"}`,
      `Bedrooms/Bathrooms: ${form.bedrooms || "—"} / ${form.bathrooms || "—"}`,
      `Availability: ${form.availability || "—"}`,
      `Features: ${form.features.join(", ") || "—"}`,
      form.company ? `Company: ${form.company}` : null,
      `Media files: ${form.mediaFileNames.length}`,
    ]
      .filter(Boolean)
      .join(" · ");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "owner-submission",
          name: form.name,
          email: form.email,
          phone: form.phone,
          propertyTitle,
          requirements,
          message: form.description,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <div className="rounded-2xl border border-line bg-white p-10 text-center">
        <h2 className="text-2xl font-semibold text-graphite">Thanks — we&rsquo;ve got it</h2>
        <p className="mt-3 text-muted">
          Your property has been submitted. A member of the NOVERA team will review the
          details and get back to you to confirm next steps.
        </p>
        <Button href="/for-owners" className="mt-6">
          Back to overview
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Stepper steps={steps} currentStep={step} />

      <div className="mt-10 max-w-xl">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-graphite">What do you want to do?</h2>
            {(
              [
                { value: "sell", label: "Sell a property" },
                { value: "rent", label: "Rent out a property" },
                { value: "development", label: "Promote a development" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => update("goal", option.value)}
                aria-pressed={form.goal === option.value}
                className={cn(
                  "block w-full rounded-xl border px-5 py-4 text-left text-sm font-medium transition-colors",
                  form.goal === option.value
                    ? "border-signal bg-signal-tint text-signal-dark"
                    : "border-line text-graphite hover:border-graphite",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-graphite">Property information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Property type">
                <select
                  value={form.propertyType}
                  onChange={(e) => update("propertyType", e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-signal"
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio</option>
                  <option value="loft">Loft</option>
                  <option value="new-development">New development</option>
                </select>
              </Field>
              <Field label="Location">
                <input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="District, postal code"
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
              <Field label={form.goal === "rent" ? "Price (€/month)" : "Price (€)"}>
                <input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
              <Field label="Size (m²)">
                <input
                  type="number"
                  min={0}
                  value={form.size}
                  onChange={(e) => update("size", e.target.value)}
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
              <Field label="Bedrooms">
                <input
                  type="number"
                  min={0}
                  value={form.bedrooms}
                  onChange={(e) => update("bedrooms", e.target.value)}
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
              <Field label="Bathrooms">
                <input
                  type="number"
                  min={0}
                  value={form.bathrooms}
                  onChange={(e) => update("bathrooms", e.target.value)}
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
              <Field label="Availability" className="sm:col-span-2">
                <input
                  value={form.availability}
                  onChange={(e) => update("availability", e.target.value)}
                  placeholder="e.g. Available from 1 December"
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
            </div>
            <div>
              <span className="mb-2 block text-xs font-medium text-muted">Features</span>
              <div className="flex flex-wrap gap-2">
                {ALL_FEATURES.map((feature) => (
                  <button
                    type="button"
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    aria-pressed={form.features.includes(feature)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      form.features.includes(feature)
                        ? "border-signal bg-signal-tint text-signal-dark"
                        : "border-line text-muted hover:border-graphite hover:text-graphite",
                    )}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Description">
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-graphite">Contact information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
              <Field label="Company (optional)">
                <input
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
              <Field label="Phone">
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
                />
              </Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-graphite">Photos & media</h2>
            <p className="text-sm text-muted">
              Select the files you&rsquo;d like to share. File upload isn&rsquo;t connected
              yet, so we&rsquo;ll follow up by email to collect the actual photos — for now,
              just tell us what you have ready.
            </p>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) =>
                update("mediaFileNames", Array.from(e.target.files ?? []).map((f) => f.name))
              }
              className="block w-full rounded-xl border border-dashed border-line px-3 py-6 text-sm text-muted"
            />
            {form.mediaFileNames.length > 0 && (
              <ul className="space-y-1 text-sm text-graphite">
                {form.mediaFileNames.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-graphite">Review & submit</h2>
            <dl className="divide-y divide-line rounded-xl border border-line">
              {[
                ["Goal", form.goal ?? "—"],
                ["Type", form.propertyType],
                ["Location", form.location || "—"],
                ["Price", form.price || "—"],
                ["Size", form.size ? `${form.size} m²` : "—"],
                ["Bedrooms / Bathrooms", `${form.bedrooms || "—"} / ${form.bathrooms || "—"}`],
                ["Availability", form.availability || "—"],
                ["Features", form.features.join(", ") || "—"],
                ["Contact", `${form.name || "—"} · ${form.email || "—"} · ${form.phone || "—"}`],
                ["Media files selected", String(form.mediaFileNames.length)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right font-medium text-graphite">{value}</dd>
                </div>
              ))}
            </dl>
            {status === "error" && (
              <p className="text-sm text-red-600" role="alert">
                Something went wrong submitting your property. Please try again.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 0}>
          Back
        </Button>
        {step === steps.length - 1 ? (
          <Button onClick={handleSubmit} disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Submit property"}
          </Button>
        ) : (
          <Button onClick={next} disabled={step === 0 && !form.goal}>
            Continue
          </Button>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-soft">
        Prefer email?{" "}
        <Link href="/for-owners" className="text-signal hover:text-signal-dark">
          See other ways to reach NOVERA
        </Link>
        .
      </p>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
