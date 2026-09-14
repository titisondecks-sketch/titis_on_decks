import { useRef, useState } from 'react'
import TiltCard from '../components/TiltCard.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { formatEventDate } from './events.js'
import { WaveMark } from '../home/HomeNav.jsx'
import PosterViewer from './PosterViewer.jsx'

/* One night. The poster is shown whole, at whatever shape it arrives in,
   and nothing is printed on top of it. Layout D cropped a 4:5 flyer into
   a letterbox - losing the figure the artwork is built around - and then
   reprinted the flyer's own headline in plain sans directly underneath,
   so the card said the same words twice in two competing typefaces.

   Now the two halves say different things: the poster carries the
   recognition, the words beside it carry what a flyer is bad at - when
   it opens, where it is, who is on. Every reader-facing word sits on
   flat coal rather than on artwork, which is also what makes the
   contrast a fixed number instead of a property of the next poster.

   `hero` is the next gig on /events: the same card turned up, with a
   poster wide enough to read and a tilt that makes it feel pinned up
   rather than listed. The home teaser leaves it off and stays compact.

   The poster stays decorative (alt=""), because every word on it is
   already in the text beside it; an alt would read the gig twice.

   `titleAs` exists because the same card sits under two different
   headings: on /events the nearest one above it is the h1, on the home
   teaser it is HomeNextDates' h2. A fixed h3 skips a level on /events. */
export default function EventCard({ event: e, hero = false, titleAs: Title = 'h3' }) {
  const { lang, t } = useLang()
  const v = t.events
  const { date, doors } = formatEventDate(e, lang)
  const [viewing, setViewing] = useState(false)
  const triggerRef = useRef(null)

  /* focus goes back where it came from - a reader who opened the flyer
     should land on the flyer again, not at the top of the document */
  const closeViewer = () => {
    setViewing(false)
    triggerRef.current?.focus()
  }

  const place = [e.venue, e.area, e.country].filter(Boolean).join(' · ')
  const host = [e.stage, e.promoter].filter(Boolean).join(' · ')

  const art = e.flyer ? (
    <img className="ev-poster" src={e.flyer} alt="" loading="lazy" />
  ) : (
    <div className="ev-fallback">
      <span className="ev-mark"><WaveMark size={120} /></span>
    </div>
  )

  const titleId = `ev-title-${e.id}`

  return (
    <article className={hero ? 'ev-card ev-card-hero' : 'ev-card'} aria-labelledby={titleId}>
      {/* With a poster the frame IS the opener, so it must NOT be
          aria-hidden - an interactive element hidden from assistive tech
          is focusable but unannounceable, which is worse than no button
          at all. Without a poster there is nothing worth opening and the
          fallback art stays purely decorative. */}
      {e.flyer ? (
        <button
          ref={triggerRef}
          type="button"
          className="ev-frame ev-frame-btn"
          aria-label={v.viewFlyer}
          onClick={() => setViewing(true)}
        >
          {hero
            ? <TiltCard as="span" className="ev-tilt" aria-hidden="true" maxTilt={6}>{art}</TiltCard>
            : art}
        </button>
      ) : (
        <div className="ev-frame" aria-hidden="true">{art}</div>
      )}

      {viewing && (
        <PosterViewer
          src={e.flyer}
          label={`${e.title} · ${v.viewFlyer}`}
          onClose={closeViewer}
        />
      )}

      <div className="ev-body">
        {/* Two leaves, never one string: the date is the loud part, the
            doors the quiet part under it. Each fact lives in exactly one
            node so a text query can only ever find it once. */}
        <p className="ev-when">
          <span className="ev-date">{date}</span>
          <span className="ev-doors">{v.doors} {doors}</span>
        </p>

        <Title className="ev-title" id={titleId}>{e.title}</Title>
        {e.billing && <p className="ev-billing">{e.billing}</p>}

        <div className="ev-rule" />

        {host && <p className="ev-meta">{host}</p>}
        <p className="ev-meta">{place}</p>

        {e.lineup.length > 0 && (
          <p className="ev-lineup">
            <span className="ev-label">{v.lineup}</span> {e.lineup.join(' · ')}
          </p>
        )}

        {e.genres.length > 0 && (
          <p className="ev-genres">
            {e.genres.map((g) => <span className="ev-genre" key={g}>{g}</span>)}
          </p>
        )}

        {e.entry && <p className="ev-meta">{v.entry}: {e.entry}</p>}

        {e.ticketUrl && (
          <a className="h-btn ev-tickets" href={e.ticketUrl} target="_blank" rel="noreferrer">
            {v.tickets}
          </a>
        )}
      </div>
    </article>
  )
}
