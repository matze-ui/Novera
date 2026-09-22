import type { WaitlistEntry, WaitlistResult } from "@/lib/types";
import type { NewSignup } from "@/lib/server/waitlist-store";

export interface WaitlistDriver {
  /** Short name, for logs and the health endpoint. */
  readonly name: string;
  add(input: NewSignup): Promise<WaitlistResult>;
  list(): Promise<WaitlistEntry[]>;
  count(): Promise<number>;
}

/**
 * Thrown when the app is running somewhere its storage cannot survive.
 * The API route turns this into a 503 so a signup fails loudly in front of
 * the visitor, instead of returning "you're on the list" and dropping it.
 */
export class StorageUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageUnavailableError";
  }
}
