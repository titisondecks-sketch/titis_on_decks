/* Every App render lives here. Bun has no per-file test environment, so
   each test sets its own URL before rendering - see setup.js. That only
   needs --isolate for the URL not to leak into the next FILE; within
   this file every test still calls setTestUrl() itself, so it reads the
   same with or without the flag. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { afterEach, expect, spyOn, test } from 'bun:test'
import App from '../src/App.jsx'
import { setTestUrl } from './setup.js'

afterEach(cleanup)

/* Every real path the router answers, apart from the frozen #/draftN
   hashes, which never change and so are never tested. A route renamed
   in App.jsx but not here, or vice versa, shows up as a row that fails
   or a row nobody added. */
const LIVING_ROUTES = [
  ['https://staging.titisondecks.com/', '.h-hero'],
  ['https://staging.titisondecks.com/pink', '.h-hero'],
  ['https://staging.titisondecks.com/radio', '.radioside'],
  ['https://staging.titisondecks.com/carla', '.artist'],
  ['https://staging.titisondecks.com/glitta', '.glitta'],
  ['https://staging.titisondecks.com/nubreed', '.nb'],
  ['https://staging.titisondecks.com/joy', '.jy'],
  ['https://staging.titisondecks.com/love', '.lv'],
  ['https://staging.titisondecks.com/pluribus', '.pl'],
  ['https://staging.titisondecks.com/events', '.ev-page'],
  ['https://staging.titisondecks.com/soon', '.soon'],
  ['https://staging.titisondecks.com/upload', '.up'],
  ['https://uploads.titisondecks.com/', '.up'],
]

test.each(LIVING_ROUTES)('%s renders its page root', (url, selector) => {
  setTestUrl(url)
  const { container } = render(<App />)

  expect(container.querySelector(selector)).not.toBeNull()
})

/* The curtain still covers everything except the upload desk and
   /events. A route that slipped in front of it by accident is the
   failure this guards - real (/radio) and invented (nubreed) routes
   all have to stay behind it on the public domain. */
const CURTAINED_ROUTES = [
  ['https://www.titisondecks.com/radio', '.radioside'],
  ['https://www.titisondecks.com/nubreed', '.nb'],
]

test.each(CURTAINED_ROUTES)('%s stays behind the curtain on the public domain', (url, selector) => {
  setTestUrl(url)
  const { container } = render(<App />)

  expect(container.querySelector(selector)).toBeNull()
  expect(container.querySelector('.soon')).not.toBeNull()
})

test('/events stands in front of the curtain on the public domain too', () => {
  setTestUrl('https://www.titisondecks.com/events')
  const { container } = render(<App />)

  expect(container.querySelector('.ev-page')).not.toBeNull()
  expect(container.querySelector('.soon')).toBeNull()
})

/* The invented night has to admit, somewhere a reader will reach, that
   it never happened - or a real date and real names read as an
   announcement. */
const FICTION_ADMISSIONS = [
  ['https://staging.titisondecks.com/nubreed', '.nb-wink'],
]

test.each(FICTION_ADMISSIONS)('%s admits the night is fiction', (url, selector) => {
  setTestUrl(url)
  const { container } = render(<App />)

  expect(container.querySelector(selector)?.textContent.length).toBeGreaterThan(0)
})

/* eventsData.js feeds /events and the home teaser, in front of the
   curtain - an invented night's name landing in there by accident would
   announce it as real. */
test('none of the invented nights are named in eventsData.js', () => {
  const source = readFileSync(join(process.cwd(), 'src/sections/eventsData.js'), 'utf8')

  for (const name of ['Nu Breed']) {
    expect(source, name).not.toContain(name)
  }
})

/* Posters, clips and sleeves are referenced by public path, and nothing
   at build time checks a typo in one - it is a silently empty image or
   an empty arch. This scans every component for the pattern rather than
   trusting one file-on-disk test per page to have been written. */
function jsFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) jsFiles(full, out)
    else if (/\.(jsx|js)$/.test(name)) out.push(full)
  }
  return out
}

test('every media path referenced in source exists on disk', () => {
  const pattern = /media\/[^'"`]+\.(jpg|jpeg|png|webp|mp4|webm|m4a|mp3|svg)/g
  const found = new Set()
  for (const file of jsFiles(join(process.cwd(), 'src'))) {
    for (const m of readFileSync(file, 'utf8').matchAll(pattern)) found.add(m[0])
  }

  expect(found.size).toBeGreaterThan(0)
  for (const rel of found) {
    expect(existsSync(join(process.cwd(), 'public', rel)), rel).toBe(true)
  }
})

/* The deck on /glitta: the one interaction that is a promise, not an
   animation, so a short default waitFor is fine here. */
test('the needle plays the record on the deck, and lifts it again', async () => {
  /* setTestUrl builds a fresh window and its own HTMLMediaElement class,
     so the prototype has to be spied on after it, not before - spying
     first would patch a prototype setTestUrl is about to replace. */
  setTestUrl('https://staging.titisondecks.com/glitta')
  const play = spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve())
  const pause = spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  const { container } = render(<App />)

  expect(container.querySelector('.glitta-deck')).not.toBeNull()
  const platter = container.querySelector('.tt-platter')
  fireEvent.click(platter)
  await waitFor(() => expect(platter.getAttribute('aria-pressed')).toBe('true'))
  expect(play).toHaveBeenCalledTimes(1)

  fireEvent.click(platter)
  await waitFor(() => expect(platter.getAttribute('aria-pressed')).toBe('false'))
  expect(pause).toHaveBeenCalledTimes(1)

  play.mockRestore()
  pause.mockRestore()
})
