import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Spores from '../components/Spores.jsx'
import Waveform from '../components/Waveform.jsx'
import { WaveMark } from '../home/HomeNav.jsx'
import { PROFILE_URLS } from '../home/sets.js'
import { BOOKING_EMAIL } from '../contact.js'
import { useLang } from '../i18n/LanguageContext.jsx'

const WARM_SPORES = ['#ffb32e', '#f4ff3d', '#ff7a2e', '#b8ff2e', '#fff4e0']

/* The curtain page: what the public domains show while the collective
   sorts things out. The full site keeps living on staging. Also
   reachable directly at /soon on any host, for review. */
export default function Soon() {
  const { lang, t } = useLang()
  const s = t.soon

  return (
    <div className="soon">
      <div className="soon-atmo" aria-hidden="true">
        <Spores colors={WARM_SPORES} />
      </div>

      <header className="soon-top">
        <span className="soon-mark">
          <WaveMark size={22} />
          TITIS&nbsp;ON&nbsp;DECKS
        </span>
        <LangSwitcher />
      </header>

      <main className="soon-main">
        <p className="soon-kicker">{s.kicker}</p>
        <h1 key={lang} className="h-title soon-title">
          <SplitText as="span" className="row t-sun" text="TiTis" delay={0.2} stagger={0.09} />
          <SplitText as="span" className="t-on" text="on" delay={0.75} stagger={0.09} />
          <SplitText as="span" className="row t-uvy" text="Decks" delay={1.0} stagger={0.09} />
        </h1>
        <Waveform bars={9} scale={0.7} className="soon-wave" />

        <Reveal delay={0.3}>
          <p className="soon-line">{s.line}</p>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="soon-links">
            <a href={PROFILE_URLS.collective} target="_blank" rel="noreferrer">SoundCloud</a>
            <a href="https://www.instagram.com/titis_on_decks/" target="_blank" rel="noreferrer">Instagram</a>
            <a href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(s.mailSubject)}`}>{s.contact}</a>
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="soon-values">{s.values}</p>
        </Reveal>
      </main>
    </div>
  )
}
