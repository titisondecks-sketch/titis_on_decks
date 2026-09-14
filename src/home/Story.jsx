import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { rich } from '../i18n/translations.jsx'

export default function Story() {
  const { t } = useLang()
  const s = t.home.story

  return (
    <section className="h-section" id="story">
      <Reveal className="h-head">
        <p className="h-kicker">{s.eyebrow}</p>
        <h2 className="h-h2">{s.titlePre}<em>{s.titleEm}</em></h2>
      </Reveal>
      <div className="h-story-grid">
        <Reveal delay={0.1}>
          <blockquote className="h-quote" style={{ margin: 0 }}>
            <em>{s.quote}</em>
          </blockquote>
        </Reveal>
        <Reveal className="h-copy" delay={0.2}>
          {s.paragraphs.map((p, i) => (
            <p key={i}>{rich(p)}</p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
