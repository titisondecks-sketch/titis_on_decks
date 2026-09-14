import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Credit from '../components/Credit.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { PROFILE_URLS } from './sets.js'

export default function Finale({ variant = 'home', live = false }) {
  const { lang, t } = useLang()
  const f = t.home.finale
  const skinLink = variant === 'pink'
    ? { href: '/', label: t.home.river.warmLink }
    : { href: '/pink', label: t.home.river.pinkLink }

  return (
    /* on the living pages the booking form owns the #booking anchor */
    <footer className="h-finale" id={live ? undefined : 'booking'}>
      <div className="h-finale-inner">
        <Reveal>
          <p className="h-finale-kicker">{f.kicker}</p>
        </Reveal>
        <p key={lang} className="h-finale-title">
          {f.titleLines.map((line, i) => (
            <SplitText key={line} as="span" className="h-finale-line" text={line} stagger={0.05} delay={i * 0.3} once />
          ))}
        </p>
        <Reveal delay={0.2}>
          <p className="h-finale-sub">{f.sub}</p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="h-finale-links">
            {live ? (
              <a href="#booking">{f.cta}</a>
            ) : (
              <a href={`mailto:hello@titisondecks.example?subject=${encodeURIComponent(f.mailSubject)}`}>{f.cta}</a>
            )}
            <a href={PROFILE_URLS.collective} target="_blank" rel="noreferrer">SoundCloud · TiTis</a>
            <a href={PROFILE_URLS.lutzi} target="_blank" rel="noreferrer">SoundCloud · Lutzi</a>
            <a href={PROFILE_URLS.glitta} target="_blank" rel="noreferrer">SoundCloud · Glitta</a>
            <a href="https://www.instagram.com/titis_on_decks/" target="_blank" rel="noreferrer">{f.instagram}</a>
          </div>
        </Reveal>
      </div>
      <div className="h-river">
        <div className="h-river-inner">
          <p>{t.home.river.left}</p>
          <p>{t.home.river.right}</p>
          <p><a href={skinLink.href}>{skinLink.label}</a></p>
        </div>
        {/* living pages only - the drafts stay frozen */}
        {live && <Credit />}
      </div>
    </footer>
  )
}
