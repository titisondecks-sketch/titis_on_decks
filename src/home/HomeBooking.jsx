import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { BOOKING_EMAIL } from '../contact.js'

/* The real booking pipeline (living pages only - drafts never render
   this). Posts to /api/booking, a Vercel function that mails the
   collective, sends the requester a styled confirmation and pings the
   crew on Telegram. While the function is unconfigured it answers 503
   and the form falls back to a plain mail draft, so a request never
   dead-ends. */
export default function HomeBooking() {
  const { lang, t } = useLang()
  const b = t.home.bookingForm
  const [status, setStatus] = useState('idle')
  const [fallbackHref, setFallbackHref] = useState(null)
  const today = new Date()
  const todayLocal = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  async function onSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setStatus('sending')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      })
      if (res.ok) {
        setStatus('done')
        return
      }
      if (res.status === 400) {
        setStatus('error')
        return
      }
      throw new Error(`booking api answered ${res.status}`)
    } catch {
      const body = [data.name, data.date, data.place, '', data.message].filter(Boolean).join('\n')
      setFallbackHref(
        `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(t.home.finale.mailSubject)}&body=${encodeURIComponent(body)}`
      )
      setStatus('fallback')
    }
  }

  return (
    <section className="h-section" id="booking">
      <Reveal className="h-head">
        <p className="h-kicker">{b.eyebrow}</p>
        <h2 className="h-h2">{b.titlePre}<em>{b.titleEm}</em></h2>
      </Reveal>

      {status === 'done' ? (
        <Reveal className="bk-done">
          <p className="bk-done-title">{b.doneTitle}</p>
          <p className="bk-done-line">{b.doneLine}</p>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <form className="bk-form" onSubmit={onSubmit}>
            <p className="bk-intro">{b.intro}</p>
            <div className="bk-grid">
              <label className="bk-field">
                <span>{b.name}</span>
                <input name="name" required maxLength={120} autoComplete="name" placeholder={b.namePh} />
              </label>
              <label className="bk-field">
                <span>{b.email}</span>
                <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder={b.emailPh} />
              </label>
              <label className="bk-field">
                <span>{b.date}</span>
                <input name="date" type="date" min={todayLocal} maxLength={120} />
              </label>
              <label className="bk-field">
                <span>{b.place}</span>
                <input name="place" maxLength={160} placeholder={b.placePh} />
              </label>
            </div>
            <label className="bk-field">
              <span>{b.message}</span>
              <textarea name="message" required rows={5} maxLength={4000} placeholder={b.messagePh} />
            </label>
            <input className="bk-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="bk-actions">
              <button className="h-btn bk-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? b.sending : b.submit}
              </button>
              {status === 'fallback' && fallbackHref && (
                <p className="bk-note">{b.fallbackLine} <a href={fallbackHref}>{b.fallbackCta}</a></p>
              )}
              {status === 'error' && <p className="bk-note">{b.errorLine}</p>}
            </div>
          </form>
        </Reveal>
      )}
    </section>
  )
}
