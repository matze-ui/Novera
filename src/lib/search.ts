import type { ListingType, MatchPreferences, Property, PropertyType } from "./types";
import { demoProperties } from "./demo-properties";
import { matchProperty } from "./match";

export type SortOption =
  | "best-match"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "largest";

export interface SearchFilters {
  location: string;
  listingType: ListingType;
  minPrice: number;
  maxPrice: number;
  propertyType: PropertyType | "any";
  bedrooms: number | "any";
  bathrooms: number | "any";
  minSize: number;
  features: string[];
  sort: SortOption;
}

export const ALL_FEATURES = [
  "Balcony",
  "Elevator",
  "Parking",
  "Garden",
  "Terrace",
  "Furnished option",
  "Air conditioning",
  "New build",
];

export const SORT_LABELS: Record<SortOption, string> = {
  "best-match": "Best match",
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  largest: "Largest",
};

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseFilters(params: RawParams): SearchFilters {
  const listingType: ListingType = first(params.listingType) === "buy" ? "buy" : "rent";
  const bedroomsRaw = first(params.bedrooms);
  const bathroomsRaw = first(params.bathrooms);

  return {
    location: first(params.location) ?? "",
    listingType,
    minPrice: Number(first(params.minPrice) ?? 0) || 0,
    maxPrice: Number(first(params.maxBudget) ?? first(params.maxPrice) ?? 5_000_000) || 5_000_000,
    propertyType: (first(params.propertyType) as PropertyType | undefined) ?? "any",
    bedrooms: bedroomsRaw ? Number(bedroomsRaw) : "any",
    bathrooms: bathroomsRaw ? Number(bathroomsRaw) : "any",
    minSize: Number(first(params.minSize) ?? 0) || 0,
    features: first(params.features)?.split(",").filter(Boolean) ?? [],
    sort: (first(params.sort) as SortOption) ?? "best-match",
  };
}

export function filtersToPreferences(filters: SearchFilters): MatchPreferences {
  return {
    location: filters.location,
    listingType: filters.listingType,
    minBudget: filters.minPrice,
    maxBudget: filters.maxPrice,
    propertyType: filters.propertyType,
    bedrooms: filters.bedrooms,
    minSize: filters.minSize,
    features: filters.features,
    timeframe: "",
  };
}

function matchesHardFilters(property: Property, filters: SearchFilters): boolean {
  if (property.listingType !== filters.listingType) return false;
  if (filters.propertyType !== "any" && property.propertyType !== filters.propertyType) return false;
  if (filters.bedrooms !== "any" && property.bedrooms < filters.bedrooms) return false;
  if (filters.bathrooms !== "any" && property.bathrooms < filters.bathrooms) return false;
  if (filters.minSize && property.size < filters.minSize) return false;
  if (filters.location) {
    const q = filters.location.toLowerCase();
    const haystack = `${property.city} ${property.district} ${property.postalCode}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (filters.features.length > 0) {
    const propFeatures = property.features.map((f) => f.toLowerCase());
    const hasAll = filters.features.every((f) => propFeatures.includes(f.toLowerCase()));
    if (!hasAll) return false;
  }
  return true;
}

export interface SearchResultItem {
  property: Property;
  score: number;
}

export function searchProperties(filters: SearchFilters): SearchResultItem[] {
  const prefs = filtersToPreferences(filters);
  const candidates = demoProperties
    .filter((p) => p.status === "active")
    .filter((p) => matchesHardFilters(p, filters));

  const scored = candidates.map((property) => ({
    property,
    score: matchProperty(prefs, property).score,
  }));

  switch (filters.sort) {
    case "newest":
      return scored.sort(
        (a, b) => new Date(b.property.createdAt).getTime() - new Date(a.property.createdAt).getTime(),
      );
    case "price-asc":
      return scored.sort((a, b) => a.property.price - b.property.price);
    case "price-desc":
      return scored.sort((a, b) => b.property.price - a.property.price);
    case "largest":
      return scored.sort((a, b) => b.property.size - a.property.size);
    case "best-match":
    default:
      return scored.sort((a, b) => b.score - a.score);
  }
}
