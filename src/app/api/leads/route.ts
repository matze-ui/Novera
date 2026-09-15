import { NextResponse } from "next/server";

/**
 * DEMO endpoint for contact / enquiry submissions (property enquiries and
 * owner property submissions). Held in memory for this server process
 * only — nothing is persisted, emailed or pushed into a CRM. Replace with
 * a real database and notification pipeline before production use.
 */
interface StoredLead {
  id: string;
  type: "contact" | "owner-submission";
  payload: Record<string, unknown>;
  createdAt: string;
}

const store: StoredLead[] = [];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.type !== "string") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry: StoredLead = {
    id: crypto.randomUUID(),
    type: body.type === "owner-submission" ? "owner-submission" : "contact",
    payload: typeof body.payload === "object" && body.payload !== null ? body.payload : {},
    createdAt: new Date().toISOString(),
  };

  store.push(entry);

  return NextResponse.json({ status: "received", id: entry.id });
}

export async function GET() {
  return NextResponse.json({ count: store.length, note: "In-memory demo store, not persisted." });
}
