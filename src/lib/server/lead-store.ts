import { promises as fs } from "fs";
import path from "path";
import type { Lead, LeadSource, LeadStatus } from "@/lib/types";

/**
 * Server-only, file-backed lead store.
 *
 * NOVERA doesn't have a database yet, so every lead captured on the site
 * (match requirements, viewing requests, owner submissions, contact
 * messages) is written to a local JSON file. This is real persistence for
 * a single running server — it survives restarts — but it is NOT
 * multi-instance safe and will NOT persist on serverless/edge deploys
 * (e.g. Vercel) where the filesystem is ephemeral per invocation. Replace
 * with a real database before scaling past one server or one owner.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(fn, fn);
  writeQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function getAllLeads(): Promise<Lead[]> {
  const leads = await readLeads();
  return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export interface NewLeadInput {
  source: LeadSource;
  name: string;
  email: string;
  phone?: string;
  propertyTitle: string;
  requirements?: string;
  message?: string;
}

export async function addLead(input: NewLeadInput): Promise<Lead> {
  return enqueue(async () => {
    const leads = await readLeads();
    const lead: Lead = {
      id: crypto.randomUUID(),
      source: input.source,
      name: input.name,
      email: input.email,
      phone: input.phone ?? "",
      propertyTitle: input.propertyTitle,
      requirements: input.requirements,
      message: input.message,
      status: "new",
      createdAt: new Date().toISOString(),
      notes: "",
      lastContact: null,
      nextAction: "First contact",
    };
    leads.push(lead);
    await writeLeads(leads);
    return lead;
  });
}

export async function updateLead(
  id: string,
  updates: Partial<Pick<Lead, "status" | "notes" | "nextAction">>,
): Promise<Lead | null> {
  return enqueue(async () => {
    const leads = await readLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) return null;
    const next: Lead = {
      ...leads[idx],
      ...updates,
      lastContact:
        updates.status && updates.status !== leads[idx].status
          ? new Date().toISOString()
          : leads[idx].lastContact,
    };
    leads[idx] = next;
    await writeLeads(leads);
    return next;
  });
}

export type { LeadStatus };
