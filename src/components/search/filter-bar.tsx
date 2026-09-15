"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { SearchFilters, SortOption } from "@/lib/search";
import { ALL_FEATURES, SORT_LABELS } from "@/lib/search";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { saveSearch } from "@/lib/saved-searches";

const propertyTypes = [
  { value: "any", label: "Any type" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
  { value: "loft", label: "Loft" },
  { value: "new-development", label: "New development" },
];

export function FilterBar({ filters }: { filters: SearchFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [location, setLocation] = useState(filters.location);
  const [minPrice, setMinPrice] = useState(String(filters.minPrice || ""));
  const [maxPrice, setMaxPrice] = useState(String(filters.maxPrice === 5_000_000 ? "" : filters.maxPrice));
  const [propertyType, setPropertyType] = useState(filters.propertyType);
  const [bedrooms, setBedrooms] = useState(String(filters.bedrooms));
  const [bathrooms, setBathrooms] = useState(String(filters.bathrooms));
  const [minSize, setMinSize] = useState(String(filters.minSize || ""));
  const [features, setFeatures] = useState<string[]>(filters.features);
  const [savedMessage, setSavedMessage] = useState(false);

  function applyParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === "" || value === "any") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    router.push(`/search?${params.toString()}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    applyParams({
      location,
      minPrice,
      maxPrice,
      propertyType,
      bedrooms: bedrooms === "any" ? undefined : bedrooms,
      bathrooms: bathrooms === "any" ? undefined : bathrooms,
      minSize,
      features: features.join(","),
    });
  }

  function setListingType(type: "rent" | "buy") {
    applyParams({ listingType: type });
  }

  function setSort(sort: SortOption) {
    applyParams({ sort });
  }

  function toggleFeature(feature: string) {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature],
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div className="mb-4 flex gap-1 rounded-full bg-line-soft p-1 text-sm font-medium w-fit">
        {(["rent", "buy"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setListingType(type)}
            aria-pressed={filters.listingType === type}
            className={cn(
              "rounded-full px-4 py-1.5 transition-colors",
              filters.listingType === type
                ? "bg-graphite text-white"
                : "text-muted hover:text-graphite",
            )}
          >
            {type === "rent" ? "Rent" : "Buy"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Location</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, district or postal code"
            className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Property type</span>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value as typeof propertyType)}
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-signal"
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
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-signal"
          >
            <option value="any">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <Button type="submit" className="w-full justify-center">
            Update results
          </Button>
        </div>
      </form>

      <button
        type="button"
        onClick={() => setAdvancedOpen((v) => !v)}
        aria-expanded={advancedOpen}
        className="mt-4 text-sm font-medium text-signal hover:text-signal-dark"
      >
        {advancedOpen ? "Hide advanced filters" : "Advanced filters"}
      </button>

      {advancedOpen && (
        <form onSubmit={handleSubmit} className="mt-4 border-t border-line pt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Min price</span>
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Max price</span>
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Bathrooms</span>
              <select
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-signal"
              >
                <option value="any">Any</option>
                {[1, 2, 3].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Min size (m²)</span>
              <input
                type="number"
                min={0}
                value={minSize}
                onChange={(e) => setMinSize(e.target.value)}
                className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
              />
            </label>
          </div>

          <div className="mt-4">
            <span className="mb-2 block text-xs font-medium text-muted">Features</span>
            <div className="flex flex-wrap gap-2">
              {ALL_FEATURES.map((feature) => (
                <button
                  type="button"
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  aria-pressed={features.includes(feature)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    features.includes(feature)
                      ? "border-signal bg-signal-tint text-signal-dark"
                      : "border-line text-muted hover:border-graphite hover:text-graphite",
                  )}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" size="sm" className="mt-4">
            Apply filters
          </Button>
        </form>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort by
          <select
            value={filters.sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm text-graphite outline-none focus:border-signal"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            const label = `${filters.listingType === "rent" ? "Rent" : "Buy"} · ${filters.location || "Any location"}`;
            saveSearch(label, searchParams.toString());
            setSavedMessage(true);
            setTimeout(() => setSavedMessage(false), 2000);
          }}
          className="text-sm font-medium text-signal hover:text-signal-dark"
        >
          {savedMessage ? "Search saved ✓" : "Save this search"}
        </button>
      </div>
    </div>
  );
}
