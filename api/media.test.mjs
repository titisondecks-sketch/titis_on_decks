/* @vercel/blob reaches a real store; mocked here so list/delete tests
   run offline and the passcode/pathname guards are what gets exercised,
   not the network. mock.module has to run before media.js is imported,
   since that import resolves '@vercel/blob' once at load time. */
import { beforeEach, expect, mock, spyOn, test } from 'bun:test'

let listImpl = async () => ({ blobs: [], hasMore: false })
let delImpl = async () => {}

mock.module('@vercel/blob', () => ({
  list: (...args) => listImpl(...args),
  del: (...args) => delImpl(...args),
}))

const { default: handler, matches, safePathname } = await import('./media.js')

beforeEach(() => {
  process.env.UPLOAD_PASSCODE = 'rainbow.warriors'
  process.env.BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_SECRETVALUE'
  listImpl = async () => ({ blobs: [], hasMore: false })
  delImpl = async () => {}
})

function fakeRes() {
  const res = { statusCode: null, body: null }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (body) => { res.body = body; return res }
  return res
}

test('accepts the exact word and nothing else', () => {
  expect(matches('rainbow.warriors', 'rainbow.warriors')).toBe(true)
  expect(matches('rainbow.warrior', 'rainbow.warriors')).toBe(false)
  expect(matches('', 'rainbow.warriors')).toBe(false)
  expect(matches(undefined, 'rainbow.warriors')).toBe(false)
})

/* The obvious guard - startsWith('uploads/') - passes every one of
   these except the first, which is why the first alone would be a test
   written to pass rather than to discriminate. Delete is the one
   irreversible thing this endpoint can do. */
test('refuses a pathname that climbs out of the uploads tree', () => {
  expect(safePathname('uploads/2026-07/glitta/canopy.jpg')).toBe(true)
  expect(safePathname('../secret.png')).toBe(false)
  expect(safePathname('uploads/../../../etc/passwd')).toBe(false)
  expect(safePathname('uploads/..%2f..%2fsecret.png')).toBe(false)
  expect(safePathname('')).toBe(false)
  expect(safePathname(undefined)).toBe(false)
})

test('refuses anything not configured right: wrong method, missing word, wrong passcode', async () => {
  const badMethod = fakeRes()
  await handler({ method: 'GET', body: {} }, badMethod)
  expect(badMethod.statusCode).toBe(405)

  delete process.env.UPLOAD_PASSCODE
  const noConfig = fakeRes()
  await handler({ method: 'POST', body: { passcode: 'x', action: 'list' } }, noConfig)
  expect(noConfig.statusCode).toBe(503)
  process.env.UPLOAD_PASSCODE = 'rainbow.warriors'

  const wrongWord = fakeRes()
  await handler({ method: 'POST', body: { passcode: 'nope', action: 'list' } }, wrongWord)
  expect(wrongWord.statusCode).toBe(403)
})

test('list answers with only the fields the view needs, and never leaks the store token', async () => {
  listImpl = async () => ({
    blobs: [{
      pathname: 'uploads/2026-07/glitta/a.jpg', url: 'https://example.invalid/a.jpg',
      size: 10, uploadedAt: 'now', contentType: 'image/jpeg', internalId: 'SECRETVALUE',
    }],
    hasMore: false,
  })
  const res = fakeRes()
  await handler({ method: 'POST', body: { passcode: 'rainbow.warriors', action: 'list' } }, res)

  expect(res.statusCode).toBe(200)
  expect(res.body.files).toEqual([{
    pathname: 'uploads/2026-07/glitta/a.jpg', url: 'https://example.invalid/a.jpg',
    size: 10, uploadedAt: 'now', contentType: 'image/jpeg',
  }])
  expect(JSON.stringify(res.body)).not.toContain('SECRETVALUE')
})

test('an upstream failure is logged and answered flatly, not left to crash', async () => {
  const errorSpy = spyOn(console, 'error').mockImplementation(() => {})
  delImpl = async () => { throw new Error('blob store exploded') }

  const res = fakeRes()
  await handler(
    { method: 'POST', body: { passcode: 'rainbow.warriors', action: 'delete', pathname: 'uploads/2026-07/glitta/canopy.jpg' } },
    res
  )

  expect(res.statusCode).toBe(502)
  expect(res.body).toEqual({ error: 'store-unreachable' })
  errorSpy.mockRestore()
})
