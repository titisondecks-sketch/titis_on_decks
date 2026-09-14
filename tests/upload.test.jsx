import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, spyOn, test, vi } from 'bun:test'
import { LanguageProvider } from '../src/i18n/LanguageContext.jsx'
import Desk from '../src/sections/Desk.jsx'
import Upload from '../src/sections/Upload.jsx'
import { displayName, groupUploads, kindOf, prettySize } from '../src/sections/sent.js'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

/* Characterisation test for the send side: picking a file and
   submitting queues it, sends it, and reports the outcome - a failure
   included, since that path is the one most likely to break silently. */
test('picking a file and submitting sends it, and reports the outcome', async () => {
  /* the failed upload is retried once without a progress bar, and both
     the retry and the final failure log on purpose - muted here since
     this test exists to exercise exactly that path */
  const warnSpy = spyOn(console, 'warn').mockImplementation(() => {})
  const errorSpy = spyOn(console, 'error').mockImplementation(() => {})
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) })))
  render(<LanguageProvider><Upload /></LanguageProvider>)

  const input = document.querySelector('input[type="file"]')
  const file = new File(['x'], 'canopy.jpg', { type: 'image/jpeg' })
  Object.defineProperty(input, 'files', { value: [file], configurable: true })
  fireEvent.change(input)
  fireEvent.submit(document.querySelector('form'))

  await waitFor(() => expect(screen.getByText('canopy.jpg')).toBeDefined())
  await waitFor(() => {
    expect(document.querySelector('.up-item.is-error')).not.toBeNull()
    expect(document.querySelector('button[type="submit"]').disabled).toBe(false)
  })

  warnSpy.mockRestore()
  errorSpy.mockRestore()
})

/* The desk itself: the word is typed once on the send side and carried
   across when switching to what has landed, rather than asked again. */
test('the desk switches views, carrying the typed word across to the list request', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ files: [] }) })))
  render(<LanguageProvider><Desk /></LanguageProvider>)

  fireEvent.change(document.querySelector('input[type="password"]'), {
    target: { value: 'rainbow.warriors' },
  })
  fireEvent.click(screen.getByRole('button', { name: /^Sent$/i }))

  expect(screen.queryByRole('button', { name: /^Upload$/i })).toBeNull()
  await waitFor(() => expect(fetch).toHaveBeenCalled())
  const body = JSON.parse(fetch.mock.calls[0][1].body)
  expect(body.passcode).toBe('rainbow.warriors')
  expect(body.action).toBe('list')

  fireEvent.click(screen.getByRole('button', { name: /^Send$/i }))
  expect(screen.getByRole('button', { name: /^Upload$/i })).toBeDefined()
})

/* The pure helpers behind the Sent view - naming, sizing and grouping a
   file the store handed back - can break silently since nothing at
   build time checks a regex against a real filename. */
test('sent.js reads a kind, a clean name, a human size and groups by month then by who', () => {
  expect(kindOf({ pathname: 'a.jpg', contentType: 'image/jpeg' })).toBe('image')
  expect(kindOf({ pathname: 'set.MP3' })).toBe('audio')
  expect(kindOf({ pathname: 'notes.txt', contentType: 'text/plain' })).toBe('other')

  expect(displayName('uploads/2026-07/enduser/probe upload test-jrcHlLDmV0tKeuitXHGvTSesvwQpL7.png'))
    .toBe('probe upload test.png')
  expect(displayName('uploads/2026-07/lutzi/dawn-set-live.mp3')).toBe('dawn-set-live.mp3')

  expect(prettySize(2_400_000)).toBe('2.4 MB')
  expect(prettySize(74)).toBe('1 kB')

  const groups = groupUploads([
    { pathname: 'uploads/2026-06/lutzi/a.jpg' },
    { pathname: 'uploads/2026-07/glitta/b.jpg' },
    { pathname: 'uploads/2026-07/lutzi/c.jpg' },
  ])
  expect(groups.map((g) => g.month)).toEqual(['2026-07', '2026-06'])
  expect(groups[0].people.map((p) => p.who)).toEqual(['glitta', 'lutzi'])
})
