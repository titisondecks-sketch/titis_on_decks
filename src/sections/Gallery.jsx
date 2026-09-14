import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { displayName, groupUploads, kindOf, prettySize } from './sent.js'

/* What the collective has already sent, laid out the way the store is:
   newest month first, then whoever sent it.

   The word comes down from the desk rather than being asked for a
   second time - if you got this far you already typed it. Mount this
   before anything has been typed and there is simply nothing to ask
   with, which is a prompt rather than a failure. */
export default function Gallery({ passcode }) {
  const { t } = useLang()
  const g = t.gallery
  const [state, setState] = useState(passcode ? 'loading' : 'needs-word')
  const [files, setFiles] = useState([])
  const [asking, setAsking] = useState(null)

  /* Two clicks, because this is final - Blob has no bin, and one stray
     tap on a phone should not be able to lose a night nobody
     photographed twice. The first click only turns the button into the
     question. */
  async function remove(pathname) {
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode, action: 'delete', pathname }),
      })
      if (!res.ok) throw new Error(`media api answered ${res.status}`)
      setFiles((prev) => prev.filter((f) => f.pathname !== pathname))
    } catch (err) {
      console.error('gallery delete', err)
      setState('failed')
    } finally {
      setAsking(null)
    }
  }

  useEffect(() => {
    if (!passcode) {
      setState('needs-word')
      return
    }
    let alive = true
    setState('loading')
    ;(async () => {
      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode, action: 'list' }),
        })
        if (!res.ok) throw new Error(`media api answered ${res.status}`)
        const data = await res.json()
        if (!alive) return
        setFiles(data.files || [])
        setState('ready')
      } catch (err) {
        console.error('gallery', err)
        if (alive) setState('failed')
      }
    })()
    return () => { alive = false }
  }, [passcode])

  if (state === 'needs-word') return <p className="gal-note">{g.needsWord}</p>
  if (state === 'loading') return <p className="gal-note">{g.loading}</p>
  if (state === 'failed') return <p className="gal-note gal-fault">{g.failed}</p>
  if (files.length === 0) return <p className="gal-note">{g.empty}</p>

  return (
    <div className="gal">
      {groupUploads(files).map((group) => (
        <Reveal key={group.month} className="gal-month">
          <p className="h-kicker">{group.month}</p>
          {group.people.map((person) => (
            <div key={person.who} className="gal-person">
              <p className="gal-who">{person.who}</p>
              <ul className="gal-grid">
                {person.files.map((file) => (
                  <li key={file.pathname} className={`gal-item is-${kindOf(file)}`}>
                    <Preview file={file} />
                    <span className="gal-name">{displayName(file.pathname)}</span>
                    <span className="gal-size">{prettySize(file.size)}</span>
                    {asking === file.pathname ? (
                      <span className="gal-confirm">
                        <button
                          type="button"
                          className="gal-btn gal-btn-danger"
                          onClick={() => remove(file.pathname)}
                        >
                          {g.confirm}
                        </button>
                        <button type="button" className="gal-btn" onClick={() => setAsking(null)}>
                          {g.cancel}
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="gal-btn"
                        onClick={() => setAsking(file.pathname)}
                      >
                        {g.remove}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      ))}
    </div>
  )
}

/* Audio and video load nothing until asked - the girls open this on
   phones, and a month of sets preloading would cost them their data
   before they had picked anything. */
function Preview({ file }) {
  const kind = kindOf(file)
  if (kind === 'image') return <img className="gal-thumb" src={file.url} alt="" loading="lazy" />
  if (kind === 'video') return <video className="gal-thumb" src={file.url} controls preload="none" />
  if (kind === 'audio') return <audio className="gal-audio" src={file.url} controls preload="none" />
  return <a className="gal-thumb gal-file" href={file.url} target="_blank" rel="noreferrer">↓</a>
}
