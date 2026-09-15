import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { FilterBar } from "@/components/search/filter-bar";
import { MapPlaceholder } from "@/components/search/map-placeholder";
import { PropertyGrid } from "@/components/property/property-grid";
import { parseFilters, searchProperties } from "@/lib/search";

export const metadata: Metadata = {
  title: "Find a property in Vienna",
  description:
    "Search demo apartments and houses in Vienna by budget, location, property type and features, ranked by NOVERA Match.",
  alternates: { canonical: "/search" },
};

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const rawParams = await searchParams;
  const filters = parseFilters(rawParams);
  const results = searchProperties(filters);

  const matchScores = Object.fromEntries(
    results.map((r) => [r.property.slug, r.score]),
  );

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-graphite sm:text-3xl">
            {filters.listingType === "rent" ? "Properties to rent" : "Properties for sale"}
            {filters.location ? ` in ${filters.location}` : ""}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {results.length} {results.length === 1 ? "result" : "results"} · demo listings
          </p>
        </div>

        <Suspense>
          <FilterBar filters={filters} />
        </Suspense>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <PropertyGrid
            properties={results.map((r) => r.property)}
            matchScores={matchScores}
            emptyDescription="Try widening your budget, choosing a different property type, or clearing some filters."
          />
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <MapPlaceholder />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
