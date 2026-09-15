"use server";

import { revalidatePath } from "next/cache";
import { updateLead } from "@/lib/server/lead-store";
import type { LeadStatus } from "@/lib/types";

export async function updateLeadStatusAction(id: string, status: LeadStatus) {
  await updateLead(id, { status });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard/viewing-requests");
  revalidatePath("/dashboard/properties");
  revalidatePath("/dashboard/analytics");
}

export async function updateLeadNextActionAction(id: string, nextAction: string) {
  await updateLead(id, { nextAction });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
}
