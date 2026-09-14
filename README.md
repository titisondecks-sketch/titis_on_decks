# TiTis on Decks

Website of **TiTis on Decks** - a female DJ collective by
[Lutzi](https://soundcloud.com/dielu) & [Glitta](https://soundcloud.com/glittawicca).
Different sounds. Different characters. One shared frequency.

Live at [titisondecks.com](https://www.titisondecks.com) (Vercel, deploys from `main`).

## Pages

| Route | What it is |
|-------|------------|
| `/` | The living site - warm blacklight (amber / UV yellow / acid green), EMOTIQ titles, real story and sets |
| `/pink` | The living site in the site's archived pink night palette - same page, other colors (legacy `#/pink` lands here) |
| `/radio` | Sunrise Radio, living - EMOTIQ, the transmissions grid, DJ filters, morning atmosphere (legacy `#/radio` lands here) |
| `/carla` | The artist page, living, unlisted (nothing links to it; shared as a direct link). Carla Heinz does not exist: the name picks no side and neither does the hooded portrait, so the page can stand in for whoever gets one next without gendering them. Renders `sections/ArtistPage.jsx` with an `artist` prop - a template component rather than a one-off page. Six slots (kicker, name, portrait, caption, bio, note) plus an optional CTA; copy lives in the `carla` block of `translations.jsx`, portrait in `public/media/artists/`. Pink skin. |
| `/glitta` | Glitta's own page - living, unlisted like `/carla`. Her featured-artist layout in the pink-purple night palette, with her SoundCloud linked from day one, and Perplexico - her track on One.Shared.Frequency. records - playing on a turntable further down the page. |
| `/nubreed` | NU BREED, MULTIVERSE IV · Amazonia - a night that never happened, living, unlisted. Led by the *Anni, Amazon Warrior* visualiser (never autoplays - it carries a song), with the flyer one tap away. The flyer is generated from `scripts/flyer-nu-breed.html`; the page says outright that the night is fiction, and it is deliberately kept out of `eventsData.js` so the real dates pipeline never carries an invented one. |
| `/joy` | "Celebrate Women! All of them!" - an homage, living, unlisted. Not a night and not a joke, so nothing on it is invented and nothing is borrowed: no flyer, no line-up, no embed and no photograph. The picture is drawn and it is the page's weather - seven volumes of coloured light behind the whole page (`components/Clouds.jsx`, cool palette), stacked with `mix-blend-mode: screen` so overlaps add and all seven make white, each drifting on its own 23-37s clock. A scrim of the page's own ground goes over the light and under the words, because screen-blended light under body text is a contrast problem that *moves*. Under it, eight of them named without numbers, because a numbered list of people is a ranking. Cool skin. |
| `/love` | The warm twin, living, unlisted. Same construction in the Nu Breed register - warm skin, warm cloud palette - and leaner: `/joy` names them, this one says what the naming is for. Carries the page family's one raised voice, a line addressed to the chest-beaters, and the quiet correction under it that keeps the line about behaviour rather than about anybody's birth. Both halves are held by tests in all three languages, because either without the other changes what the page means. |
| `/pluribus` | *E pluribus unum* - the political one, living, unlisted. Third of the family `/joy` and `/love` started, and the one that argues rather than celebrates: what a dance floor already knows about sharing a room, and - framed, because the page stands on it - what it is closed to. Its picture is a mosaic (`components/Mosaic.jsx`): 144 tiles, each its own hue laid out by the golden angle so no two neighbours match, masked to a disc. Step back, one thing; step in, a hundred and forty-four. Cool skin. Names no party on purpose - a rule catches the next one too, and a fun page that names sitting politicians becomes a liability somebody else has to defend. |

Routing is a tiny router in `App.jsx`: hashes starting with `#/` switch
pages, the real paths `/pink` and `/radio` (`vercel.json` rewrites) are
living pages, and plain `#anchors` scroll within the current page. The
font is its own axis (`html[data-font]`): living pages and drafts 5-7
wear EMOTIQ, the earlier drafts keep Monoton.

## Design

- **Theme scoping:** the home page's warm palette lives in `styles/home.css`,
  guarded by `html[data-theme='home']`. `styles/site.css` holds the site's
  earlier, archived design and stays untouched - frozen on purpose.
- **Type:** EMOTIQ (display titles on the living pages: hero, finale, Sunrise
  Radio - demo cut from the collective, full license pending), Monoton
  (the archived design's neon display), Sora (body), Space Mono
  (labels/data). All embedded as data URIs in `styles/fonts.css` - no
  external requests.
- **Motion:** React + [motion](https://motion.dev). Ingredients: `SplitText`
  (neon flicker-on), `ShinyText` (light sweep), `TiltCard` (pointer tilt +
  glare), `Spores` (canvas drift, warm colors via prop), `Waveform` (the
  logo's waveform as a living equalizer). Everything respects
  `prefers-reduced-motion`.

## Structure

```
index.html                 Vite entry (real logo favicon from public/icon.png)
src/App.jsx                hash router + data-theme switching
src/home/                  the real site: Nav · Hero · Collective · Story ·
                           Spectrum · Sound · Gathering · Gallery · Booking ·
                           Finale (+ sets.js / media.js data modules)
api/booking.js             serverless booking function (see Booking pipeline)
src/sections/Radio.jsx     Sunrise Radio page (shared)
src/components/            animation ingredients
src/i18n/                  DE / PT / EN - DE and PT lead, EN is fallback
public/media/              real photos & video loops from the collective
scripts/build-og-pages.mjs per-route link previews (runs after vite build)
vercel.json                uploads.titisondecks.com → Dropbox redirect
```

### Link previews

An unfurler reads the HTML and never runs the router, so on a client-side
site every path previews as whatever is in `index.html` - the home card,
no matter which page you shared. `bun run build` therefore runs
`scripts/build-og-pages.mjs` after Vite, which copies `dist/index.html`
per route with the social tags swapped, and `vercel.json` points that
route at its own file (`/nubreed` → `/nubreed.html`). Same bundle, same
router; only the `<head>` differs.

**To give a new route its own card:** add an entry to `PAGES` in that
script, point its `vercel.json` rewrite at `<route>.html`, and drop a
1200×630 image in `public/media/` (compose it like
`scripts/og-nu-breed.html` and screenshot it headless). Every swap asserts
it matched exactly once, so a tag that stops matching fails the build
instead of shipping the wrong card.

The tab title still comes from `i18n/meta.title` at runtime, so a page
with its own card still shows the site-wide title once the app boots.

## Booking pipeline

The booking section on the living pages posts to `api/booking.js` - a
Vercel serverless function (the `/api` folder deploys next to the static
build, no framework change). One request sends the collective a
notification mail with Reply-To set to the requester, a styled
confirmation to the requester in the site's language, and a Telegram
ping to the crew. Plain `fetch` throughout - zero dependencies.

Configured entirely through Vercel env vars (never in the repo):

| Var | What |
|-----|------|
| `RESEND_API_KEY` | required - the [Resend](https://resend.com) key that does the sending |
| `BOOKING_TO` | recipient - `booking@titisondecks.com`, the live brand address, forwarding into the collective's Gmail |
| `BOOKING_FROM` | optional - `TiTis on Decks <booking@titisondecks.com>` once the domain is verified at Resend |
| `TELEGRAM_BOT_TOKEN` | optional - bot token from @BotFather |
| `TELEGRAM_CHAT_IDS` | optional - comma-separated chat ids to ping |

Until `RESEND_API_KEY` + `BOOKING_TO` exist the function answers 503 and
the form falls back to a prefilled mail draft to the address in
`src/contact.js` - a request never dead-ends.

## Run it

```sh
bun install
bun run dev       # local dev server
bun run build     # static build in dist/
bun run test      # bun test --isolate - Bun's own test runner
```

`bun.lock` is the only lockfile. `dev`, `build`, `preview` and now `test` all run on Bun's own
runtime (`bun --bun vite`, `bun test --isolate`), which for the build emits a byte-identical
bundle to Node's. Production runs Bun as well - `vercel.json` pins `bunVersion` to `1.4.x`, so the
serverless functions in `api/` execute on Bun rather than Node. `package.json` carries the
same floor as `engines.bun` (`>=1.4.0`), so a contributor's Bun and the one Vercel builds
with cannot silently disagree - 1.4 is an explicit opt-in on Vercel's side and carries
breaking changes, which is exactly why the two are written down together.

## Placeholders to replace

- Booking now goes to `booking@titisondecks.com`, live and forwarding into
  the collective's Gmail - `src/contact.js` and the `BOOKING_TO` env var
  both point there. The draft backups keep the frozen
  `hello@titisondecks.example` on purpose.
- The *Next gathering* timetable is the wonderland placeholder until real dates exist
- EMOTIQ ships as the demo cut (© Enxyclo Studio) - buy the full license before
  the site is promoted commercially
