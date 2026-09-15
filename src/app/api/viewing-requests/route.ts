import { NextResponse } from "next/server";

/**
 * DEMO endpoint. Viewing requests are held in memory for this server
 * process only — nothing is persisted to a database, and nothing is
 * emailed or synced to a calendar. Wire this up to a real datastore and
 * a calendar/notification integration before relying on it in production.
 */
interface StoredViewingRequest {
  id: string;
  propertySlug: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
  name: string;
  email: string;
  createdAt: string;
}

const store: StoredViewingRequest[] = [];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.propertySlug !== "string" ||
    typeof body.name !== "string" ||
    typeof body.email !== "string"
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry: StoredViewingRequest = {
    id: crypto.randomUUID(),
    propertySlug: body.propertySlug,
    preferredDay: typeof body.preferredDay === "string" ? body.preferredDay : "",
    preferredTime: typeof body.preferredTime === "string" ? body.preferredTime : "",
    message: typeof body.message === "string" ? body.message : "",
    name: body.name,
    email: body.email,
    createdAt: new Date().toISOString(),
  };

  store.push(entry);

  return NextResponse.json({ status: "requested", id: entry.id });
}

export async function GET() {
  return NextResponse.json({ count: store.length, note: "In-memory demo store, not persisted." });
}
