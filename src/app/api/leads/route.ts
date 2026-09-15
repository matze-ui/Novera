import { NextResponse } from "next/server";
import { addLead } from "@/lib/server/lead-store";
import type { LeadSource } from "@/lib/types";

const VALID_SOURCES: LeadSource[] = ["match", "viewing-request", "owner-submission", "contact"];

/**
 * Single lead-capture endpoint for the whole site: NOVERA Match requirement
 * submissions, viewing requests, owner property submissions, and general
 * contact messages all land here and are written to the local lead store
 * (see src/lib/server/lead-store.ts) so they show up in /dashboard/leads.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.source !== "string" ||
    !VALID_SOURCES.includes(body.source as LeadSource) ||
    typeof body.name !== "string" ||
    !body.name.trim() ||
    typeof body.email !== "string" ||
    !body.email.trim()
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lead = await addLead({
    source: body.source as LeadSource,
    name: body.name.trim(),
    email: body.email.trim(),
    phone: typeof body.phone === "string" ? body.phone.trim() : undefined,
    propertyTitle:
      typeof body.propertyTitle === "string" && body.propertyTitle.trim()
        ? body.propertyTitle.trim()
        : "General enquiry",
    requirements: typeof body.requirements === "string" ? body.requirements : undefined,
    message: typeof body.message === "string" ? body.message : undefined,
  });

  return NextResponse.json({ status: "received", id: lead.id });
}
