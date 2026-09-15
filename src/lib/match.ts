import type { MatchBreakdownItem, MatchPreferences, MatchResult, Property } from "./types";

/**
 * NOVERA Match — transparent weighted relevance score.
 *
 * This is an internal relevance score, not a guarantee of fit or
 * availability. Weights are intentionally simple and documented so the
 * result can always be explained to the person seeing it.
 */
export const MATCH_WEIGHTS = {
  location: 30,
  budget: 25,
  propertyType: 15,
  bedrooms: 10,
  size: 10,
  features: 10,
} as const;

function scoreLocation(prefs: MatchPreferences, property: Property): MatchBreakdownItem {
  const query = prefs.location.trim().toLowerCase();
  const haystack = `${property.city} ${property.district} ${property.postalCode}`.toLowerCase();
  const met = query.length === 0 || haystack.includes(query);
  return {
    key: "location",
    label: "Location",
    weight: MATCH_WEIGHTS.location,
    score: met ? MATCH_WEIGHTS.location : 0,
    met,
    detail: met
      ? `${property.district} matches your preferred area`
      : `Outside your preferred area (${prefs.location || "any"})`,
  };
}

function scoreBudget(prefs: MatchPreferences, property: Property): MatchBreakdownItem {
  const withinRange = property.price >= prefs.minBudget && property.price <= prefs.maxBudget;
  let partial = 0;
  if (!withinRange) {
    const distance =
      property.price > prefs.maxBudget
        ? property.price - prefs.maxBudget
        : prefs.minBudget - property.price;
    const tolerance = prefs.maxBudget * 0.1 || 1;
    partial = Math.max(0, 1 - distance / tolerance);
  }
  const score = withinRange
    ? MATCH_WEIGHTS.budget
    : Math.round(MATCH_WEIGHTS.budget * partial);
  return {
    key: "budget",
    label: "Budget",
    weight: MATCH_WEIGHTS.budget,
    score,
    met: withinRange,
    detail: withinRange
      ? "Fits your budget"
      : `${property.price.toLocaleString("en-US")} is outside your range`,
  };
}

function scorePropertyType(prefs: MatchPreferences, property: Property): MatchBreakdownItem {
  const met = prefs.propertyType === "any" || prefs.propertyType === property.propertyType;
  return {
    key: "propertyType",
    label: "Property type",
    weight: MATCH_WEIGHTS.propertyType,
    score: met ? MATCH_WEIGHTS.propertyType : 0,
    met,
    detail: met ? "Correct property type" : `You wanted ${prefs.propertyType}`,
  };
}

function scoreBedrooms(prefs: MatchPreferences, property: Property): MatchBreakdownItem {
  const met = prefs.bedrooms === "any" || property.bedrooms >= prefs.bedrooms;
  const close = !met && typeof prefs.bedrooms === "number" && property.bedrooms === prefs.bedrooms - 1;
  return {
    key: "bedrooms",
    label: "Bedrooms",
    weight: MATCH_WEIGHTS.bedrooms,
    score: met ? MATCH_WEIGHTS.bedrooms : close ? Math.round(MATCH_WEIGHTS.bedrooms * 0.5) : 0,
    met,
    detail: met
      ? "Meets your bedroom preference"
      : `Has ${property.bedrooms}, you asked for ${prefs.bedrooms}+`,
  };
}

function scoreSize(prefs: MatchPreferences, property: Property): MatchBreakdownItem {
  const met = property.size >= prefs.minSize;
  const ratio = prefs.minSize > 0 ? property.size / prefs.minSize : 1;
  const score = met ? MATCH_WEIGHTS.size : Math.round(MATCH_WEIGHTS.size * Math.min(1, Math.max(0, ratio)));
  return {
    key: "size",
    label: "Size",
    weight: MATCH_WEIGHTS.size,
    score,
    met,
    detail: met
      ? `${property.size} m² meets your minimum`
      : `${property.size} m² is below your ${prefs.minSize} m² minimum`,
  };
}

function scoreFeatures(prefs: MatchPreferences, property: Property): MatchBreakdownItem {
  if (prefs.features.length === 0) {
    return {
      key: "features",
      label: "Features",
      weight: MATCH_WEIGHTS.features,
      score: MATCH_WEIGHTS.features,
      met: true,
      detail: "No specific features requested",
    };
  }
  const propertyFeatures = property.features.map((f) => f.toLowerCase());
  const matched = prefs.features.filter((f) => propertyFeatures.includes(f.toLowerCase()));
  const ratio = matched.length / prefs.features.length;
  return {
    key: "features",
    label: "Features",
    weight: MATCH_WEIGHTS.features,
    score: Math.round(MATCH_WEIGHTS.features * ratio),
    met: ratio === 1,
    detail:
      matched.length > 0
        ? `Matches ${matched.length}/${prefs.features.length} requested features`
        : "None of your requested features found",
  };
}

export function matchProperty(prefs: MatchPreferences, property: Property): MatchResult {
  const breakdown = [
    scoreLocation(prefs, property),
    scoreBudget(prefs, property),
    scorePropertyType(prefs, property),
    scoreBedrooms(prefs, property),
    scoreSize(prefs, property),
    scoreFeatures(prefs, property),
  ];
  const score = breakdown.reduce((sum, item) => sum + item.score, 0);
  return { property, score, breakdown };
}

export function matchProperties(
  prefs: MatchPreferences,
  properties: Property[],
): MatchResult[] {
  return properties
    .filter((p) => p.status === "active")
    .filter((p) => prefs.listingType === p.listingType)
    .map((p) => matchProperty(prefs, p))
    .sort((a, b) => b.score - a.score);
}

export const DEFAULT_MATCH_PREFERENCES: MatchPreferences = {
  location: "Vienna",
  listingType: "rent",
  minBudget: 800,
  maxBudget: 2000,
  propertyType: "any",
  bedrooms: "any",
  minSize: 40,
  features: [],
  timeframe: "Within 3 months",
};
