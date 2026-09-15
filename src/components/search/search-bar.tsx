"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const propertyTypes = [
  { value: "any", label: "Any type" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
  { value: "loft", label: "Loft" },
  { value: "new-development", label: "New development" },
];

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [listingType, setListingType] = useState<"rent" | "buy">("rent");
  const [location, setLocation] = useState("Vienna");
  const [budget, setBudget] = useState("2000");
  const [propertyType, setPropertyType] = useState("any");
  const [bedrooms, setBedrooms] = useState("any");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("listingType", listingType);
    if (location) params.set("location", location);
    if (budget) params.set("maxBudget", budget);
    if (propertyType !== "any") params.set("propertyType", propertyType);
    if (bedrooms !== "any") params.set("bedrooms", bedrooms);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full rounded-2xl border border-line bg-white p-3 shadow-[0_20px_60px_-30px_rgba(17,19,24,0.35)] sm:p-4",
        className,
      )}
    >
      <div className="mb-3 flex gap-1 rounded-full bg-line-soft p-1 text-sm font-medium w-fit">
        {(["rent", "buy"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setListingType(type)}
            aria-pressed={listingType === type}
            className={cn(
              "rounded-full px-4 py-1.5 transition-colors",
              listingType === type ? "bg-graphite text-white" : "text-muted hover:text-graphite",
            )}
          >
            {type === "rent" ? "Rent" : "Buy"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            Where do you want to live?
          </span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, district or postal code"
            className="w-full rounded-xl border border-line px-3 py-2.5 text-sm text-graphite outline-none focus:border-signal"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            Max budget ({listingType === "rent" ? "€/month" : "€"})
          </span>
          <input
            type="number"
            min={0}
            step={50}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-xl border border-line px-3 py-2.5 text-sm text-graphite outline-none focus:border-signal"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Property type</span>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-graphite outline-none focus:border-signal"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Bedrooms</span>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-graphite outline-none focus:border-signal"
          >
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>

        <div className="flex items-end">
          <Button type="submit" size="md" className="w-full justify-center lg:w-auto">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
