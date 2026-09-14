import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { rich } from '../i18n/translations.jsx'
import { aboutPhoto } from './media.js'

export default function Collective() {
  const { t } = useLang()
  const w = t.home.who

  return (
    <section className="h-section" id="who">
      <Reveal className="h-head">
        <p className="h-kicker">{w.eyebrow}</p>
        <h2 className="h-h2">{w.titlePre}<em>{w.titleEm}</em></h2>
      </Reveal>
      <div className="h-who-grid">
        <Reveal className="h-copy" delay={0.1}>
          {w.paragraphs.map((p, i) => (
            <p key={i}>{rich(p)}</p>
          ))}
        </Reveal>
        <div style={{ display: 'grid', gap: '1.2rem' }}>
          <Reveal delay={0.25}>
            <aside className="h-facts" aria-label={w.factsLabel}>
              <dl>
                {w.facts.map((fact) => (
                  <div key={fact.dt}><dt>{fact.dt}</dt><dd>{fact.dd}</dd></div>
                ))}
              </dl>
            </aside>
          </Reveal>
          {aboutPhoto && (
            <Reveal delay={0.35}>
              <figure className="h-who-photo">
                <img src={aboutPhoto.src} alt={aboutPhoto.alt} loading="lazy" />
              </figure>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
