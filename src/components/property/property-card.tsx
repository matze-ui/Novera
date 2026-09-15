"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { PropertyArt } from "@/components/property/property-art";
import { Badge, DemoBadge, MatchBadge } from "@/components/ui/badge";
import { formatPrice, formatSize, propertyTypeLabel } from "@/lib/utils";
import { isSaved, toggleSaved, SAVED_PROPERTIES_EVENT } from "@/lib/saved-properties";
import { useExternalValue } from "@/lib/use-external-value";

export function PropertyCard({
  property,
  matchScore,
}: {
  property: Property;
  matchScore?: number;
}) {
  const saved = useExternalValue(
    () => isSaved(property.slug),
    SAVED_PROPERTIES_EVENT,
    false,
  );

  const unavailable = property.status !== "active";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg">
      <Link href={`/properties/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <PropertyArt
          image={property.images[0]}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap gap-2">
            <DemoBadge />
            {typeof matchScore === "number" && <MatchBadge score={matchScore} />}
          </div>
        </div>
        {unavailable && (
          <div className="absolute inset-x-0 bottom-0 bg-graphite/85 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
            {property.status === "under-offer" ? "Under offer" : "No longer available"}
          </div>
        )}
      </Link>

      <button
        type="button"
        onClick={() => toggleSaved(property.slug)}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved properties" : "Save property"}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-graphite shadow-sm transition-transform hover:scale-105"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={saved ? "#4169ff" : "none"}
          stroke={saved ? "#4169ff" : "currentColor"}
          aria-hidden="true"
        >
          <path
            d="M8 13.5S1.5 9.6 1.5 5.4A3.1 3.1 0 0 1 8 4a3.1 3.1 0 0 1 6.5 1.4C14.5 9.6 8 13.5 8 13.5Z"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-graphite">
            <Link href={`/properties/${property.slug}`} className="hover:text-signal">
              {property.title}
            </Link>
          </h3>
          <Badge tone="outline">{property.listingType === "rent" ? "Rent" : "Buy"}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted">
          {property.city} · {property.postalCode} {property.district}
        </p>
        <p className="mt-3 text-lg font-semibold text-graphite">{formatPrice(property)}</p>
        <p className="mt-1 text-sm text-muted">
          {property.bedrooms} bed · {property.bathrooms} bath · {formatSize(property.size)}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wide text-muted-soft">
          {propertyTypeLabel(property.propertyType)}
        </p>
      </div>
    </article>
  );
}
