import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property/property-card";
import { EmptyState } from "@/components/ui/states";

export function PropertyGrid({
  properties,
  matchScores,
  emptyTitle = "No matches",
  emptyDescription = "Try widening your budget or location.",
  emptyAction,
}: {
  properties: Property[];
  matchScores?: Record<string, number>;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
}) {
  if (properties.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          matchScore={matchScores?.[property.slug]}
        />
      ))}
    </div>
  );
}
