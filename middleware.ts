import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * The owner dashboard now shows real captured leads (names, emails,
 * phone numbers). Gate it with HTTP Basic Auth when credentials are
 * configured, so it isn't wide open on the public internet.
 *
 * Set DASHBOARD_USERNAME and DASHBOARD_PASSWORD to enable this. Until
 * then the dashboard stays reachable — do this before sending real
 * traffic to the site.
 */
export function middleware(request: NextRequest) {
  const username = process.env.DASHBOARD_USERNAME;
  const password = process.env.DASHBOARD_PASSWORD;

  if (!username || !password) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);
    if (user === username && pass === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="NOVERA Dashboard"' },
  });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
