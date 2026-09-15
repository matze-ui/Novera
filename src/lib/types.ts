export type ListingType = "rent" | "buy";

export type PropertyType =
  | "apartment"
  | "house"
  | "penthouse"
  | "studio"
  | "loft"
  | "new-development";

export type ArtVariant =
  | "riverside"
  | "grid"
  | "arch"
  | "terrace"
  | "tower"
  | "courtyard";

export interface PropertyImage {
  variant: ArtVariant;
  tone: "blue" | "graphite" | "warm";
  alt: string;
}

export interface Property {
  id: string;
  slug: string;
  isDemo: true;
  title: string;
  listingType: ListingType;
  propertyType: PropertyType;
  city: string;
  district: string;
  postalCode: string;
  addressLabel: string;
  price: number;
  priceUnit: "month" | "total";
  size: number;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  description: string;
  availability: string;
  images: PropertyImage[];
  createdAt: string;
  status: "active" | "under-offer" | "unavailable";
}

export interface MatchPreferences {
  location: string;
  listingType: ListingType;
  minBudget: number;
  maxBudget: number;
  propertyType: PropertyType | "any";
  bedrooms: number | "any";
  minSize: number;
  features: string[];
  timeframe: string;
}

export interface MatchBreakdownItem {
  key: "location" | "budget" | "propertyType" | "bedrooms" | "size" | "features";
  label: string;
  weight: number;
  score: number;
  met: boolean;
  detail: string;
}

export interface MatchResult {
  property: Property;
  score: number;
  breakdown: MatchBreakdownItem[];
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "viewing-requested"
  | "viewing-booked"
  | "viewing-completed"
  | "won"
  | "lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyTitle: string;
  status: LeadStatus;
  createdAt: string;
  notes: string;
  lastContact: string | null;
  nextAction: string;
}

export type ViewingRequestStatus = "requested" | "cancelled";

export interface ViewingRequest {
  id: string;
  propertySlug: string;
  propertyTitle: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
  status: ViewingRequestStatus;
  createdAt: string;
}
