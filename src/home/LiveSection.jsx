import Reveal from '../components/Reveal.jsx'
import Waveform from '../components/Waveform.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/* One real minute from a night - a framed performance clip with sound.
   No autoplay on purpose: it has vocals; the poster invites the click. */
export default function LiveSection() {
  const { t } = useLang()
  const l = t.home.live

  return (
    <section className="h-section" id="live">
      <Reveal className="h-head">
        <p className="h-kicker">{l.eyebrow} <Waveform bars={7} scale={0.45} className="h-wave-inline" /></p>
        <h2 className="h-h2">{l.titlePre}<em>{l.titleEm}</em></h2>
      </Reveal>

      <Reveal delay={0.15}>
        <figure className="h-live">
          <div className="h-live-frame">
            <video
              src="media/videos/live-floor.mp4"
              poster="media/posters/live-floor.jpg"
              controls
              preload="metadata"
              playsInline
            />
          </div>
          <figcaption className="h-caption">{l.caption}</figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
