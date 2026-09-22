import { promises as fs } from "fs";
import path from "path";
import type { WaitlistEntry, WaitlistResult, WaitlistSource } from "@/lib/types";

/**
 * Server-only, file-backed waitlist.
 *
 * Signups are written to `.data/waitlist.json` (gitignored — it holds real
 * email addresses). This is genuine persistence for a single long-running
 * server and survives restarts, but it is NOT safe across multiple
 * instances and will NOT persist on serverless/edge hosting (Vercel,
 * Cloudflare, Lambda) where the filesystem is ephemeral per invocation.
 *
 * Swap `readAll`/`writeAll` for a real table (Postgres, Turso, Airtable,
 * a Resend/Loops audience) before pointing a launch campaign at this.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

/**
 * Writes are serialised through this promise chain. Node is single-threaded
 * per instance, but `await` between the read and the write is a real
 * interleaving point — two concurrent signups could otherwise read the same
 * list and the second write would drop the first entry.
 */
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(fn, fn);
  writeQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

async function readAll(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WaitlistEntry[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(entries: WaitlistEntry[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  // Write to a temp file then rename, so a crash mid-write can't truncate
  // the list that's already on disk.
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(entries, null, 2), "utf-8");
  await fs.rename(tmp, DATA_FILE);
}

export interface NewSignup {
  email: string;
  company?: string;
  role?: string;
  useCase?: string;
  source: WaitlistSource;
}

export async function addSignup(input: NewSignup): Promise<WaitlistResult> {
  const email = input.email.trim().toLowerCase();

  return enqueue(async () => {
    const entries = await readAll();

    // Re-submitting the same address is a no-op that reports the original
    // position, so a double click doesn't create a duplicate or a new number.
    const existing = entries.find((e) => e.email === email);
    if (existing) {
      return { position: existing.position, alreadyJoined: true };
    }

    const entry: WaitlistEntry = {
      id: crypto.randomUUID(),
      email,
      company: input.company?.trim() ?? "",
      role: input.role?.trim() ?? "",
      useCase: input.useCase?.trim() ?? "",
      source: input.source,
      createdAt: new Date().toISOString(),
      position: entries.length + 1,
    };

    entries.push(entry);
    await writeAll(entries);

    return { position: entry.position, alreadyJoined: false };
  });
}

/** Newest first, for the admin view. */
export async function getSignups(): Promise<WaitlistEntry[]> {
  const entries = await readAll();
  return [...entries].sort((a, b) => b.position - a.position);
}

export async function getSignupCount(): Promise<number> {
  return (await readAll()).length;
}
