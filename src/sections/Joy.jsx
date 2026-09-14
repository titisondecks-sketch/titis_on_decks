import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Clouds, { COOL_CLOUDS } from '../components/Clouds.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/* The heading's per-character cadence, shared by every word of it so the
   flicker reads as one pass across the line - see the note at the h1. */
const TITLE_STAGGER = 0.06

/* /joy - "Celebrate Women! All of them!". An homage, not a night and not
   a joke, so it breaks the pattern of the other unlisted pages in the one
   way that matters: nothing here is invented and nothing is borrowed.
   No flyer, no line-up, no embed, no photograph - the picture is drawn,
   the words are the collective's own.

   Unlisted like the rest of them, and out of eventsData.js: that array
   answers where the collective plays, and this is not a date. */
export default function Joy() {
  const { lang, t } = useLang()
  const j = t.joy

  return (
    <div className="jy">
      {/* Weather, not an illustration: the field hangs behind the whole
          page - so it lives outside <main>, like the Spores atmosphere on
          the other pages, rather than as a fixed-position stray in the
          content grid. Its own component hides it from the a11y tree; it
          says exactly what the closing paragraph says. */}
      <Clouds palette={COOL_CLOUDS} full />

      <header className="jy-top">
        <a className="jy-back" href="/">← {j.back}</a>
        <LangSwitcher />
      </header>

      <main className="jy-main">
        <p className="jy-kicker">{j.kicker}</p>

        {/* An imperative in every language the site speaks, so unlike the
            party names on the other pages it translates. */}
        <h1 className="jy-title">
          {/* One SplitText per word, not one for the whole line. SplitText
              makes every character its own inline-block, and a line may
              break between any two of them - which on a narrow screen set
              this heading as "CELEBRAT / E WOMEN!". Each word gets a
              nowrap wrapper instead, and the per-character delay carries
              across the words so the flicker still runs left to right in
              one pass rather than restarting per word. */}
          <span key={lang} className="jy-call" aria-label={j.titleCall}>
            {(() => {
              let offset = 0
              return j.titleCall.split(' ').map((word) => {
                const delay = offset * TITLE_STAGGER
                offset += word.length + 1
                return (
                  <SplitText
                    key={word}
                    as="span"
                    className="jy-word"
                    text={word}
                    delay={delay}
                    stagger={TITLE_STAGGER}
                  />
                )
              })
            })()}
          </span>
          <span className="jy-all">{j.titleAll}</span>
        </h1>

        <p className="jy-tagline">{j.tagline}</p>

        <Reveal delay={0.12}>
          <p className="jy-intro">{j.intro}</p>
        </Reveal>

        <Reveal className="jy-block" delay={0.15}>
          <section className="jy-them">
            <h2 className="jy-label">{j.listLabel}</h2>
            {/* No numbers and no bullets: a numbered list of people is a
                ranking, which is the one thing this page is against. Each
                line gets a dot of the bloom's own light instead. */}
            <ul className="jy-list">
              {j.list.map((line, i) => (
                <li key={line} style={{ '--dot': COOL_CLOUDS[i % COOL_CLOUDS.length].hex }}>
                  <span className="jy-dot" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="jy-list-note">{j.listNote}</p>
          </section>
        </Reveal>

        <Reveal className="jy-block" delay={0.15}>
          <p className="jy-inner">{j.inner}</p>
        </Reveal>

        <Reveal className="jy-block" delay={0.15}>
          <p className="jy-wink">{j.wink}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="jy-close">{j.close}</p>
        </Reveal>
      </main>
    </div>
  )
}
