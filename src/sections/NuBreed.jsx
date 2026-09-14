import { useRef, useState } from 'react'
import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Spores from '../components/Spores.jsx'
import PosterViewer from './PosterViewer.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/* A public path, not an import - the same way EventCard takes its flyer.
   vite.config.js inlines any imported asset under 300 kB as base64, and
   the build has inlineDynamicImports, so importing this 295 kB poster
   baked ~394 kB of base64 into the single bundle that every page of the
   site loads. Out of src/assets it stays a file the browser fetches only
   when somebody actually opens /nubreed. */
const flyer = 'media/events/nu-breed-2026-08-23.jpg'

/* Language-independent, like sets.js: track and artist names are proper
   nouns, written once. All four are real and reachable - the invented
   night is the only fiction on this page, and the music under it is not.

   'Anni, Amazon Warrior' and 'nu-spirit' are where this whole thing comes
   from: the artwork illustrates the first, the night is named after the
   second. The WONDERLAND set keeps its own name and URL - Glitta really
   played it, and renaming it would misattribute a real event. */
const TRACKS = [
  /* the link carries Kai's own timestamp - Amazon Warrior is a long mix,
     and 30:59 is where the part the video is cut to actually starts */
  { title: 'Anni, Amazon Warrior', artist: 'Malediven Toni', href: 'https://soundcloud.com/malediventoni/amazon-warrior#t=30:59' },
  { title: 'nu-spirit', artist: 'Malediven Toni', href: 'https://soundcloud.com/malediventoni/nu-spirit' },
  { title: 'OneWing', artist: 'Lutzi', href: 'https://soundcloud.com/dielu/onewing' },
  { title: 'WONDERLAND Market May 2026', artist: 'Glitta', href: 'https://soundcloud.com/glittawicca/wonderland-spring-market-may' },
]

/* NU BREED - MULTIVERSE IV · Amazonia, a night that does not exist.
   Unlisted like /carla: nothing links here, it is shared as a direct link.

   Deliberately NOT in sections/eventsData.js. That array feeds /events and
   the home teaser, both of which stand in front of the curtain and answer
   the one honest question the public asks - where do they actually play.
   An invented night in there would be a lie told by the real pipeline.

   The flyer already carries date and line-up, because it has to survive on
   its own once it is posted. So the page does not reprint them as its
   headline act - it carries what a flyer is bad at: the story, the place,
   who is who, and the admission that none of it happened. */
export default function NuBreed() {
  const { lang, t } = useLang()
  const n = t.nuBreed
  const [viewing, setViewing] = useState(false)
  const flyerBtn = useRef(null)

  /* a click does not move focus in jsdom, and the viewer restores focus to
     whatever opened it - so the caller holds the ref, as its docblock asks */
  const closeViewer = () => {
    setViewing(false)
    flyerBtn.current?.focus()
  }

  return (
    <div className="nb">
      <div className="nb-atmo" aria-hidden="true">
        <Spores />
      </div>

      <header className="nb-top">
        <a className="nb-back" href="/">← {n.back}</a>
        <LangSwitcher />
      </header>

      <main className="nb-main">
        <p className="nb-kicker">{n.kicker}</p>
        <SplitText key={lang} as="h1" className="nb-title" text="NU BREED" stagger={0.08} />
        <p className="nb-tagline">{n.tagline}</p>

        {/* The video leads, not the poster. Both are the same artwork and
            the same 9:16, so showing them at full size one above the other
            would just be the picture twice - the flyer stays one tap away
            instead. No autoplay: this carries a song, so it waits to be
            asked, and nothing here moves for a reader who did not. */}
        <Reveal delay={0.15}>
          <figure className="nb-figure">
            <div className="nb-video">
              <video
                src="media/videos/nu-breed-visualizer.mp4"
                poster="media/posters/nu-breed-visualizer.jpg"
                controls
                preload="metadata"
                playsInline
                aria-label={n.videoLabel}
              />
            </div>
            <figcaption className="nb-video-note">{n.videoNote}</figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <button
            ref={flyerBtn}
            type="button"
            className="nb-flyer-btn"
            onClick={() => setViewing(true)}
          >
            {n.flyerLink}
          </button>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="nb-intro">{n.intro}</p>
        </Reveal>

        <Reveal className="nb-block" delay={0.15}>
          <dl className="nb-facts">
            <div className="nb-fact">
              <dt>{n.whenLabel}</dt>
              <dd>{n.when}</dd>
            </div>
            <div className="nb-fact">
              <dt>{n.whereLabel}</dt>
              <dd>{n.where}</dd>
            </div>
            <div className="nb-fact">
              <dt>{n.hostLabel}</dt>
              <dd>{n.host}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="nb-block" delay={0.2}>
          <section className="nb-lineup">
            <h2 className="nb-lineup-label">{n.whoLabel}</h2>
            <ul>
              {n.lineup.map((dj) => (
                <li key={dj.name}>
                  <span className="nb-dj">{dj.name}</span>
                  <span className="nb-dj-note">{dj.note}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal className="nb-block" delay={0.15}>
          <section className="nb-sound">
            <h2 className="nb-lineup-label">{n.soundLabel}</h2>
            <ul>
              {TRACKS.map((tr) => (
                <li key={tr.href}>
                  <a
                    href={tr.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${tr.title} - ${tr.artist} - ${n.openOn}`}
                  >
                    <span className="nb-track">{tr.title}</span>
                    <span className="nb-track-by">{tr.artist}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="nb-sound-note">{n.soundNote}</p>
          </section>
        </Reveal>

        <Reveal className="nb-block" delay={0.15}>
          <p className="nb-wink">{n.wink}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="nb-close">{n.close}</p>
        </Reveal>
      </main>

      {viewing && <PosterViewer src={flyer} label={n.flyerAlt} onClose={closeViewer} />}
    </div>
  )
}
