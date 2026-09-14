import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import EventCard from '../sections/EventCard.jsx'
import { EVENTS } from '../sections/eventsData.js'
import { upcomingEvents } from '../sections/events.js'

/* The next two nights, on the way down the home page. When there is
   nothing coming it renders nothing at all - a heading standing over an
   empty space would be worse than silence. */
export default function HomeNextDates({ events = EVENTS, now = new Date() }) {
  const { t } = useLang()
  const v = t.home.nextDates
  const next = upcomingEvents(events, now).slice(0, 2)

  if (next.length === 0) return null

  return (
    <section className="h-section" id="dates">
      <Reveal className="h-head">
        <p className="h-kicker">{v.eyebrow}</p>
        <h2 className="h-h2">{v.titlePre}<em>{v.titleEm}</em></h2>
      </Reveal>

      <div className="ev-list ev-list-teaser">
        {next.map((e, i) => (
          <Reveal key={e.id} delay={0.1 + i * 0.1}>
            <EventCard event={e} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="ev-all"><a className="h-btn-ghost" href="/events">{v.all} →</a></p>
      </Reveal>
    </section>
  )
}
