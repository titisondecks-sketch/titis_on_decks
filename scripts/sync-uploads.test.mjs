import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'bun:test'
import { existingUnder, listAll, localPathFor, planSync } from './sync-uploads.mjs'

test('plans a download for what is missing, skips what is already on disk, and drops the uploads/ prefix', () => {
  const blobs = [{ pathname: 'uploads/2026-07/glitta/canopy-aB3xy9.jpg' }]

  expect(planSync(blobs, []).fetch).toEqual(blobs)
  expect(planSync(blobs, ['2026-07/glitta/canopy-aB3xy9.jpg']).fetch).toHaveLength(0)
  expect(localPathFor('uploads/2026-07/glitta/canopy-aB3xy9.jpg')).toBe('2026-07/glitta/canopy-aB3xy9.jpg')
})

test('lists what is already downloaded, nested folders and all, and treats a missing folder as empty', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'titis-sync-'))
  await mkdir(join(dir, '2026-07', 'glitta'), { recursive: true })
  await writeFile(join(dir, '2026-07', 'glitta', 'canopy-aB3xy9.jpg'), 'x')
  await writeFile(join(dir, 'loose.jpg'), 'x')

  expect((await existingUnder(dir)).sort()).toEqual(['2026-07/glitta/canopy-aB3xy9.jpg', 'loose.jpg'])
  expect(await existingUnder(join(tmpdir(), 'titis-sync-nothing-here'))).toEqual([])
})

/* The store answers in pages. Ask once and you get the first page and a
   promise that there is more; ignore that and the older half of the
   collective's photos quietly never arrives. */
test('keeps asking the store until it says there is nothing more, and stops after one page when that is all', async () => {
  const pages = [
    { blobs: [{ pathname: 'uploads/2026-07/a.jpg' }], hasMore: true, cursor: 'page-2' },
    { blobs: [{ pathname: 'uploads/2026-06/b.jpg' }], hasMore: false },
  ]
  const cursorsAsked = []
  const all = await listAll(async ({ cursor }) => {
    cursorsAsked.push(cursor)
    return pages.shift()
  })

  expect(all.map((b) => b.pathname)).toEqual(['uploads/2026-07/a.jpg', 'uploads/2026-06/b.jpg'])
  expect(cursorsAsked).toEqual([undefined, 'page-2'])

  let calls = 0
  const single = await listAll(async () => {
    calls++
    return { blobs: [{ pathname: 'uploads/2026-07/only.jpg' }], hasMore: false }
  })
  expect(single).toHaveLength(1)
  expect(calls).toBe(1)
})
