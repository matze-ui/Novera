"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/states";
import { formatDate } from "@/lib/utils";
import { getSavedSearches, removeSearch, SAVED_SEARCHES_EVENT, type SavedSearch } from "@/lib/saved-searches";
import { useExternalValue } from "@/lib/use-external-value";

const EMPTY: SavedSearch[] = [];

export default function SavedSearchesPage() {
  const searches = useExternalValue(getSavedSearches, SAVED_SEARCHES_EVENT, EMPTY);

  return (
    <div>
      <h2 className="text-lg font-semibold text-graphite">Saved searches</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Save a search from the results page and revisit it here. Alerts for new matches
        aren&rsquo;t connected yet — that&rsquo;s part of NOVERA Premium.
      </p>

      {searches.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No saved searches"
            description="Run a search and use “Save this search” to keep it here."
            action={<Button href="/search">Find a property</Button>}
          />
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {searches.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4"
            >
              <div>
                <Link href={`/search?${s.query}`} className="font-medium text-graphite hover:text-signal">
                  {s.label}
                </Link>
                <p className="text-xs text-muted-soft">Saved {formatDate(s.createdAt)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeSearch(s.id)}
                className="text-sm text-muted hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
