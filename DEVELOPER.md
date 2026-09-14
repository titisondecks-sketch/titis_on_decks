# Developer guide

A practical reference for working on this site. The [README](README.md)
explains what the site is; this document explains how it is built and how to
change it safely. Read both, and run the test suite before and after any change.

## Contents

- [Getting started](#getting-started)
- [How a request finds its page](#how-a-request-finds-its-page)
- [Common tasks](#common-tasks)
- [Serverless functions and environment variables](#serverless-functions-and-environment-variables)
- [Services and where their settings live](#services-and-where-their-settings-live)
- [Tests](#tests)
- [Conventions](#conventions)

## Getting started

```sh
bun install                                   # Bun >= 1.4; bun.lock is the only lockfile
bun run test                                  # full suite, a few seconds
bun run dev                                   # the site, without the /api functions
```

The Vite dev server serves the pages but not `api/`. To run the booking and
upload functions locally, link the Vercel project and use Vercel's dev server:

```sh
vercel link --project titis-on-decks          # once; writes .vercel/ (gitignored)
vercel env pull .env.local                    # development environment variables (gitignored)
vercel dev
```

`localhost` is exempt from the `CURTAIN` gate (see [How a request finds its
page](#how-a-request-finds-its-page)), so `vercel dev` serves the full site,
not the holding page.

## How a request finds its page

There is no framework router; `src/App.jsx` resolves the route itself, in this
order:

1. **Host `uploads.titisondecks.com`** - the upload desk (`sections/Desk.jsx`),
   an internal tool rather than a public page, so the curtain never applies to it.
2. **Path `/events`** - the dates page, intentionally shown in front of the curtain.
3. **The curtain** - while the `CURTAIN` flag is `true`, `titisondecks.com` and
   `www` serve only `sections/Soon.jsx`. Staging, `*.vercel.app` previews and
   localhost are never curtained.
4. **Hash routes** - `#/radio` and `#/pink` map to the active pages;
   `#/draft2` to `#/draft7` are frozen snapshots of earlier stages.
5. **Paths** - `/radio`, `/pink`, `/carla`, `/glitta`, `/nubreed`, `/joy`,
   `/love`, `/pluribus`, `/soon`, `/upload`.

Each route sets two attributes on `<html>`: `data-theme` (from the `THEME` map -
`home`, `pink` or `radio` skin) and `data-font` (routes in `EMOTIQ_ROUTES` use
EMOTIQ, the rest Monoton). On Vercel, every path is a rewrite in `vercel.json` -
usually to `/index.html`, or to a route-specific HTML file when it has its own
link preview.

## Common tasks

### Take the site out of maintenance mode

Set `CURTAIN` to `false` in `src/App.jsx`, run the tests, and deploy to `main`.

### Add a page

1. Build the component in `src/sections/`.
2. In `src/App.jsx`: add a `p.startsWith('/route')` line in
   `routeFromLocation()`, an entry in `THEME`, the route in `EMOTIQ_ROUTES` if
   it uses EMOTIQ, and a branch in the render switch.
3. In `vercel.json`: add a rewrite from `/route` to `/index.html`.
4. Add copy for all three languages in `src/i18n/translations.jsx`.
5. Optional link preview: add an entry to `PAGES` in
   `scripts/build-og-pages.mjs`, add a 1200×630 image in `public/media/`, and
   point the rewrite at `/route.html` instead (see *Link previews* in the README).
6. Add a render test in `tests/pages.test.jsx`.

### Add a date

Copy the commented `TEMPLATE` block in `src/sections/eventsData.js`. Required
fields: `id`, `title`, `start`, `area`, `country`, `lineup`, `genres`. `start`
must carry an explicit UTC offset (`+01:00` in summer, `+00:00` in winter) - a
value without one fails the build. Flyer images go in `public/media/events/`.
Past dates are never deleted; the page filters them out at render time.

### Change the upload passcode

Set `UPLOAD_PASSCODE` in all three environments, then redeploy - environment
variables only reach new deployments:

```sh
for e in production preview development; do vercel env add UPLOAD_PASSCODE $e --force; done
vercel redeploy <latest production deployment>
```

### Sync uploaded files locally

```sh
vercel env pull .env.local --environment production   # needs BLOB_READ_WRITE_TOKEN
bun run sync-uploads
```

New files are written to `incoming/` (gitignored). Nothing is overwritten or
deleted; selected files are optimised into `public/media/photos/` manually.

## Serverless functions and environment variables

Everything in `api/` deploys as an individual function and runs on Bun
(`vercel.json` pins `bunVersion`). Files whose names start with `_` are shared
modules, not endpoints.

| Function | Requires | Purpose |
|----------|----------|---------|
| `api/booking.js` | `RESEND_API_KEY`, `BOOKING_TO`, `BOOKING_FROM`, optional `TELEGRAM_*` | notification email to the booking inbox, styled confirmation to the enquirer, optional Telegram notification |
| `api/upload.js` | `UPLOAD_PASSCODE`, `BLOB_READ_WRITE_TOKEN`, optional `TELEGRAM_*` | passcode check, short-lived Blob upload token, optional Telegram notification when a file arrives |
| `api/media.js` | `UPLOAD_PASSCODE`, `BLOB_READ_WRITE_TOKEN` | list and delete for the upload desk's gallery |

All values are stored in the Vercel project settings - never in the repository
and never in a commit message. `BLOB_READ_WRITE_TOKEN` is injected by the linked
`titis-uploads` store. Without `RESEND_API_KEY` and `BOOKING_TO`, or without
`UPLOAD_PASSCODE`, the affected function returns `503 not-configured`, and the
booking form falls back to an email draft.

To check a deployment without side effects, send an incorrect passcode:
`POST /api/media` with `{"passcode":"x","action":"list"}` returns `403` when the
desk is configured and `503` when it is not. The booking function has no
equivalent probe - a genuine test booking sends real email.

## Services and where their settings live

| Service | Used for | Settings |
|---------|----------|----------|
| GitHub | source repository | `titisondecks-sketch/titis_on_decks` |
| Vercel | hosting, functions, environment variables, domains, Blob store | project `titis-on-decks` |
| Vercel Blob | upload desk storage (`titis-uploads`, public, fra1) | Vercel project → Storage |
| Namecheap | domain and DNS | A and CNAME records to Vercel; MX to ImprovMX; SPF / DMARC / DKIM TXT records |
| ImprovMX | forwards `booking@titisondecks.com` to the destination mailbox | ImprovMX dashboard |
| Resend | sends booking email as `booking@titisondecks.com` | domain `titisondecks.com` verified; sending-only API key |
| Telegram | `@titisondecks_bot` posts booking requests and new uploads to the team's group | BotFather, group settings |

When an account changes hands, only the secret values in Vercel need updating -
the code does not change.

Free-tier limit worth noting: Vercel Blob on the Hobby plan is free within its
usage limits. Beyond them there is no charge, but Blob stops serving - both
uploads and the desk's gallery - until the 30-day window resets. Large audio
sets consume the quota quickly.

## Tests

`bun run test` runs `bun test --isolate` with jsdom preloaded from
`tests/setup.js`.

| File | Covers |
|------|--------|
| `tests/pages.test.jsx` | every App render - routes, hosts, the curtain |
| `tests/i18n.test.mjs` | DE, PT and EN expose the same keys |
| `tests/events.test.mjs` | every date is well-formed and parses |
| `tests/upload.test.jsx` | the upload desk's send and gallery paths |
| `api/media.test.mjs` | list and delete against a mocked store |
| `scripts/build-og-pages.test.mjs` | link-preview swaps match exactly once |
| `scripts/sync-uploads.test.mjs` | what the sync plans to download |

## Conventions

- **Bun only.** Do not add npm or yarn lockfiles alongside `bun.lock`.
- **No secrets in the repository.** `.env*` and `.vercel` are gitignored; keep
  them that way. All credentials live in the Vercel project settings.
- **Frozen files stay frozen.** `src/styles/site.css` and the `#/draft` routes
  are snapshots of earlier stages and must not be changed.
- **Fictional events stay out of the data.** Invented pages (for example
  `/nubreed`) must never be added to `eventsData.js`, so the real events
  pipeline never carries one.
- **EMOTIQ is a trial cut.** The bundled EMOTIQ font is a demo version; obtain a
  full licence before any commercial promotion of the site.
