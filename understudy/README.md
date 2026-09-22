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

Red, blue and white. A navy stage, white light and type, and red for anything
live or calling for attention. Sections alternate between the navy stage and
the white script pages.

| Token        | Value     | Use                                               |
| ------------ | --------- | ------------------------------------------------- |
| `stage`      | `#0e1832` | navy — dark section background                    |
| `paper`      | `#ffffff` | white — light section background                  |
| `paper-sunk` | `#f1f5fb` | pale blue — the alternating light section         |
| `spot`       | `#ef454a` | red accent on dark: eyebrows, emphasis, "on air"  |
| `spot-solid` | `#d32236` | the primary button (white text)                   |
| `spot-ink`   | `#9c0f22` | red text on white                                 |
| `cue`        | `#2563eb` | blue — focus rings, links, confirmation           |

All 37 pairings are contrast-checked against WCAG AA and documented at the top
of `globals.css`.

### Why the navy can't get much lighter

A lighter navy and a darker red pull against each other. The primary button
has to clear **3:1** against the surface behind it while still holding white
text at **4.5:1**, and that band closes as the navy lightens. Above roughly
2.1x the current navy's luminance, **no valid red exists at all**. This
palette sits at 1.52x, which is deliberately short of the ceiling so the reds
have room to be dark.

If you want a lighter navy, the red has to get lighter with it — re-run the
pairings before shipping it.

Three rules fall out of that:

- **Bright red is for dark surfaces only.** On white it fails, so `spot-ink`
  carries red text there and `spot-deep` carries red fills.
- **The primary button lightens on hover** (`spot-hover`). Darkening it would
  drop its edge below 3:1 against the navy.
- **`spot` as small text is only safe on `stage`, not `stage-raised`** (4.4:1
  there). On raised surfaces it is display-sized type only — which is why the
  hero's eyebrow pill sits on the stage rather than on a panel.

Red is the brand colour *and* the error colour, so error text is tuned per
surface (`alarm` on white, `alarm-lit` on navy) rather than sharing one value
that would be unreadable on one of them. Success states are blue, not red, so
a confirmation never reads as a failure.

Type: Instrument Serif for display, Inter for body, JetBrains Mono for the
small uppercase labels and log-style detail lines.
