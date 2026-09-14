import { useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/* Blob's multipart minimum part size. Anything smaller uploads whole. */
const MULTIPART_FROM = 5 * 1024 * 1024

/* Failures a second attempt cannot fix: the word is wrong, or the desk
   has no word configured at all. Retrying those only fails slower. */
const terminal = (err) => /403|passcode|503|not-configured/i.test(err?.message || '')

/* The send side of the desk. Replaces the old Dropbox redirect, which
   sent the girls to a cryptic dropboxusercontent link - and let anyone
   who found the subdomain download the whole folder as a zip.

   Files go from the browser straight to Vercel Blob. /api/upload only
   hands out a short-lived token once the shared passcode checks out,
   so nothing large ever passes through a function.

   The word lives in Desk, not here, because the Sent side needs the
   same one and nobody should have to type it twice. The page chrome
   lives there too - this renders only its own blocks. */
export default function Upload({ passcode = '', onPasscode = () => {} }) {
  const { t } = useLang()
  const u = t.upload
  const fileRef = useRef(null)
  const [who, setWho] = useState('')
  const [items, setItems] = useState([])
  const [busy, setBusy] = useState(false)
  const [fault, setFault] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    const files = Array.from(fileRef.current?.files || [])
    if (files.length === 0 || busy) return

    setBusy(true)
    setFault(null)
    setItems(files.map((f) => ({ name: f.name, size: f.size, pct: 0, status: 'queued' })))

    /* One at a time on purpose: phone uplinks are thin, and a set
       uploading at full speed beats four fighting for the same pipe. */
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        patch(i, { status: 'uploading' })
        let blob
        try {
          blob = await send(file, i, true)
        } catch (err) {
          /* A refused passcode or an unconfigured desk will refuse the
             second time too - only retry what might actually differ. */
          if (terminal(err)) throw err
          console.warn('upload retrying without progress', file.name, err?.message)
          patch(i, { pct: 0, blind: true })
          blob = await send(file, i, false)
        }
        patch(i, { status: 'done', pct: 100, blind: false, url: blob.url })
      } catch (err) {
        /* The desk is used from phones at 4am; when something fails
           there is no one to ask. Leave the real reason in the console
           so a failure can be diagnosed after the fact instead of
           reproduced. */
        console.error('upload failed', file.name, err)
        /* A bad passcode fails every file the same way - say it once,
           at the top, and stop rather than grinding through the rest. */
        if (/403|passcode/i.test(err?.message || '')) {
          patch(i, { status: 'error' })
          setFault('passcode')
          break
        }
        if (/503|not-configured/i.test(err?.message || '')) {
          patch(i, { status: 'error' })
          setFault('offline')
          break
        }
        patch(i, { status: 'error' })
      }
    }
    setBusy(false)
  }

  /* The only difference between the two attempts is the progress bar,
     and that difference is the whole point. Asking the SDK for
     progress makes it wrap the file in a ReadableStream so it can
     count bytes on the way past; without it the file is handed to
     fetch whole. Anything sitting between the page and the network -
     a traffic-inspecting extension, a debugging proxy, a corporate
     middlebox - can read that stream and pass on a spent one, and the
     browser then refuses to send it ("ReadableStream is disturbed").
     A plain body has nothing to disturb. So: show progress if we can,
     and if the upload fails for any reason that could differ on a
     second try, send the file whole instead. A bar that stops moving
     is a small price for a file that arrives. */
  async function send(file, i, withProgress) {
    return upload(pathFor(file, who), file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      clientPayload: JSON.stringify({ passcode, who: who.trim() }),
      /* Multipart splits a file into parts and uploads them in
         parallel, but a part has to be at least 5 MB. Below that the
         handshake is pure overhead, so a phone photo goes up as one
         plain request and only a set takes the parallel path. */
      multipart: file.size > MULTIPART_FROM,
      ...(withProgress
        ? { onUploadProgress: ({ percentage }) => patch(i, { pct: Math.round(percentage) }) }
        : {}),
    })
  }

  function patch(i, next) {
    setItems((prev) => prev.map((it, n) => (n === i ? { ...it, ...next } : it)))
  }

  const done = items.filter((it) => it.status === 'done').length

  return (
    <>
      <Reveal>
          <p className="h-kicker">{u.eyebrow}</p>
          <h1 className="up-title">{u.titlePre}<em>{u.titleEm}</em></h1>
          <p className="up-intro">{u.intro}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="bk-form up-form" onSubmit={onSubmit}>
            <div className="bk-grid">
              <label className="bk-field">
                <span>{u.who}</span>
                <input
                  value={who}
                  onChange={(e) => setWho(e.target.value)}
                  maxLength={80}
                  autoComplete="nickname"
                  placeholder={u.whoPh}
                />
              </label>
              <label className="bk-field">
                <span>{u.passcode}</span>
                <input
                  value={passcode}
                  onChange={(e) => onPasscode(e.target.value)}
                  type="password"
                  required
                  maxLength={120}
                  autoComplete="off"
                  placeholder={u.passcodePh}
                />
              </label>
            </div>

            <label className="bk-field">
              <span>{u.files}</span>
              <input ref={fileRef} type="file" multiple required className="up-file" />
            </label>

            <div className="bk-actions">
              <button className="h-btn bk-submit" type="submit" disabled={busy}>
                {busy ? u.sending : u.submit}
              </button>
              {fault === 'passcode' && <p className="bk-note up-fault">{u.wrongPasscode}</p>}
              {fault === 'offline' && <p className="bk-note up-fault">{u.offline}</p>}
            </div>

            <p className="up-hint">{u.hint}</p>
          </form>
        </Reveal>

        {items.length > 0 && (
          <Reveal delay={0.1}>
            <ul className="up-list">
              {items.map((it, i) => (
                <li key={i} className={`up-item is-${it.status}${it.blind ? ' is-blind' : ''}`}>
                  <span className="up-name">{it.name}</span>
                  <span className="up-meta">
                    {it.status === 'done' ? u.landed
                      : it.status === 'error' ? u.failed
                      /* no byte count on the second attempt - say it is
                         moving rather than claim a percentage we lost */
                      : it.status === 'uploading' ? (it.blind ? u.sending : `${it.pct}%`)
                      : u.queued}
                  </span>
                  <span className="up-bar" aria-hidden="true">
                    <i style={{ width: `${it.status === 'done' || it.blind ? 100 : it.pct}%` }} />
                  </span>
                </li>
              ))}
            </ul>
            {done > 0 && !busy && (
              <p className="up-done">{done === 1 ? u.doneOne : u.doneMany.replace('{n}', done)}</p>
            )}
          </Reveal>
      )}
    </>
  )
}

/* uploads/2026-07/glitta/nachtsession.wav - sorted by month, then by
   whoever sent it, so the folder stays readable a year from now. The
   server adds a random suffix, so two files of the same name never
   collide. */
function pathFor(file, who) {
  const d = new Date()
  const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  const slug = slugify(who) || 'anon'
  return `uploads/${month}/${slug}/${file.name}`
}

const slugify = (s) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
