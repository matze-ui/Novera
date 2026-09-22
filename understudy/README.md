# Understudy

> It learns the job. Then it does the job.

Landing page and waitlist for **Understudy**, an AI automation service: agents
that shadow how a team actually runs a workflow, rehearse against real past
cases, then run it end to end with an audit trail and a human escalation path.

This is a standalone Next.js app. It shares the repository with the unrelated
NOVERA proptech site at the repo root but has its own dependencies, its own
build and its own deploy — nothing is imported across the two.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — CSS-first theme, all brand tokens in `src/app/globals.css`
- No UI libraries. Every component is hand-built.

## Getting started

```bash
cd understudy
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build      # production build (also typechecks)
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/app          routes: landing page, /admin, POST /api/waitlist, robots, sitemap
src/components   site/ (header, footer, logo), sections/, waitlist/, ui/
src/lib          config, types, validation
src/lib/server   the waitlist store and the rate limiter
middleware.ts    HTTP Basic Auth gate for /admin
```

## The waitlist

Every form on the page posts to `POST /api/waitlist`. Signups are appended to
`.data/waitlist.json`, which is gitignored because it holds real email
addresses.

The endpoint:

- validates the address and caps every field length,
- de-duplicates on lowercased email — resubmitting returns the original
  position rather than creating a second row,
- drops submissions that fill the hidden honeypot field, while returning a
  normal-looking success so bots don't learn to adapt,
- rate-limits to 5 requests per minute per IP,
- serialises writes, so two signups arriving at once can't overwrite
  each other.

### This will not survive a serverless deploy

`.data/waitlist.json` is real persistence for **one long-running server** and
survives restarts. It does **not** work on Vercel, Cloudflare or Lambda, where
the filesystem is ephemeral per invocation, and it is not safe across multiple
instances. The rate limiter is per-process memory with the same caveat.

Before pointing a launch campaign at this, replace `readAll`/`writeAll` in
`src/lib/server/waitlist-store.ts` with a real store — Postgres, Turso, or an
email audience like Resend/Loops. That file is the only thing that needs to
change; the API route and the forms stay as they are.

## Reading the signups

`/admin` lists everyone who has joined. It is gated by HTTP Basic Auth and
**fails closed** — with no credentials configured it returns 503 rather than
serving the list:

```
ADMIN_USERNAME=
ADMIN_PASSWORD=
```

## Configuration

Contact details are intentionally blank until real ones exist. The footer
shows "coming with launch" instead of rendering a mailto: link that bounces.

```
NEXT_PUBLIC_SITE_URL=            # canonical URL, used by metadata/sitemap/robots
NEXT_PUBLIC_CONTACT_EMAIL=       # shows a real contact link in the footer
NEXT_PUBLIC_COMPANY_LEGAL_NAME=  # shown in the copyright line once registered
```

## What is deliberately not on this page

Understudy is pre-launch, so the page claims nothing that isn't true yet.
There are no customer logos, no testimonials, no "trusted by N teams"
counters, and no prices. The hero panel is labelled as illustrative. Timings
in "How it works" are labelled as targets, and the principles section says up
front that it describes intent rather than shipped features.

If you add social proof later, add it when it's real. The page is designed to
work without it.

## Brand

The visual idea is a theatre: a dark stage lit by a warm spotlight, and the
pale script pages the understudy learns from. Sections alternate between the
two.

| Token   | Value     | Use                                    |
| ------- | --------- | -------------------------------------- |
| `stage` | `#0b0c10` | dark section background                |
| `paper` | `#f7f5f0` | light section background               |
| `spot`  | `#e9b44c` | spotlight amber — the single accent    |
| `cue`   | `#3f9d82` | "live"/success states                  |

Contrast pairings are checked and documented at the top of `globals.css`.
Amber is never used for small text on a light background — `spot-ink`
(`#8a5f14`, 5.2:1 on paper) exists for that.

Type: Instrument Serif for display, Inter for body, JetBrains Mono for the
small uppercase labels and log-style detail lines.
