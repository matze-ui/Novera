"use client";

import { PropertyGrid } from "@/components/property/property-grid";
import { demoProperties } from "@/lib/demo-properties";
import { getSavedSlugs, SAVED_PROPERTIES_EVENT } from "@/lib/saved-properties";
import { useExternalValue } from "@/lib/use-external-value";

const EMPTY: string[] = [];

export default function SavedPropertiesPage() {
  const slugs = useExternalValue(getSavedSlugs, SAVED_PROPERTIES_EVENT, EMPTY);
  const properties = demoProperties.filter((p) => slugs.includes(p.slug));

  return (
    <div>
      <h2 className="text-lg font-semibold text-graphite">Saved properties</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Properties you save (using the heart icon on any listing) will appear here, on this
        device.
      </p>
      <div className="mt-8">
        <PropertyGrid
          properties={properties}
          emptyTitle="No saved properties"
          emptyDescription="Save properties you like and they'll appear here."
        />
      </div>
    </div>
  );
}
