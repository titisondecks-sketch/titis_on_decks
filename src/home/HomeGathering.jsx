import { motion, useReducedMotion } from 'motion/react'
import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { BOOKING_EMAIL } from '../contact.js'

/* The next-gathering flyer. The lineup is still the wonderland
   placeholder until real dates exist - swap t.home.gathering then. */
export default function HomeGathering({ live = false }) {
  const reduced = useReducedMotion()
  const { t } = useLang()
  const g = t.home.gathering
  const mailTo = live ? BOOKING_EMAIL : 'hello@titisondecks.example'

  return (
    <section className="h-section" id="gathering">
      <Reveal className="h-head">
        <p className="h-kicker">{g.eyebrow}</p>
        <h2 className="h-h2">{g.titlePre}<em>{g.titleEm}</em></h2>
      </Reveal>

      <Reveal delay={0.1}>
        <article className="h-flyer">
          <div className="flyer-top">
            <h3 className="flyer-name">{g.flyerPre}<em>{g.flyerEm}</em></h3>
            <p className="flyer-meta">{g.meta}</p>
          </div>

          <div className="timetable-wrap">
            <table className="timetable">
              <thead>
                <tr><th scope="col">{g.th.time}</th><th scope="col">{g.th.act}</th><th scope="col">{g.th.style}</th></tr>
              </thead>
              <tbody>
                {g.slots.map((slot, i) => (
                  <motion.tr
                    key={slot.time}
                    className={slot.headline ? 'is-headline' : undefined}
                    initial={reduced ? false : { opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
                  >
                    <td className="tt-time">{slot.time}</td>
                    <td className="tt-act">{slot.act}</td>
                    <td className="tt-style">{slot.style}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flyer-foot">
            <span>{g.foot}</span>
            <a className="h-btn" href={`mailto:${mailTo}?subject=${encodeURIComponent(g.mailSubject)}`}>{g.cta}</a>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
