"use client";

/** Client-only "saved searches" store backed by localStorage. Demo foundation — no account sync. */

export interface SavedSearch {
  id: string;
  label: string;
  query: string;
  createdAt: string;
}

const STORAGE_KEY = "novera.savedSearches.v1";

// See saved-properties.ts for why this cache exists — useSyncExternalStore
// needs a stable reference when the underlying storage hasn't changed.
let cache: { raw: string | null; value: SavedSearch[] } = { raw: undefined as never, value: [] };

export function getSavedSearches(): SavedSearch[] {
  if (typeof window === "undefined") return [];
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cache.raw) return cache.value;
  let value: SavedSearch[] = [];
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    value = Array.isArray(parsed) ? parsed : [];
  } catch {
    value = [];
  }
  cache = { raw, value };
  return value;
}

function writeAll(searches: SavedSearch[]) {
  const raw = JSON.stringify(searches);
  cache = { raw, value: searches };
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(SAVED_SEARCHES_EVENT));
}

export function saveSearch(label: string, query: string): void {
  const existing = getSavedSearches();
  writeAll([
    ...existing,
    { id: crypto.randomUUID(), label, query, createdAt: new Date().toISOString() },
  ]);
}

export function removeSearch(id: string): void {
  writeAll(getSavedSearches().filter((s) => s.id !== id));
}

export const SAVED_SEARCHES_EVENT = "novera:saved-searches-changed";
