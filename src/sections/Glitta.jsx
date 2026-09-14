import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Spores from '../components/Spores.jsx'
import TiltCard from '../components/TiltCard.jsx'
import Turntable from '../components/Turntable.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { PROFILE_URLS } from '../home/sets.js'
import glitta from '../assets/glitta.jpg'

/* Founder page, unlisted like /carla: nothing links here, it is shared
   as a direct link - titisondecks.com/glitta. Carla's layout in the
   pink-purple night palette Glitta asked for; unlike a guest artist
   she brings years of recorded sets, so her SoundCloud is on the
   page from day one. */

/* The record on the deck: Glitta's own, OSF_069 on One.Shared.Frequency.
   records - the imprint named after the line every page here ends on.
   Public paths, both pressings: the AAC is a third smaller, the MP3
   plays anywhere, and the browser takes the first it can. */
const RECORD = {
  artist: 'Glitta',
  title: 'Perplexico',
  catalogue: 'OSF_069',
  label: 'One.Shared.Frequency. records',
  href: 'https://soundcloud.com/glittawicca',
  sources: [
    { src: 'media/audio/glitta-perplexico.m4a', type: 'audio/mp4' },
    { src: 'media/audio/glitta-perplexico.mp3', type: 'audio/mpeg' },
  ],
}

/* Five colors off the pink night palette, plain strings since the
   record sleeve is its own small thing rather than a themed component:
   void indigo, neon magenta, UV violet, cyan, cream. */
const STRIPES = ['#08041a', '#ff3ecf', '#8a5cff', '#37f5e0', '#f0e9ff']

export default function Glitta() {
  const { lang, t } = useLang()
  const g = t.glitta

  return (
    <div className="glitta">
      <div className="glitta-atmo" aria-hidden="true">
        <Spores />
      </div>

      <header className="glitta-top">
        <a className="glitta-back" href="/">← {g.back}</a>
        <LangSwitcher />
      </header>

      <main className="glitta-main">
        <p className="glitta-kicker">{g.kicker}</p>
        <SplitText key={lang} as="h1" className="glitta-title" text="Glitta" stagger={0.09} />

        <Reveal delay={0.2}>
          <TiltCard className="glitta-figure" maxTilt={6}>
            <img src={glitta} alt={g.alt} />
          </TiltCard>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="glitta-caption">{g.caption}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="glitta-intro">{g.intro}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="glitta-listen">
            {g.listen}{' '}
            <a href={PROFILE_URLS.glitta} target="_blank" rel="noreferrer">soundcloud.com/glittawicca</a>
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="glitta-deck">
            <h2 className="glitta-deck-label">{g.deckLabel}</h2>
            <p className="glitta-deck-line">{g.deck}</p>
            <Turntable
              record={RECORD}
              stripes={STRIPES}
              labels={{ drop: g.dropNeedle, lift: g.liftNeedle, playing: g.nowPlaying }}
              onNeedle={() => {}}
            />
          </section>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="glitta-note">{g.note}</p>
        </Reveal>
      </main>
    </div>
  )
}
