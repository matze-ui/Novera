import { promises as fs } from "fs";
import path from "path";
import type { WaitlistEntry, WaitlistResult } from "@/lib/types";
import type { NewSignup } from "@/lib/server/waitlist-store";
import type { WaitlistDriver } from "./types";

/**
 * File-backed store. Real persistence for ONE long-running server (a VPS, a
 * container with a mounted volume, local dev) and it survives restarts. It is
 * not safe across multiple instances, and on serverless it loses everything —
 * which is why `ephemeralGuardDriver` takes over there.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

/**
 * Writes are serialised. Node is single-threaded, but the `await` between the
 * read and the write is a real interleaving point: two concurrent signups
 * could otherwise read the same list and the second write would drop the first.
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
  // the list already on disk.
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(entries, null, 2), "utf-8");
  await fs.rename(tmp, DATA_FILE);
}

export const fileDriver: WaitlistDriver = {
  name: "file",

  async add(input: NewSignup): Promise<WaitlistResult> {
    const email = input.email.trim().toLowerCase();
    return enqueue(async () => {
      const entries = await readAll();

      // Re-submitting reports the original position, so a double click makes
      // no duplicate and no new number.
      const existing = entries.find((e) => e.email === email);
      if (existing) return { position: existing.position, alreadyJoined: true };

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
  },

  async list(): Promise<WaitlistEntry[]> {
    const entries = await readAll();
    return [...entries].sort((a, b) => b.position - a.position);
  },

  async count(): Promise<number> {
    return (await readAll()).length;
  },
};
