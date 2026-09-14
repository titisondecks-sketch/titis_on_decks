import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Spores from '../components/Spores.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/* One artist page, currently worn by /carla. The page is a template for
   whoever gets one next, so it is a component with a caller rather than
   a file that has to be kept in step with others.

   The subject is invented, and says so on the page. A name over a
   portrait with no such line reads as a booking; /nubreed had to close the
   same trap. Carla Heinz refuses to be anybody - the name picks no side
   and neither does the hooded portrait.

   Portraits live in public/media, not src/assets. Anything imported from
   src/assets over 4 kB used to be base64'd into the shared bundle every
   page pays for; these are fetched only by whoever opens this page. */
const ARTISTS = {
  carla: {
    name: ['Carla', 'Heinz'],
    portrait: 'media/artists/carla-heinz.jpg',
  },
}

export default function ArtistPage({ artist }) {
  const { lang, t } = useLang()
  const { name, portrait, ctaHref } = ARTISTS[artist]
  const a = t[artist]

  return (
    <div className="artist">
      <div className="artist-atmo" aria-hidden="true">
        <Spores />
      </div>

      <header className="artist-top">
        <a className="artist-back" href="/">← {a.back}</a>
        <LangSwitcher />
      </header>

      <main className="artist-main">
        <p className="artist-kicker">{a.kicker}</p>
        {/* One SplitText per word. Every character is its own inline-block
            and lines break between atomic inlines, not just at spaces, so a
            single two-word string re-wraps with the viewport and is free to
            break mid-word. Stacking the words settles it at every width. */}
        <h1 className="artist-title">
          <SplitText key={`${lang}-1`} className="artist-line" text={name[0]} stagger={0.07} />
          <SplitText key={`${lang}-2`} className="artist-line" text={name[1]} stagger={0.07} delay={0.4} />
        </h1>

        <Reveal delay={0.2}>
          <TiltCard className="artist-figure" maxTilt={6}>
            <img src={portrait} alt={a.alt} />
          </TiltCard>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="artist-caption">{a.caption}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="artist-intro">{a.intro}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="artist-note">{a.note}</p>
        </Reveal>

        {ctaHref && a.cta && (
          <Reveal delay={0.25}>
            <a className="artist-cta" href={ctaHref}>{a.cta}</a>
          </Reveal>
        )}
      </main>
    </div>
  )
}
