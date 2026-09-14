/* Bring down what the collective has sent.

   The upload desk drops files into Vercel Blob; the site serves media
   from public/media/. This walks the gap: everything in the store that
   is not already on disk lands in incoming/, keeping the month/who
   folders the desk gave it. Nothing is overwritten and nothing is
   deleted - curating and optimising stays a human job, and incoming/
   is a doorstep, not a gallery.

   Deliberately NOT under public/. Vite copies public/ verbatim into
   the build, so a staging folder there would deploy every unrotated
   12 MB phone photo to production and commit it to git besides.
   incoming/ sits at the repo root and is gitignored; the keepers get
   optimised into public/media/photos/ by hand, which is the whole
   point of having a doorstep.

   Run it:  bun run sync-uploads

   Needs BLOB_READ_WRITE_TOKEN. It is in .env.local already, written
   there when the store was linked, and this reads that file directly
   so the script works the same under node and under bun. */

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { list } from '@vercel/blob'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const INCOMING = join(ROOT, 'incoming')

/* Everything already pulled down, as paths relative to the incoming
   folder so they compare directly against localPathFor(). A missing
   folder is the first run, not an error. */
export async function existingUnder(dir) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true, recursive: true })
  } catch {
    return []
  }
  return entries
    .filter((e) => e.isFile())
    .map((e) => relative(dir, join(e.parentPath ?? e.path, e.name)))
}

/* The store answers in pages and says so via hasMore/cursor. Asking
   once looks like it works right up until the collective has sent more
   than a page, at which point the older half quietly stops arriving
   and this reports "nothing new" - a lie with no error attached. The
   list function is a parameter so this can be tested without a store. */
export async function listAll(listFn, options = {}) {
  const all = []
  let cursor
  do {
    const page = await listFn({ ...options, cursor })
    all.push(...page.blobs)
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  return all
}

export function localPathFor(pathname) {
  return pathname.replace(/^uploads\//, '')
}

export function planSync(blobs, existing = []) {
  const have = new Set(existing)
  const toFetch = []
  const toSkip = []
  for (const blob of blobs) {
    if (have.has(localPathFor(blob.pathname))) toSkip.push(blob)
    else toFetch.push(blob)
  }
  return { fetch: toFetch, skip: toSkip }
}

/* .env.local is written by `vercel env pull` in KEY="value" form. Only
   the one key is needed, and it is never printed. */
async function tokenFromEnvFile() {
  try {
    const text = await readFile(join(ROOT, '.env.local'), 'utf8')
    const line = text.split('\n').find((l) => l.startsWith('BLOB_READ_WRITE_TOKEN='))
    return line ? line.slice('BLOB_READ_WRITE_TOKEN='.length).trim().replace(/^"|"$/g, '') : null
  } catch {
    return null
  }
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN || (await tokenFromEnvFile())
  if (!token) {
    console.error('No BLOB_READ_WRITE_TOKEN. Run: vercel env pull .env.local --environment production')
    process.exitCode = 1
    return
  }

  const blobs = await listAll(list, { token })
  const plan = planSync(blobs, await existingUnder(INCOMING))

  if (plan.fetch.length === 0) {
    console.log(`nothing new - ${plan.skip.length} already here`)
    return
  }

  for (const blob of plan.fetch) {
    const target = join(INCOMING, localPathFor(blob.pathname))
    await mkdir(dirname(target), { recursive: true })
    const res = await fetch(blob.url)
    if (!res.ok) {
      console.error(`skipped ${blob.pathname} - store answered ${res.status}`)
      continue
    }
    await writeFile(target, Buffer.from(await res.arrayBuffer()))
    console.log(`+ ${localPathFor(blob.pathname)}`)
  }

  console.log(`\n${plan.fetch.length} new, ${plan.skip.length} already here -> incoming/`)
}

/* Only when run directly. The tests import this file, and importing it
   must never reach for the network. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
