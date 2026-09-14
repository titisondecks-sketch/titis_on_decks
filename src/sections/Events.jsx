import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Spores from '../components/Spores.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { BOOKING_EMAIL } from '../contact.js'
import EventCard from './EventCard.jsx'
import { EVENTS } from './eventsData.js'
import { upcomingEvents } from './events.js'

/* Night spores for the dates page - the home palette's own sun, ember,
   UV yellow, acid and cream, same trick Radio plays with its dawn set.
   Module scope because Spores wants a stable array. */
const NIGHT_SPORES = ['#ffb32e', '#ff7a2e', '#f4ff3d', '#b8ff2e', '#fff4e0']

/* Where the collective plays next. Upcoming only - past nights stay in
   eventsData.js untouched, waiting for the archive to want them.

   The soonest gig is the hero: the page usually holds exactly one event
   and sometimes none, so it is built to make one night feel like the
   point rather than like a list that ran short.

   `events` and `now` are props so a test can stand on any date. In the
   app both take their defaults. */
export default function Events({ events = EVENTS, now = new Date() }) {
  const { lang, t } = useLang()
  const v = t.events
  const list = upcomingEvents(events, now)

  return (
    <div className="ev-page">
      <div className="ev-atmo" aria-hidden="true">
        <Spores colors={NIGHT_SPORES} />
      </div>

      <header className="ev-top">
        <a className="ev-back" href="/">← {v.back}</a>
        <LangSwitcher />
      </header>

      <main className="ev-main">
        <p className="ev-kicker">{v.kicker}</p>
        <SplitText key={lang} as="h1" className="ev-h1" text={v.title} stagger={0.06} />
        <Reveal delay={0.25}>
          <p className="ev-intro">{v.intro}</p>
        </Reveal>

        {list.length > 0 ? (
          <>
            <div className="ev-list">
              {list.map((e, i) => (
                <Reveal key={e.id} delay={0.1 + i * 0.08}>
                  <EventCard event={e} hero={i === 0} titleAs="h2" />
                </Reveal>
              ))}
            </div>

            {/* A floor for the page, and the only honest thing left to
                say once the dates have been read. Rendered only when
                there are dates - the empty state carries this CTA
                itself, and two of them would be one too many. */}
            <Reveal delay={0.2}>
              <div className="ev-foot">
                <p className="ev-foot-line">{v.moreLine}</p>
                <a
                  className="h-btn h-btn-ghost"
                  href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(v.emptyCta)}`}
                >
                  {v.emptyCta}
                </a>
              </div>
            </Reveal>
          </>
        ) : (
          <Reveal delay={0.1}>
            <div className="ev-empty">
              <h2 className="ev-empty-title">{v.emptyTitle}</h2>
              <p className="ev-empty-body">{v.emptyBody}</p>
              <a
                className="h-btn"
                href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(v.emptyCta)}`}
              >
                {v.emptyCta}
              </a>
            </div>
          </Reveal>
        )}
      </main>
    </div>
  )
}
