import { motion, useReducedMotion } from 'motion/react'
import Reveal from '../components/Reveal.jsx'
import Waveform from '../components/Waveform.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { rich } from '../i18n/translations.jsx'

/* Genre names stay identical across languages on purpose. */
const GENRES = [
  'underground tekno', 'acid', 'house', 'techno', 'deep house',
  'minimal', 'electronica', 'progressive', 'downtempo', 'afterhours'
]

export default function Spectrum() {
  const reduced = useReducedMotion()
  const { t } = useLang()
  const c = t.home.create

  return (
    <section className="h-section" id="create">
      <Reveal className="h-head">
        <p className="h-kicker">{c.eyebrow} <Waveform bars={7} scale={0.45} className="h-wave-inline" /></p>
        <h2 className="h-h2">{c.titlePre}<em>{c.titleEm}</em></h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="h-copy" style={{ margin: 0, color: 'var(--cream-dim)', maxWidth: 'var(--measure)' }}>
          {c.lead}
        </p>
      </Reveal>

      <ul className="h-genres" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {GENRES.map((g, i) => (
          <motion.li
            key={g}
            className="h-genre"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: 'easeOut' }}
          >
            {g}
          </motion.li>
        ))}
      </ul>

      <Reveal delay={0.15}>
        <p className="h-statement">{rich(c.statement)}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="h-copy" style={{ margin: 0, color: 'var(--cream-dim)', maxWidth: 'var(--measure)' }}>
          {c.focus}
        </p>
      </Reveal>
    </section>
  )
}
