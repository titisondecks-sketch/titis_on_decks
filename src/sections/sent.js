/* Everything the Sent view needs to decide how to show a file, with no
   network and no DOM in sight.

   Named for the view rather than for what it holds, because
   src/home/media.js already exists and means something else entirely -
   that one is the site's curated manifest, this one reads the upload
   store. */

const BY_EXTENSION = {
  jpg: 'image', jpeg: 'image', png: 'image', webp: 'image', heic: 'image', avif: 'image',
  mp4: 'video', mov: 'video', webm: 'video',
  mp3: 'audio', wav: 'audio', aiff: 'audio', aif: 'audio', flac: 'audio', m4a: 'audio',
}

/* Blob reports a content type, but only for files it was given one
   for. The extension is the fallback, lowercased because phones hand
   over .MP3 and .JPG. */
export function kindOf(file) {
  const type = (file.contentType || '').toLowerCase()
  if (type.startsWith('image/')) return 'image'
  if (type.startsWith('video/')) return 'video'
  if (type.startsWith('audio/')) return 'audio'
  const ext = (file.pathname || '').split('.').pop().toLowerCase()
  return BY_EXTENSION[ext] || 'other'
}

/* Blob appends a random suffix after a hyphen so two files of the same
   name never collide - 30 characters in practice. It is noise to a
   human, and long enough to tell apart from a hyphen someone typed on
   purpose, so "dawn-set-live.mp3" keeps every one of its hyphens. */
const RANDOM_SUFFIX = /-[A-Za-z0-9]{20,}(?=\.[^.]+$)/

export function displayName(pathname) {
  return pathname.split('/').pop().replace(RANDOM_SUFFIX, '')
}

/* Decimal units, not binary - phones and cameras report sizes the same
   way, so 2.4 MB here matches 2.4 MB on the device it came from.
   Never rounds down to nothing: a file that exists is at least 1 kB. */
export function prettySize(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`
  return `${Math.max(1, Math.round(bytes / 1000))} kB`
}

/* uploads/2026-07/glitta/canopy-aB3xy9.jpg - month, then who. Anything
   that does not match falls into "unsorted" rather than vanishing; the
   view's job is to show everything in the store, not only the things
   that fit the shape the desk happens to write today. */
const SHAPE = /^uploads\/(\d{4}-\d{2})\/([^/]+)\//

export function groupUploads(files) {
  const months = new Map()
  for (const file of files) {
    const m = SHAPE.exec(file.pathname)
    const month = m ? m[1] : 'unsorted'
    const who = m ? m[2] : 'unsorted'
    if (!months.has(month)) months.set(month, new Map())
    const people = months.get(month)
    if (!people.has(who)) people.set(who, [])
    people.get(who).push(file)
  }
  return [...months.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([month, people]) => ({
      month,
      people: [...people.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([who, list]) => ({ who, files: list })),
    }))
}
