# NOVERA

Property demand, delivered. A Next.js site for NOVERA, an Austrian proptech company
connecting property seekers with properties that fit, and helping owners, agents and
developers get properties moving — with real lead capture end to end.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme, tokens in `src/app/globals.css`)
- No external UI libraries — every component is hand-built to match the NOVERA brand

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app` — routes (App Router)
- `src/components` — UI, organized by domain (`property/`, `search/`, `match/`, `owners/`, `dashboard/`, `account/`, `layout/`, `ui/`)
- `src/lib` — types, seed property data, the NOVERA Match scoring engine, search/filter logic, and localStorage-backed stores for saved properties/searches and cookie consent
- `src/lib/server` — the file-backed lead store and the server actions the dashboard uses to update lead status

## Leads

Every conversion point on the site — NOVERA Match requirement submissions, viewing
requests, owner property submissions and contact messages — posts to `POST /api/leads`
and is written to `.data/leads.json` (gitignored; created on first lead). `/dashboard`
reads that file directly and lets you move leads through the pipeline. This is real
persistence for a single running server, but it will **not** survive a serverless/edge
deploy (e.g. Vercel) where the filesystem is ephemeral — move to a real database before
scaling past one server.

## Protecting the dashboard

`/dashboard` now shows real captured leads (names, emails, phone numbers), so gate it
before sharing the link or sending real traffic to the site:

```
DASHBOARD_USERNAME=
DASHBOARD_PASSWORD=
```

Set both to require HTTP Basic Auth on every `/dashboard/*` route (see `middleware.ts`).
Left unset, the dashboard stays open.

## Property inventory

`src/lib/demo-properties.ts` is a static seed list of Vienna properties, not a live feed
from owners yet. Addresses use German placeholder street names ("Musterstraße" = sample
street) until each listing is confirmed with its actual owner. Replace this file with a
real data source (CMS or database) as owners are onboarded through `/for-owners/submit`.

## Configuration

Business contact details are intentionally unset until real ones exist — the site shows
a working "Contact NOVERA" form instead of a dead link until you configure these (see
`src/lib/config.ts`):

```
NEXT_PUBLIC_BUSINESS_EMAIL=
NEXT_PUBLIC_BUSINESS_PHONE=
NEXT_PUBLIC_BUSINESS_ADDRESS=
NEXT_PUBLIC_SITE_URL=
```
