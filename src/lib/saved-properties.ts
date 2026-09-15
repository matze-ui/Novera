"use client";

/**
 * Client-only "saved properties" store backed by localStorage.
 *
 * There is no real account system yet, so this is a per-browser demo of
 * what saving/favoriting will feel like once real authentication and a
 * database exist. Nothing here is synced across devices.
 */

const STORAGE_KEY = "novera.savedProperties.v1";

// Cache the parsed snapshot so repeated reads return the same array
// reference when storage hasn't changed — required for useSyncExternalStore,
// which otherwise treats a fresh array on every render as a fresh update.
let cache: { raw: string | null; value: string[] } = { raw: undefined as never, value: [] };

function readAll(): string[] {
  if (typeof window === "undefined") return [];
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cache.raw) return cache.value;
  let value: string[] = [];
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    value = Array.isArray(parsed) ? parsed : [];
  } catch {
    value = [];
  }
  cache = { raw, value };
  return value;
}

function writeAll(slugs: string[]) {
  const raw = JSON.stringify(slugs);
  cache = { raw, value: slugs };
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // localStorage unavailable (private mode, disabled storage) — fail silently
  }
  window.dispatchEvent(new CustomEvent(SAVED_PROPERTIES_EVENT));
}

export function getSavedSlugs(): string[] {
  return readAll();
}

export function isSaved(slug: string): boolean {
  return readAll().includes(slug);
}

export function toggleSaved(slug: string): boolean {
  const current = readAll();
  const isCurrentlySaved = current.includes(slug);
  const next = isCurrentlySaved ? current.filter((s) => s !== slug) : [...current, slug];
  writeAll(next);
  return !isCurrentlySaved;
}

export const SAVED_PROPERTIES_EVENT = "novera:saved-properties-changed";
