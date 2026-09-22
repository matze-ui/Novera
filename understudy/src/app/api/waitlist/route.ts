import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { addSignup, StorageUnavailableError } from "@/lib/server/waitlist-store";
import { rateLimit } from "@/lib/server/rate-limit";
import { LIMITS, WAITLIST_SOURCES, clamp, isValidEmail } from "@/lib/validate";
import type { WaitlistSource } from "@/lib/types";

/**
 * The single waitlist capture endpoint. Every form on the site posts here.
 *
 * Route Handlers aren't cached for POST, so no cache config is needed.
 */
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { allowed, retryAfter } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Honeypot: a field hidden from real users. Anything that fills it is a
  // bot. Return a normal-looking success so the bot doesn't learn to adapt,
  // but write nothing.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ status: "joined", position: 0, alreadyJoined: false });
  }

  const email = clamp(data.email, LIMITS.email);
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const source = WAITLIST_SOURCES.includes(data.source as WaitlistSource)
    ? (data.source as WaitlistSource)
    : "hero";

  try {
    const result = await addSignup({
      email,
      company: clamp(data.company, LIMITS.company),
      role: clamp(data.role, LIMITS.role),
      useCase: clamp(data.useCase, LIMITS.useCase),
      source,
    });

    return NextResponse.json({
      status: "joined",
      position: result.position,
      alreadyJoined: result.alreadyJoined,
    });
  } catch (err) {
    // Storage that cannot persist is a deployment fault, not a visitor's.
    // Answer 503 so the form shows an error instead of a false confirmation.
    if (err instanceof StorageUnavailableError) {
      console.error("[waitlist] STORAGE NOT CONFIGURED — signup rejected:", err.message);
      return NextResponse.json(
        { error: "The waitlist is temporarily unavailable. Please try again shortly." },
        { status: 503 },
      );
    }
    console.error("[waitlist] failed to record signup", err);
    return NextResponse.json(
      { error: "We couldn't save that just now. Please try again." },
      { status: 500 },
    );
  }
}
