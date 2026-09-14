import LangSwitcher from '../components/LangSwitcher.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/* A tiny echo of the real logo: waveform inside a circle with a tail. */
export function WaveMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="13" r="10" stroke="currentColor" strokeWidth="2.4" />
      <polyline
        points="9,13 12,13 13.5,8.5 15.5,17.5 17.5,10 19,15 20.5,12.5 23,13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19 21.5c3.5 2.5 1.5 6-3 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export default function HomeNav() {
  const { t } = useLang()
  const n = t.home.nav

  return (
    <nav className="h-nav" aria-label="Main">
      <a className="h-mark" href="#top">
        <WaveMark />
        <span className="h-mark-text">TITIS&nbsp;ON&nbsp;DECKS</span>
      </a>
      <div className="nav-right">
        <div className="h-nav-links">
          <a href="#who">{n.who}</a>
          <a href="#story">{n.story}</a>
          <a href="#sound">{n.sound}</a>
          <a href="#gallery">{n.gallery}</a>
          <a href="#booking">{n.booking}</a>
        </div>
        <a className="nav-radio" href="/events">{n.events}</a>
        <a className="nav-radio" href="/radio">☀ {n.radio}</a>
        <LangSwitcher />
      </div>
    </nav>
  )
}
