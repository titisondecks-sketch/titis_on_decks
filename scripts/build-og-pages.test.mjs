import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'bun:test'
import { PAGES, pageHtml } from './build-og-pages.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = await readFile(join(ROOT, 'index.html'), 'utf8')

/* Every route with its own card needs its own everything - two entries
   that shared a title, an address or an image would unfurl as each
   other, and the home card's own words must be gone from every slot. */
test.each(PAGES.map((p) => [p.file, p]))('%s gets its own card, with the app still wired to boot', (file, page) => {
  const out = pageHtml(source, page)

  expect(out).toContain(`<title>${page.title}</title>`)
  expect(out).toContain(`<link rel="canonical" href="${page.url}">`)
  expect(out).toContain(`content="${page.image}"`)
  expect(out).not.toContain('a female DJ collective')
  expect(out).not.toContain('og-card.jpg')
  expect(out).toContain('<div id="root"></div>')
  expect(out).toMatch(/<script type="module" src="[^"]+"><\/script>/)
})

test('every page has its own address and image, and a tag it cannot swap exactly once stops the build', () => {
  expect(new Set(PAGES.map((p) => p.url)).size).toBe(PAGES.length)
  expect(new Set(PAGES.map((p) => p.image)).size).toBe(PAGES.length)

  const nubreed = PAGES.find((p) => p.file === 'nubreed.html')
  expect(() => pageHtml(source.replace('<link rel="canonical" href="https://www.titisondecks.com/">', ''), nubreed))
    .toThrow(/canonical/)
  expect(() => pageHtml(source + source, nubreed)).toThrow()
})
