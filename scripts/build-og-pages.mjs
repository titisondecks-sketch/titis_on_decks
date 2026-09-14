/* Per-route link previews for a client-side site.

   WhatsApp, Signal, Telegram, Slack and every other unfurler reads the
   HTML and stops. They do not run the router, so every path served
   `index.html` shared as the home page: the curtain screenshot and "a
   female DJ collective", whatever you actually linked.

   The fix is a second HTML file, not a second app. `vite build` emits one
   `index.html`; this copies it per route with the social tags swapped, and
   `vercel.json` rewrites that route to its own file instead. The document
   is byte-identical apart from the tags, so it boots the same bundle and
   the router resolves the path exactly as before - `base: './'` means the
   asset hrefs resolve the same from `/nubreed` as from `/`.

   Every swap below asserts it matched exactly once. A silently unswapped
   tag would ship the wrong card and look completely fine in the build log,
   which is the failure this file exists to prevent. */

import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

/* /nubreed lives behind the curtain, so staging is not a preview of its
   real address - it IS its address. The tags say so rather than pointing
   at a www URL that answers with the Soon page. */
const STAGING = 'https://staging.titisondecks.com'

export const PAGES = [
  {
    file: 'nubreed.html',
    title: 'NU BREED - MULTIVERSE IV · Amazonia',
    description:
      'Day 3 of 3. Sunday 23 August 2026 at Themiscyra - Lutzi, Glitta and Malediven Toni, hosted by Anni Amazon. A night that never happened, printed properly.',
    url: `${STAGING}/nubreed`,
    image: `${STAGING}/media/og-nu-breed.jpg`,
    imageAlt:
      'NU BREED - Anni Amazon in bronze armour with a raised sword, beside the line-up for Multiverse IV · Amazonia',
  },
]

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/* one exact swap, or throw - see the note at the top of this file.

   The count has to come from a global regex. String.match() without the g
   flag returns the first match plus its capture groups, so its length says
   nothing about how many times the pattern occurs: a document with the tag
   twice counted as one and half-swapped silently. */
function swap(html, pattern, replacement, label) {
  const all = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
  const found = html.match(all)?.length ?? 0
  if (found !== 1) {
    throw new Error(`build-og-pages: expected exactly one ${label}, found ${found}`)
  }
  return html.replace(pattern, replacement)
}

export function pageHtml(indexHtml, page) {
  const title = escape(page.title)
  const description = escape(page.description)
  let html = indexHtml

  html = swap(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>')
  html = swap(
    html,
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${description}">`,
    'meta description'
  )
  html = swap(
    html,
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${escape(page.url)}">`,
    'canonical link'
  )

  const props = {
    'og:title': title,
    'og:description': description,
    'og:url': escape(page.url),
    'og:image': escape(page.image),
    'og:image:alt': escape(page.imageAlt),
  }
  for (const [prop, value] of Object.entries(props)) {
    html = swap(
      html,
      new RegExp(`<meta property="${prop}" content="[^"]*">`),
      `<meta property="${prop}" content="${value}">`,
      prop
    )
  }

  const names = {
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': escape(page.image),
  }
  for (const [name, value] of Object.entries(names)) {
    html = swap(
      html,
      new RegExp(`<meta name="${name}" content="[^"]*">`),
      `<meta name="${name}" content="${value}">`,
      name
    )
  }

  return html
}

/* only run when invoked directly, so the test can import pageHtml */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const index = await readFile(join(DIST, 'index.html'), 'utf8')
  for (const page of PAGES) {
    await writeFile(join(DIST, page.file), pageHtml(index, page))
    console.log(`og: dist/${page.file}`)
  }
}
