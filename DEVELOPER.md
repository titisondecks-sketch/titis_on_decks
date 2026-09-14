# Developer notes

For whoever picks this site up next. The [README](README.md) says what the
site is; this file says how to work on it without breaking the parts that
are easy to break. Read both, then run the tests before you change anything.

## Contents

- [First hour](#first-hour)
- [How a request finds its page](#how-a-request-finds-its-page)
- [Common tasks](#common-tasks)
- [Serverless functions and env vars](#serverless-functions-and-env-vars)
- [Services and where their settings live](#services-and-where-their-settings-live)
- [Tests](#tests)
- [House rules](#house-rules)

## First hour

```sh
bun install                                   # Bun >= 1.4, bun.lock is the only lockfile
bun run test                                  # the whole suite, a few seconds
bun run dev                                   # the site, without the /api functions
```

The Vite dev server serves the pages but not `api/`. To run the booking
and upload functions locally, link the Vercel project and use Vercel's
own dev server:

```sh
vercel link --project titis-on-decks          # once, writes .vercel/ (gitignored)
vercel env pull .env.local                    # development env vars (gitignored)
vercel dev
```

`localhost` never sees the curtain, so the full site is what you get.

## How a request finds its page

There is no framework router - `src/App.jsx` decides, in this order:

1. **Host `uploads.titisondecks.com`** - the upload desk (`sections/Desk.jsx`).
   A tool for the collective, not a page, so nothing covers it.
2. **Path `/events`** - the dates page, in front of the curtain on purpose.
3. **The curtain** - while `CURTAIN` is `true`, `titisondecks.com` and
   `www` get only `sections/Soon.jsx`. Staging, `*.vercel.app` previews
   and localhost are never curtained.
4. **Hash routes** - `#/radio` and `#/pink` land on the living pages;
   `#/draft2` to `#/draft7` are frozen backups of earlier stages.
5. **Paths** - `/radio`, `/pink`, `/carla`, `/glitta`, `/nubreed`, `/joy`,
   `/love`, `/pluribus`, `/soon`, `/upload`.

Two axes are set on `<html>` per route: `data-theme` (the `THEME` map -
`home`, `pink` or `radio` skin) and `data-font` (`EMOTIQ_ROUTES` wear
EMOTIQ, the rest Monoton). On Vercel every path is a rewrite in
`vercel.json` - usually to `/index.html`, or to a route's own HTML file
when it has its own link preview.

## Common tasks

### Reopen the site

Set `CURTAIN` to `false` in `src/App.jsx`, run the tests, push to `main`.

### Add a page

1. Build the component in `src/sections/`.
2. In `src/App.jsx`: a `p.startsWith('/route')` line in
   `routeFromLocation()`, an entry in `THEME`, the route in
   `EMOTIQ_ROUTES` if it wears EMOTIQ, and a branch in the render switch.
3. In `vercel.json`: a rewrite from `/route` to `/index.html`.
4. Copy for all three languages in `src/i18n/translations.jsx`.
5. Optional link preview: an entry in `PAGES` in
   `scripts/build-og-pages.mjs`, a 1200×630 image in `public/media/`, and
   point the rewrite at `/route.html` instead (see *Link previews* in the
   README).
6. A render test in `tests/pages.test.jsx`.

### Add a date

Copy the commented `TEMPLATE` block in `src/sections/eventsData.js`.
Required: `id`, `title`, `start`, `area`, `country`, `lineup`, `genres`.
`start` must carry an explicit UTC offset (`+01:00` in the Algarve summer,
`+00:00` in winter) - a start without one fails the build. Flyers go to
`public/media/events/`. Past dates are never deleted; the page filters
them out.

### Change the upload passcode

Set `UPLOAD_PASSCODE` again in all three environments, then redeploy -
env vars only reach new deployments:

```sh
for e in production preview development; do vercel env add UPLOAD_PASSCODE $e --force; done
vercel redeploy <latest production deployment>
```

### Bring uploads home

```sh
vercel env pull .env.local --environment production   # needs BLOB_READ_WRITE_TOKEN
bun run sync-uploads
```

New files land in `incoming/` (gitignored). Nothing is overwritten or
deleted; the keepers are optimised into `public/media/photos/` by hand.

## Serverless functions and env vars

Everything in `api/` deploys as its own function and runs on Bun
(`vercel.json` pins `bunVersion`). Files starting with `_` are modules,
not endpoints.

| Function | Needs | Does |
|----------|-------|------|
| `api/booking.js` | `RESEND_API_KEY`, `BOOKING_TO`, `BOOKING_FROM`, optional `TELEGRAM_*` | notification mail to the collective, styled confirmation to the requester, Telegram ping |
| `api/upload.js` | `UPLOAD_PASSCODE`, `BLOB_READ_WRITE_TOKEN`, optional `TELEGRAM_*` | passcode check, short-lived Blob upload token, Telegram ping when a file lands |
| `api/media.js` | `UPLOAD_PASSCODE`, `BLOB_READ_WRITE_TOKEN` | list and delete for the desk's gallery |

All values live in the Vercel project settings - never in the repo, never
in a commit message. `BLOB_READ_WRITE_TOKEN` is injected by the linked
`titis-uploads` store. Without `RESEND_API_KEY` + `BOOKING_TO`, or without
`UPLOAD_PASSCODE`, the functions answer `503 not-configured`, and the
booking form then falls back to a mail draft.

To check a deployment without side effects, send a wrong passcode:
`POST /api/media` with `{"passcode":"x","action":"list"}` answers `403`
when the desk is configured and `503` when it is not. The booking
function has no such probe - a real test booking sends real mail.

## Services and where their settings live

| Service | Used for | Settings |
|---------|----------|----------|
| GitHub | this repository | `titisondecks-sketch/titis_on_decks` |
| Vercel | hosting, functions, env vars, domains, Blob store | project `titis-on-decks` |
| Vercel Blob | upload desk storage (`titis-uploads`, public, fra1) | Vercel project → Storage |
| Namecheap | domain and DNS | A and CNAME records to Vercel, MX to ImprovMX, SPF / DMARC / DKIM TXT records |
| ImprovMX | forwards `booking@titisondecks.com` into the collective's Gmail | ImprovMX dashboard |
| Resend | sends booking mail as `booking@titisondecks.com` | domain `titisondecks.com` verified, sending-only API key |
| Telegram | `@titisondecks_bot` posts booking requests and new uploads into the crew group | BotFather, group settings |

Every account above should belong to the collective. When one changes
hands, only the secret values in Vercel change - the code stays as it is.

Free-plan limits to keep in mind: Vercel Blob on the Hobby plan is free
within usage limits. Past them nothing is charged, but Blob stops working -
uploads and the desk's gallery alike - until the 30-day window resets.
Long WAV sets add up fast.

## Tests

`bun run test` runs `bun test --isolate` with jsdom preloaded from
`tests/setup.js`.

| File | Holds |
|------|-------|
| `tests/pages.test.jsx` | every App render - routes, hosts, the curtain |
| `tests/i18n.test.mjs` | DE, PT and EN carry the same keys |
| `tests/events.test.mjs` | every date is well-formed and parses |
| `tests/upload.test.jsx` | the desk's send and gallery sides |
| `api/media.test.mjs` | list and delete with a mocked store |
| `scripts/build-og-pages.test.mjs` | link-preview swaps match exactly once |
| `scripts/sync-uploads.test.mjs` | what the sync plans to bring down |

## House rules

- **Bun only.** No npm or yarn lockfiles next to `bun.lock`.
- **No secrets in the repo.** `.env*` and `.vercel` are gitignored; keep it that way.
- **Frozen is frozen.** `src/styles/site.css` and the `#/draft` routes back up
  earlier stages and do not change.
- **Comments say why.** The code is commented for the next person, in plain
  language. Keep that up when you touch it.
- **Fiction stays out of the data.** Invented nights (like `/nubreed`) never
  go into `eventsData.js`, so the real dates pipeline never carries one.
- **The EMOTIQ font is a demo cut.** Buy the full license before the site is
  promoted commercially.
