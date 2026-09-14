import { useState } from 'react'
import LangSwitcher from '../components/LangSwitcher.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import Spores from '../components/Spores.jsx'
import Waveform from '../components/Waveform.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import glitta from '../assets/glitta.jpg'
import { RADIO_SETS, radioEmbedSrc } from './radioSets.js'

/* matariki-1 was Glitta's earlier username - the numeric track ID in the
   embed survives the rename, but human-facing links must use glittawicca. */
const TRACK_URL = 'https://soundcloud.com/glittawicca/2021-10-24-raining-girl'
const ARTIST_URL = 'https://soundcloud.com/glittawicca'
const EMBED_SRC =
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1147717804' +
  '&color=%23ff7a3d&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true'

/* dawn dust for the living page - cream, peach, gold, one shy rose */
const DAWN_SPORES = ['#fff7ec', '#ffd9a8', '#ffb98a', '#ff7a3d', '#f7a6c1']
const FILTERS = ['all', 'Lutzi', 'Glitta', 'b2b']

/* The morning side of the site: same wonderland, after sunrise.
   Three stages: 'live' is the real /radio and keeps evolving
   (atmosphere, filters, card polish); 'draft5' backs up the
   EMOTIQ + set-grid stage before the UI upgrade; 'draft4' backs up
   the Monoton single-set stage. Backups never change. */
export default function Radio({ stage = 'live' }) {
  const { lang, t } = useLang()
  const live = stage === 'live'
  const [who, setWho] = useState('all')
  const sets =
    live && who !== 'all'
      ? RADIO_SETS.filter((s) => s.artist.toLowerCase().includes(who.toLowerCase()))
      : RADIO_SETS

  return (
    <div className={live ? 'radioside radioside-live' : 'radioside'}>
      {live && (
        <div className="radio-atmo" aria-hidden="true">
          <Spores colors={DAWN_SPORES} />
        </div>
      )}

      <header className="radio-top">
        <a className="radio-back" href="/">← {t.radio.back}</a>
        <LangSwitcher />
      </header>

      <main className="radio-main">
        <p className="radio-kicker">
          {t.radio.kicker}
          {live && <Waveform bars={7} scale={0.4} className="radio-wave-inline" />}
        </p>
        <SplitText key={lang} as="h1" className="radio-title" text="Sunrise Radio" stagger={0.06} />
        <Reveal delay={0.3}>
          <p className="radio-intro">{t.radio.intro}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <section className="radio-feature" aria-label={t.radio.featureLabel}>
            <figure className="radio-artist">
              <img src={glitta} alt="Glitta smiling behind a Pioneer DJ setup, framed by plants and a giant moth mural" />
              <figcaption>{t.radio.featureCaption}</figcaption>
            </figure>
            <div className="radio-embed">
              <p className="radio-feature-label">{t.radio.featureLabel}</p>
              <iframe
                title="Glitta - Raining Girl afterhourschwipschwap (SoundCloud)"
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="no"
                allow="autoplay; encrypted-media"
                src={EMBED_SRC}
              />
              <p className="radio-credit">
                <a href={ARTIST_URL} target="_blank" rel="noreferrer">Glitta</a>
                {' · '}
                <a href={TRACK_URL} target="_blank" rel="noreferrer">Raining Girl afterhourschwipschwap</a>
              </p>
            </div>
          </section>
        </Reveal>

        {stage !== 'draft4' && (
        <section className="radio-more" aria-labelledby="radio-more-title">
          <Reveal>
            <h2 className="radio-more-title" id="radio-more-title">{t.radio.moreTitle}</h2>
          </Reveal>
          {live && (
            <div className="radio-filters" role="group" aria-label={t.radio.filterLabel}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="radio-filter"
                  aria-pressed={who === f}
                  onClick={() => setWho(f)}
                >
                  {f === 'all' ? t.radio.filterAll : f}
                </button>
              ))}
            </div>
          )}
          <div className="radio-sets">
            {sets.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 0.12} className="radio-set">
                <iframe
                  title={`${s.title} - ${s.artist} (SoundCloud)`}
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  loading="lazy"
                  allow="autoplay; encrypted-media"
                  src={radioEmbedSrc(s.id)}
                />
                <p className="radio-set-meta">
                  <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>
                  {live ? (
                    <span className="radio-set-tags">
                      <span className="radio-set-artist">{s.artist}</span>
                      <span className="radio-set-year">{s.year}</span>
                    </span>
                  ) : (
                    <>
                      {' · '}
                      {s.artist} · {s.year}
                    </>
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
        )}

        <p className="radio-values">{t.radio.values}</p>
      </main>
    </div>
  )
}
