import Reveal from '../components/Reveal.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { galleryItems } from './media.js'

export default function Gallery() {
  const { lang, t } = useLang()
  const g = t.home.gallery

  if (galleryItems.length === 0) return null

  return (
    <section className="h-section" id="gallery">
      <Reveal className="h-head">
        <p className="h-kicker">{g.eyebrow}</p>
        <h2 className="h-h2">{g.titlePre}<em>{g.titleEm}</em></h2>
      </Reveal>

      <div className="h-gallery">
        {galleryItems.map((item, i) => (
          <Reveal key={item.src} delay={(i % 3) * 0.12}>
            <figure className="h-tile">
              <TiltCard maxTilt={6}>
                <div className="h-tile-media">
                  {item.kind === 'video' ? (
                    <>
                      <video
                        src={item.src}
                        poster={item.poster ?? undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={item.alt}
                      />
                      <span className="h-tile-live">live</span>
                    </>
                  ) : (
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  )}
                </div>
              </TiltCard>
              <figcaption className="h-caption">{item.caption[lang] ?? item.caption.en}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
