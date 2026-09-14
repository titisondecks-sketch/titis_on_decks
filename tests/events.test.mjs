import { expect, test } from 'bun:test'
import { EVENTS } from '../src/sections/eventsData.js'
import { eventEndsAt, formatEventDate, upcomingEvents } from '../src/sections/events.js'

test('every record is well-formed, unique, and parses without throwing', () => {
  expect(() => upcomingEvents(EVENTS, new Date('2026-07-29T12:00:00+01:00'))).not.toThrow()
  expect(new Set(EVENTS.map((e) => e.id)).size).toBe(EVENTS.length)

  for (const e of EVENTS) {
    expect(typeof e.id, e.title).toBe('string')
    expect(e.id.length).toBeGreaterThan(0)
    expect(typeof e.title).toBe('string')
    expect(typeof e.area).toBe('string')
    expect(typeof e.country).toBe('string')
    expect(Array.isArray(e.lineup)).toBe(true)
    expect(Array.isArray(e.genres)).toBe(true)
    expect(e.start, `${e.id} must pin its offset`).toMatch(/(Z|[+-]\d{2}:\d{2})$/)
  }
})

/* Pizza Night, the real record: doors 18:00 in the Algarve (+01:00 in
   summer). Twelve hours later is Saturday 06:00 - a night gig is not
   over at midnight. */
test('upcomingEvents keeps what is still to come, extends a night 12h past doors unless endsAt overrides, sorts soonest first, and throws loudly on a bad date', () => {
  const pizza = { id: 'pizza-night-algarve-2026-07-31', start: '2026-07-31T18:00:00+01:00', endsAt: null }

  expect(upcomingEvents([pizza], new Date('2026-07-29T12:00:00+01:00'))).toHaveLength(1)
  expect(upcomingEvents([pizza], new Date('2026-08-01T05:59:00+01:00'))).toHaveLength(1)
  expect(upcomingEvents([pizza], new Date('2026-08-01T06:01:00+01:00'))).toHaveLength(0)

  const short = { ...pizza, endsAt: '2026-07-31T20:00:00+01:00' }
  expect(upcomingEvents([short], new Date('2026-07-31T21:00:00+01:00'))).toHaveLength(0)
  expect(eventEndsAt(short).toISOString()).toBe('2026-07-31T19:00:00.000Z')

  const later = { id: 'later', start: '2026-09-12T22:00:00+01:00', endsAt: null }
  const order = upcomingEvents([later, pizza], new Date('2026-07-29T12:00:00+01:00'))
  expect(order.map((e) => e.id)).toEqual(['pizza-night-algarve-2026-07-31', 'later'])

  /* the silent-lie guard: every comparison against an unparseable date
     is false, so a typo'd gig would simply never appear - it has to be
     loud instead, and name the event */
  const broken = { id: 'typo-gig', start: 'not a date at all', endsAt: null }
  expect(() => upcomingEvents([broken], new Date('2026-07-29T12:00:00+01:00'))).toThrow(/typo-gig/)
})

/* Doors are local to the venue - a reader in Berlin still has to see
   18:00, not their own timezone's translation of that instant. This is
   also the logic HomeNextDates.slice(0, 2) leans on for "soonest two". */
test('formatEventDate prints the flyer\'s door time and date per language, timezone-safe', () => {
  const pizza = { id: 'pizza-night-algarve-2026-07-31', start: '2026-07-31T18:00:00+01:00', endsAt: null }

  expect(formatEventDate(pizza, 'en').doors).toBe('18:00')
  expect(formatEventDate(pizza, 'en').date).toMatch(/Fri/)
  expect(formatEventDate(pizza, 'de').date).toMatch(/Fr/)

  const soonest = upcomingEvents(
    [
      { id: 'c', start: '2026-10-01T22:00:00+01:00', endsAt: null },
      { id: 'a', start: '2026-08-10T22:00:00+01:00', endsAt: null },
      { id: 'b', start: '2026-09-05T22:00:00+01:00', endsAt: null },
    ],
    new Date('2026-07-29T12:00:00+01:00')
  ).slice(0, 2)
  expect(soonest.map((e) => e.id)).toEqual(['a', 'b'])
})
