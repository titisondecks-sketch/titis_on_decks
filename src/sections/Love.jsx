import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Clouds, { WARM_CLOUDS } from '../components/Clouds.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/* The word is the same in all three languages the site speaks, so it is
   written here rather than in i18n - the way PT/ES! and NU BREED are. */
const MASTHEAD = 'LOVE'

/* The line the page was asked for, and the only shouted thing on it. It
   stays English in every language for the same reason the masthead does,
   and because "silverback" is the joke: the animal, not the man. */
const SILVERBACKS = 'Silverbacks, behave!'

/* /love - the warm twin of /joy. Same argument, other weather: the Nu
   Breed register rather than the cool one, and where /joy names the many,
   this one says what the naming is for.

   It carries the page's one piece of edge - a line addressed to the
   chest-beaters - and it is deliberately aimed at behaviour rather than
   at anybody's birth. A page that celebrates half the world by writing
   off the other half is just the old sorting with the labels swapped, and
   would undo the thing it came here to say.

   Unlisted like the rest, and out of eventsData.js: not a date. */
export default function Love() {
  const { lang, t } = useLang()
  const l = t.love

  return (
    <div className="lv">
      <Clouds palette={WARM_CLOUDS} full />

      <header className="lv-top">
        <a className="lv-back" href="/">← {l.back}</a>
        <LangSwitcher />
      </header>

      <main className="lv-main">
        <p className="lv-kicker">{l.kicker}</p>

        <h1 className="lv-title">
          {/* one SplitText per word, so a line can only ever break in a
              space - see the note on the same heading in Joy.jsx */}
          <span key={lang} className="lv-mast" aria-label={MASTHEAD}>
            <SplitText as="span" className="lv-word" text={MASTHEAD} stagger={0.08} />
          </span>
          <span className="lv-sub">{l.titleSub}</span>
        </h1>

        <Reveal delay={0.12}>
          <p className="lv-intro">{l.intro}</p>
        </Reveal>

        <Reveal className="lv-block" delay={0.15}>
          <section>
            <h2 className="lv-label">{l.hopeLabel}</h2>
            <p className="lv-hope">{l.hope}</p>
          </section>
        </Reveal>

        <Reveal className="lv-block" delay={0.15}>
          <aside className="lv-silver">
            <p className="lv-silver-call">{SILVERBACKS}</p>
            <p className="lv-silver-gloss">{l.silverGloss}</p>
          </aside>
        </Reveal>

        <Reveal className="lv-block" delay={0.15}>
          <p className="lv-note">{l.note}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="lv-close">{l.close}</p>
        </Reveal>
      </main>
    </div>
  )
}
