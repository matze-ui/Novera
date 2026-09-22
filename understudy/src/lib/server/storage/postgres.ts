import { Pool } from "pg";
import type { WaitlistEntry, WaitlistResult, WaitlistSource } from "@/lib/types";
import type { NewSignup } from "@/lib/server/waitlist-store";
import type { WaitlistDriver } from "./types";

/**
 * Postgres-backed store — the one to use in production.
 *
 * Works with any provider that hands you a connection string: Neon, Supabase,
 * Vercel Postgres, Railway, RDS. On serverless, use the provider's *pooled*
 * connection string; a direct one will exhaust connections under load.
 *
 * Unlike the file driver, concurrency is the database's problem here: the
 * identity column assigns positions and the unique index on email settles
 * duplicates, so no in-process queue is involved and multiple instances are
 * safe.
 */

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Keep this small: serverless instances multiply connections fast.
      max: Number(process.env.DATABASE_POOL_MAX ?? 3),
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
    });
    pool.on("error", (err) => {
      console.error("[waitlist] idle postgres client error", err);
    });
  }
  return pool;
}

/** Idempotent, and memoised so it costs one round trip per process. */
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS waitlist_signups (
           id          uuid PRIMARY KEY,
           "position"  bigint GENERATED ALWAYS AS IDENTITY,
           email       text NOT NULL UNIQUE,
           company     text NOT NULL DEFAULT '',
           role        text NOT NULL DEFAULT '',
           use_case    text NOT NULL DEFAULT '',
           source      text NOT NULL,
           created_at  timestamptz NOT NULL DEFAULT now()
         )`,
      )
      .then(() => undefined)
      .catch((err) => {
        // Don't cache a failure — the next request should retry.
        schemaReady = null;
        throw err;
      });
  }
  return schemaReady;
}

interface Row {
  id: string;
  position: string | number;
  email: string;
  company: string;
  role: string;
  use_case: string;
  source: string;
  created_at: Date | string;
}

function toEntry(row: Row): WaitlistEntry {
  return {
    id: row.id,
    email: row.email,
    company: row.company,
    role: row.role,
    useCase: row.use_case,
    source: row.source as WaitlistSource,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
    position: Number(row.position),
  };
}

export const postgresDriver: WaitlistDriver = {
  name: "postgres",

  async add(input: NewSignup): Promise<WaitlistResult> {
    await ensureSchema();
    const email = input.email.trim().toLowerCase();

    // One statement settles the race: a concurrent duplicate hits the unique
    // index and returns no row, which we read as "already joined".
    const inserted = await getPool().query<{ position: string }>(
      `INSERT INTO waitlist_signups (id, email, company, role, use_case, source)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (email) DO NOTHING
       RETURNING "position"`,
      [
        crypto.randomUUID(),
        email,
        input.company?.trim() ?? "",
        input.role?.trim() ?? "",
        input.useCase?.trim() ?? "",
        input.source,
      ],
    );

    if (inserted.rows.length > 0) {
      return { position: Number(inserted.rows[0].position), alreadyJoined: false };
    }

    const existing = await getPool().query<{ position: string }>(
      `SELECT "position" FROM waitlist_signups WHERE email = $1`,
      [email],
    );
    return {
      position: existing.rows.length ? Number(existing.rows[0].position) : 0,
      alreadyJoined: true,
    };
  },

  async list(): Promise<WaitlistEntry[]> {
    await ensureSchema();
    const { rows } = await getPool().query<Row>(
      `SELECT id, "position", email, company, role, use_case, source, created_at
       FROM waitlist_signups ORDER BY "position" DESC`,
    );
    return rows.map(toEntry);
  },

  async count(): Promise<number> {
    await ensureSchema();
    const { rows } = await getPool().query<{ n: string }>(
      `SELECT COUNT(*)::text AS n FROM waitlist_signups`,
    );
    return Number(rows[0]?.n ?? 0);
  },
};
