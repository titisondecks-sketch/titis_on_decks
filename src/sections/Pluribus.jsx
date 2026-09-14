import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Mosaic from '../components/Mosaic.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/* Latin, so it is the same in all three languages the site speaks - the
   translations carry the meaning underneath it instead. Split across two
   lines because the motto has two halves and the page is about the join. */
const MOTTO_MANY = 'E PLURIBUS'
const MOTTO_ONE = 'UNUM'

/* /pluribus - the political one, and the third of the family that /joy
   and /love started. Same construction: nothing invented, nothing
   borrowed, no photograph, the picture drawn.

   Where those two celebrate, this one argues. It stays on the principle
   and names no party, which is not squeamishness - a fun page on a DJ
   collective's site that names sitting politicians becomes a liability
   somebody else has to defend, and the argument is stronger stated as a
   rule anyway: a rule catches the next one too.

   The one thing it refuses to be vague about is the limit. A page about
   openness that cannot say what it is closed to has not said anything. */
export default function Pluribus() {
  const { lang, t } = useLang()
  const p = t.pluribus

  return (
    <div className="pl">
      <header className="pl-top">
        <a className="pl-back" href="/">← {p.back}</a>
        <LangSwitcher />
      </header>

      <main className="pl-main">
        <p className="pl-kicker">{p.kicker}</p>

        <Mosaic />

        <h1 className="pl-title">
          {/* one SplitText per word - a heading of per-character spans can
              otherwise break inside a word, see the note in Joy.jsx */}
          <span key={lang} className="pl-many" aria-label={`${MOTTO_MANY} ${MOTTO_ONE}`}>
            <SplitText as="span" className="pl-word" text={MOTTO_MANY} stagger={0.06} />
          </span>
          <span className="pl-one">{MOTTO_ONE}</span>
        </h1>

        <p className="pl-tagline">{p.tagline}</p>

        <Reveal delay={0.12}>
          <p className="pl-intro">{p.intro}</p>
        </Reveal>

        <Reveal className="pl-block" delay={0.15}>
          <section>
            <h2 className="pl-label">{p.floorLabel}</h2>
            <ul className="pl-floor">
              {p.floor.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* The limit gets a frame of its own. A page about an open room
            that buries what it is closed to in a paragraph has hedged, and
            this is the sentence the rest of the page is standing on. */}
        <Reveal className="pl-block" delay={0.15}>
          <aside className="pl-limit">
            <h2 className="pl-limit-label">{p.limitLabel}</h2>
            <p className="pl-limit-text">{p.limit}</p>
          </aside>
        </Reveal>

        <Reveal className="pl-block" delay={0.15}>
          <p className="pl-note">{p.mosaicNote}</p>
        </Reveal>

        <Reveal className="pl-block" delay={0.15}>
          <p className="pl-bleed">{p.bleed}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="pl-origin">{p.origin}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="pl-close">{p.close}</p>
        </Reveal>
      </main>
    </div>
  )
}
