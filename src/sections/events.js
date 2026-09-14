/* Pure helpers for the events page - no DOM, no React. The rules about
   when a gig stops being upcoming live here so they can be tested
   standing on any date, without mocking the clock: `now` is always a
   parameter, never a call to Date.now(). */

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000

/* An unparseable date is the dangerous case, not the loud one: every
   comparison against NaN is false, so a typo'd gig would vanish from the
   page in silence. Throw instead - the data module is imported at build
   time, so a bad date fails `npm run build` and never reaches anybody. */
function instant(value, id, field) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) {
    throw new Error(`events: "${id}" has an unparseable ${field}: ${JSON.stringify(value)}`)
  }
  return d
}

/* A night gig is not over at midnight. Without an explicit endsAt an
   event runs twelve hours from doors: Friday 18:00 -> Saturday 06:00. */
export function eventEndsAt(event) {
  if (event.endsAt) return instant(event.endsAt, event.id, 'endsAt')
  return new Date(instant(event.start, event.id, 'start').getTime() + TWELVE_HOURS_MS)
}

export function upcomingEvents(all, now) {
  return all
    .filter((e) => eventEndsAt(e) > now)
    .sort((a, b) => instant(a.start, a.id, 'start') - instant(b.start, b.id, 'start'))
}

/* Doors belong to the venue, not to whoever is reading. Formatting the
   instant in the viewer's timezone would promise a reader in Berlin that
   Pizza Night opens at 19:00. Rebuild the wall clock from the string's
   own digits and render it in UTC, so everyone sees the flyer's time. */
const WALL = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
const LOCALES = { de: 'de-DE', pt: 'pt-PT', en: 'en-GB' }

function wallClock(value, id) {
  const m = WALL.exec(String(value))
  if (!m) throw new Error(`events: "${id}" has an unreadable start: ${JSON.stringify(value)}`)
  const [, y, mo, d, h, mi] = m
  return new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi))
}

export function formatEventDate(event, lang) {
  instant(event.start, event.id, 'start')
  const w = wallClock(event.start, event.id)
  const locale = LOCALES[lang] ?? LOCALES.en

  const date = new Intl.DateTimeFormat(locale, {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC',
  }).format(w)

  const doors = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC',
  }).format(w)

  return { date, doors }
}
