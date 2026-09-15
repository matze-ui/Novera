# NOVERA

Property demand, delivered. A production-quality Next.js foundation for NOVERA, an Austrian proptech concept connecting property seekers with properties that fit, and helping owners, agents and developers get properties moving.

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
- `src/lib` — types, demo data, the NOVERA Match scoring engine, search/filter logic, and small localStorage-backed stores for saved properties/searches and cookie consent

## Demo data

All property, lead and viewing-request data in `src/lib/demo-*.ts` is fictional and clearly labeled `DEMO` in the UI. Addresses use German placeholder words ("Musterstraße" = sample street) so nothing can be mistaken for a real listing.

## Configuration

Business contact details are intentionally unset until real ones exist. Set them via environment variables (see `src/lib/config.ts`):

```
NEXT_PUBLIC_BUSINESS_EMAIL=
NEXT_PUBLIC_BUSINESS_PHONE=
NEXT_PUBLIC_BUSINESS_ADDRESS=
NEXT_PUBLIC_SITE_URL=
```
