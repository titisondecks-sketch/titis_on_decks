/* The upload desk - this site's second serverless function.

   The girls drop photos, video loops and sets straight into Vercel
   Blob from the browser. The file never travels through this function:
   a serverless request body caps out at 4.5 MB and a two-hour set is
   ten times that. Instead the client asks here for a short-lived
   upload token, then talks to Blob directly.

   So this function does exactly two things:
     1. checks the shared passcode before handing out a token, and
        pins down what may be uploaded (type + size)
     2. pings the crew on Telegram once a file has landed

   Env (Vercel project settings - never in the repo):
     UPLOAD_PASSCODE       required. The shared word the collective
                           types on uploads.titisondecks.com. Change it
                           and every old link stops working.
     BLOB_READ_WRITE_TOKEN injected automatically by the linked
                           titis-uploads store - nothing to set by hand
     TELEGRAM_BOT_TOKEN    optional - reused from the booking pipeline
     TELEGRAM_CHAT_IDS     optional - comma-separated chat ids

   Unconfigured -> 503, and the page says so instead of failing at the
   file picker. */

import { handleUpload } from '@vercel/blob/client'

/* What the desk accepts. Anything not on this list is refused by Blob
   itself, not just by the page - the token carries the restriction. */
const ALLOWED = [
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/avif',
  'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/aiff', 'audio/x-aiff',
  'audio/flac', 'audio/mp4', 'audio/x-m4a',
  'video/mp4', 'video/quicktime', 'video/webm',
]

/* 1 GB - a long WAV set fits, a stray disk image does not. The upload
   is chunked, so the ceiling costs nothing until it is used. */
const MAX_BYTES = 1024 * 1024 * 1024

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method-not-allowed' })

  const passcode = process.env.UPLOAD_PASSCODE
  if (!passcode) return res.status(503).json({ error: 'not-configured' })

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {}

  try {
    const result = await handleUpload({
      body,
      request: req,

      /* The gate. Everything the browser sent is untrusted, so the
         passcode is checked here and nowhere else - the page's own
         check is only there to fail fast and politely. */
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const p = safeJson(clientPayload || '{}')
        if (!matches(p.passcode, passcode)) throw new Error('wrong-passcode')

        return {
          allowedContentTypes: ALLOWED,
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
          /* who uploaded rides along to the completion ping */
          tokenPayload: JSON.stringify({ who: clean(p.who, 80), pathname }),
        }
      },

      /* Fires from Blob once the file has landed. Never on localhost -
         Blob needs a public URL to call back, so during `vercel dev`
         this simply stays quiet. */
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const { who } = safeJson(tokenPayload || '{}')
        await Promise.allSettled(telegramPings(blob, who))
      },
    })

    return res.status(200).json(result)
  } catch (err) {
    /* A wrong passcode is a 403, not a 500 - the page tells the
       uploader to try again instead of showing a broken desk. */
    if (err?.message === 'wrong-passcode') return res.status(403).json({ error: 'wrong-passcode' })
    console.error('upload', err)
    return res.status(400).json({ error: 'upload-failed' })
  }
}

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function safeJson(s) {
  try { return typeof s === 'string' ? JSON.parse(s) : s || {} } catch { return {} }
}

/* Length-guarded, constant-time compare - a shared word is still a
   secret, and comparing it byte by byte leaks how much of it is right. */
function matches(given, expected) {
  if (typeof given !== 'string' || given.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0
}

function telegramPings(blob, who) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chats = (process.env.TELEGRAM_CHAT_IDS || '').split(',').map((c) => c.trim()).filter(Boolean)
  if (!token || chats.length === 0) return []
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const name = blob.pathname.split('/').pop()
  const text = [
    `\u{1F4E5} <b>Neue Datei</b>${who ? ` von <b>${esc(who)}</b>` : ''}`,
    '',
    esc(name),
    blob.url,
  ].join('\n')
  return chats.map((chat_id) =>
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    }).catch((err) => console.error('telegram', err))
  )
}
