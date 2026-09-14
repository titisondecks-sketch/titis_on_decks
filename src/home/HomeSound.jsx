import Reveal from '../components/Reveal.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { SET_LINKS, PROFILE_URLS } from './sets.js'

function PlayGlyph() {
  return (
    <span className="h-set-play" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5 12 7 3 12.5z" fill="currentColor" /></svg>
    </span>
  )
}

export default function HomeSound() {
  const { t } = useLang()
  const s = t.home.sound

  return (
    <section className="h-section" id="sound">
      <Reveal className="h-head">
        <p className="h-kicker">{s.eyebrow}</p>
        <h2 className="h-h2">{s.titlePre}<em>{s.titleEm}</em></h2>
      </Reveal>

      <div className="h-sets">
        {s.sets.map((set, i) => {
          const link = SET_LINKS[i]
          return (
            <Reveal key={set.title} delay={i * 0.12}>
              <TiltCard
                as="a"
                className="h-set"
                href={link.href}
                aria-label={set.aria}
                target="_blank"
                rel="noreferrer"
              >
                {link.photo && (
                  <span
                    className="h-set-photo"
                    style={{ backgroundImage: `url(${link.photo.src})` }}
                    aria-hidden="true"
                  />
                )}
                {link.artist && <span className="h-set-artist">{link.artist}</span>}
                <PlayGlyph />
                <h3 className="h-set-title">{set.title}</h3>
                <p className="h-set-desc">{set.desc}</p>
                <span className="h-set-meta">{set.meta}</span>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.25}>
        <div className="h-profiles">
          <a href={PROFILE_URLS.collective} target="_blank" rel="noreferrer">soundcloud.com/titisondecks</a>
          <a href={PROFILE_URLS.lutzi} target="_blank" rel="noreferrer">soundcloud.com/dielu</a>
          <a href={PROFILE_URLS.glitta} target="_blank" rel="noreferrer">soundcloud.com/glittawicca</a>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="h-note">
          {s.note}
          <br />
          <a className="sound-radio-link" href="/radio">{s.radioCta}</a>
        </p>
      </Reveal>
    </section>
  )
}
