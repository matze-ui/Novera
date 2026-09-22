/**
 * Best-effort, in-memory rate limit for the public waitlist endpoint.
 *
 * Scope and honest limits: this is per-process memory, so it resets on
 * restart and does nothing across multiple instances. It exists to blunt
 * casual scripted spam, not as a security control. Put a real limiter
 * (Upstash, Cloudflare, an edge WAF) in front before launch.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    hits.set(key, recent);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return { allowed: true, retryAfter: 0 };
}
