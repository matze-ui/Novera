import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * /admin lists real email addresses, so it is gated with HTTP Basic Auth.
 *
 * This deliberately fails CLOSED: with no credentials configured the route
 * returns 503 rather than serving the list. An unset environment variable
 * should never be the thing standing between the public and your signups.
 */

/** Length-independent comparison, to avoid leaking the secret by timing. */
function safeEqual(a: string, b: string): boolean {
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  let diff = aBytes.length ^ bBytes.length;
  const len = Math.max(aBytes.length, bBytes.length);
  for (let i = 0; i < len; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}

export function middleware(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse(
      "Admin is disabled. Set ADMIN_USERNAME and ADMIN_PASSWORD to enable it.",
      { status: 503, headers: { "Content-Type": "text/plain" } },
    );
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const separator = decoded.indexOf(":");
      if (separator !== -1) {
        const user = decoded.slice(0, separator);
        const pass = decoded.slice(separator + 1);
        // Both comparisons always run — no early return on the username.
        const ok = safeEqual(user, username) && safeEqual(pass, password);
        if (ok) return NextResponse.next();
      }
    } catch {
      // Malformed base64 — fall through to the challenge below.
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Understudy admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
