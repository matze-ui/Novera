import { StorageUnavailableError, type WaitlistDriver } from "./types";

/**
 * Hosts that give each invocation a throwaway filesystem. Writing signups to
 * a JSON file on any of these looks like it works and loses every row.
 */
export function detectEphemeralHost(env: NodeJS.ProcessEnv): string | null {
  if (env.VERCEL) return "Vercel";
  if (env.AWS_LAMBDA_FUNCTION_NAME) return "AWS Lambda";
  if (env.NETLIFY) return "Netlify";
  if (env.CF_PAGES) return "Cloudflare Pages";
  if (env.K_SERVICE) return "Google Cloud Run";
  return null;
}

const MESSAGE = (host: string) =>
  `Waitlist storage is not configured. This app is running on ${host}, whose ` +
  `filesystem is discarded after every request, so the file-backed store would ` +
  `accept signups and silently lose them. Set DATABASE_URL to a Postgres ` +
  `connection string (Neon, Supabase, Vercel Postgres, Railway…) and redeploy.`;

/**
 * Refuses every operation. Installed when we are on an ephemeral host with no
 * database configured — failing closed, exactly like the /admin gate, because
 * a waitlist that quietly discards signups is worse than one that is down.
 */
export function ephemeralGuardDriver(host: string): WaitlistDriver {
  const fail = async (): Promise<never> => {
    throw new StorageUnavailableError(MESSAGE(host));
  };
  return {
    name: `unconfigured (${host})`,
    add: fail,
    list: fail,
    count: fail,
  };
}
