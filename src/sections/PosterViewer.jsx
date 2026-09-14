import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

/* The flyer, full size. On a phone the poster sits at card width and its
   own text - the line-up column, the set times, the four handles - is
   far too small to read; this is the way to actually see it. Desktop
   gets it too, since a click is a click.

   Deliberately NOT a native <dialog>: jsdom does not implement
   showModal(), so every accessibility guarantee below would become
   untestable, and those guarantees are the whole reason this component
   exists rather than a bare <img> swap.

   Closing restores focus to whatever opened it. That is handled by the
   caller rather than here, because a click does not move focus in jsdom
   and relying on document.activeElement would restore focus to <body>. */
export default function PosterViewer({ src, label, onClose }) {
  const { t } = useLang()
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)

    /* the page behind must not scroll while the flyer is up */
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div className="ev-viewer" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <button
        ref={closeRef}
        type="button"
        className="ev-viewer-close"
        aria-label={t.events.closeFlyer}
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
      </button>

      {/* the image swallows its own clicks so only the backdrop closes */}
      <img
        className="ev-viewer-img"
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
