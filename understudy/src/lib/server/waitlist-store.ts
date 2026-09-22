import type { WaitlistEntry, WaitlistResult, WaitlistSource } from "@/lib/types";
import type { WaitlistDriver } from "./storage/types";
import { StorageUnavailableError } from "./storage/types";
import { detectEphemeralHost, ephemeralGuardDriver } from "./storage/ephemeral";
import { fileDriver } from "./storage/file";
import { postgresDriver } from "./storage/postgres";

export interface NewSignup {
  email: string;
  company?: string;
  role?: string;
  useCase?: string;
  source: WaitlistSource;
}

/**
 * Picks where signups go, in this order:
 *
 *   1. DATABASE_URL set  -> Postgres. The production path.
 *   2. Ephemeral host    -> a guard that throws on every call, so signups
 *                           fail visibly instead of being written to a
 *                           filesystem that is about to be thrown away.
 *   3. Otherwise         -> the JSON file. Local dev, or one long-running
 *                           server with real disk.
 *
 * The guard in step 2 is the whole point of this module: the failure it
 * prevents is a page that says "you're on the list" to every visitor while
 * storing nothing.
 */
let cached: WaitlistDriver | null = null;

function selectDriver(): WaitlistDriver {
  if (process.env.DATABASE_URL) {
    return postgresDriver;
  }

  const ephemeralHost = detectEphemeralHost(process.env);
  if (ephemeralHost) {
    console.error(
      `[waitlist] Running on ${ephemeralHost} with no DATABASE_URL. ` +
        `Signups will be REJECTED (503) rather than silently discarded.`,
    );
    return ephemeralGuardDriver(ephemeralHost);
  }

  return fileDriver;
}

export function getDriver(): WaitlistDriver {
  if (!cached) cached = selectDriver();
  return cached;
}

/** Test seam — lets the driver be re-picked after changing env vars. */
export function resetDriverForTests(): void {
  cached = null;
}

export function addSignup(input: NewSignup): Promise<WaitlistResult> {
  return getDriver().add(input);
}

export function getSignups(): Promise<WaitlistEntry[]> {
  return getDriver().list();
}

export function getSignupCount(): Promise<number> {
  return getDriver().count();
}

export { StorageUnavailableError };
