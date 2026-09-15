"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a value derived from an external store (localStorage today) and
 * re-renders when the given custom event fires. Using useSyncExternalStore
 * avoids the classic "read localStorage in useEffect" hydration-mismatch
 * dance: the server snapshot is used for SSR/hydration, then React
 * re-syncs to the real client value automatically.
 */
export function useExternalValue<T>(
  getSnapshot: () => T,
  eventName: string,
  serverSnapshot: T,
): T {
  const subscribe = useCallback(
    (callback: () => void) => {
      window.addEventListener(eventName, callback);
      return () => window.removeEventListener(eventName, callback);
    },
    [eventName],
  );
  const getServerSnapshot = useCallback(() => serverSnapshot, [serverSnapshot]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
