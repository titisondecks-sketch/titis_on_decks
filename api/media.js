/* The dashboard's back office.

   The upload desk hands out write tokens; this hands out the list and
   takes things away again. Both are gated on the same shared word the
   girls already type to upload, and the store's read-write token never
   leaves this function.

   One word for both is a deliberate choice: whoever can send can also
   delete. For a collective of two who trust each other that is the
   right amount of ceremony, and a second admin word would be friction
   without a threat model behind it. If that ever stops being true, the
   change is one env var and one comparison.

   Env (Vercel project settings - never in the repo):
     UPLOAD_PASSCODE        required, the same word as the upload desk
     BLOB_READ_WRITE_TOKEN  injected by the linked titis-uploads store

   Everything is POST, including the read: the word travels in a body
   so it never lands in an access log or a browser history entry. */

import { del, list } from '@vercel/blob'

/* Length-guarded, constant-time compare - a shared word is still a
   secret, and comparing it byte by byte leaks how much of it is right. */
export function matches(given, expected) {
  if (typeof given !== 'string' || typeof expected !== 'string') return false
  if (given.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0
}

/* Delete is the one irreversible thing here, so the pathname has to
   earn it rather than merely look plausible. `startsWith('uploads/')`
   alone would wave through 'uploads/../../../etc/passwd'; requiring
   the full month/who/name shape and refusing anything with a dot
   segment or an escape sequence in it leaves nothing to resolve
   later. */
const SHAPE = /^uploads\/[^/]+\/[^/]+\/[^/]+$/

export function safePathname(pathname) {
  if (typeof pathname !== 'string' || pathname === '') return false
  const decoded = safeDecode(pathname)
  if (decoded.includes('..') || decoded.includes('\\') || decoded.includes('\0')) return false
  return SHAPE.test(decoded) && decoded === pathname
}

function safeDecode(s) {
  try { return decodeURIComponent(s) } catch { return s }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method-not-allowed' })

  const expected = process.env.UPLOAD_PASSCODE
  if (!expected) return res.status(503).json({ error: 'not-configured' })

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {}
  if (!matches(body.passcode, expected)) return res.status(403).json({ error: 'wrong-passcode' })

  const token = process.env.BLOB_READ_WRITE_TOKEN

  try {
    if (body.action === 'list') {
      /* The store answers in pages. Asking once works right until the
         collective has sent more than a page, then the older half
         silently stops appearing. */
      const blobs = []
      let cursor
      do {
        const page = await list({ token, cursor })
        blobs.push(...page.blobs)
        cursor = page.hasMore ? page.cursor : undefined
      } while (cursor)

      /* Only the fields the view renders. Everything else on a blob
         record is store plumbing with no business in a browser. */
      return res.status(200).json({
        files: blobs.map((b) => ({
          pathname: b.pathname,
          url: b.url,
          size: b.size,
          uploadedAt: b.uploadedAt,
          contentType: b.contentType,
        })),
      })
    }

    if (body.action === 'delete') {
      if (!safePathname(body.pathname)) return res.status(400).json({ error: 'bad-pathname' })
      await del(body.pathname, { token })
      return res.status(200).json({ ok: true })
    }

    return res.status(400).json({ error: 'unknown-action' })
  } catch (err) {
    /* Log the real reason, answer with a flat one - a store error can
       carry the store id and other things a browser has no use for. */
    console.error('media', body.action, err)
    return res.status(502).json({ error: 'store-unreachable' })
  }
}

function safeJson(s) {
  try { return typeof s === 'string' ? JSON.parse(s) : s || {} } catch { return {} }
}
