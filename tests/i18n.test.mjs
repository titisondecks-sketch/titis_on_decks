import { expect, test } from 'bun:test'
import { translations } from '../src/i18n/translations.jsx'

const LANGS = ['de', 'pt', 'en']

/* A key added to one language and forgotten in the others renders as
   `undefined` on a live page. Compare the shapes instead of trusting
   three separate edits to have stayed in step. An array counts as one
   leaf here - see arrayLengths() below for the thing this misses. */
function shape(obj, path = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? shape(v, `${path}${k}.`)
      : [`${path}${k}`]
  ).sort()
}

/* Same walk, but every array's length instead of collapsing it to a
   leaf - the line-ups, glosses, worksNotes and learn lists that get
   zipped onto something else by index in a page, where a language one
   entry short renders an empty row rather than failing anywhere else. */
function arrayLengths(obj, path = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    if (Array.isArray(v)) return [[`${path}${k}`, v.length]]
    if (v && typeof v === 'object') return arrayLengths(v, `${path}${k}.`)
    return []
  })
}

test('every block has the same key shape in all three languages', () => {
  const [de, pt, en] = LANGS.map((l) => shape(translations[l]))
  expect(pt).toEqual(de)
  expect(en).toEqual(de)
})

test('every array - line-ups, glosses, learn lists and the rest - has the same length in all three languages', () => {
  const [de, pt, en] = LANGS.map((l) => Object.fromEntries(arrayLengths(translations[l])))
  expect(pt).toEqual(de)
  expect(en).toEqual(de)
})
