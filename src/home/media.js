/* Real media from the collective's material (context/assets), curated and
   optimized into public/media/. Paths are relative to the site root.
   Note: 13 of the 20 source photos were byte-identical re-exports; several
   final images are clean stills extracted from the video clips. */

export const galleryItems = [
  {
    kind: 'photo',
    src: 'media/photos/canopy-wide-establishing.jpg',
    poster: null,
    alt: 'The UV-painted canopy glowing green over the gathering at night, crowd silhouettes at the torch-lit entrance',
    caption: {
      en: 'the UV canopy over the gathering, torches at the gate',
      de: 'das UV-Blätterdach überm Gathering, Fackeln am Eingang',
      pt: 'a lona UV sobre o encontro, tochas à entrada'
    }
  },
  {
    kind: 'photo',
    src: 'media/photos/uv-canopy-turtle-mandala.jpg',
    poster: null,
    alt: 'Close-up of UV-reactive tent fabric with a turtle-and-mandala motif glowing green and blue',
    caption: {
      en: 'turtle mandala, blacklight paint',
      de: 'Schildkröten-Mandala, Schwarzlichtfarbe',
      pt: 'mandala-tartaruga, tinta ultravioleta'
    }
  },
  {
    kind: 'photo',
    src: 'media/photos/dj-booth-torchlit-crowd.jpg',
    poster: null,
    alt: 'A DJ silhouette at the decks under the canopy peak, flanked by two warm torches, crowd watching',
    caption: {
      en: 'the booth between two torches',
      de: 'die Kanzel zwischen zwei Fackeln',
      pt: 'a cabine entre duas tochas'
    }
  },
  {
    kind: 'photo',
    src: 'media/photos/dancefloor-crowd-wide-uv.jpg',
    poster: null,
    alt: 'A full dancefloor of silhouettes under the sprawling green-and-blue UV canopy',
    caption: {
      en: 'the floor, all silhouettes',
      de: 'der Floor, lauter Silhouetten',
      pt: 'a pista, só silhuetas'
    }
  },
  {
    kind: 'video',
    src: 'media/videos/dj-closeup-warm-booth.mp4',
    poster: 'media/posters/dj-closeup-warm-booth.jpg',
    alt: 'A DJ with headphones at the mixer in warm amber and red light, equipment lights blinking',
    caption: {
      en: 'warm light at the mixer - live loop',
      de: 'warmes Licht am Mixer - Live-Loop',
      pt: 'luz quente na mesa - loop ao vivo'
    }
  },
  {
    kind: 'video',
    src: 'media/videos/vinyl-decks-hands-closeup.mp4',
    poster: 'media/posters/vinyl-decks-hands-closeup.jpg',
    alt: 'Hands cueing a vinyl record beside the mixer in warm amber light',
    caption: {
      en: 'hands on vinyl',
      de: 'Hände am Vinyl',
      pt: 'mãos no vinil'
    }
  }
]

/* hover photos for the three set cards, order matches the cards:
   3 Empresses (b2b) · dirty feet (Lutzi) · WONDERLAND Market (Glitta) */
export const hoverPhotos = [
  { src: 'media/photos/dj-silhouette-crowd-glow.jpg' },
  { src: 'media/photos/dj-arms-up-red-glow.jpg' },
  { src: 'media/photos/silhouette-blue-orange-split.jpg' }
]

/* the who-we-are photo - alt kept neutral on purpose */
export const aboutPhoto = {
  src: 'media/photos/duo-embrace-decks-smiling.jpg',
  alt: 'Two DJs behind the decks, arm in arm, smiling in front of a painted mural'
}

/* faint full-bleed backdrop behind the hero text */
export const heroBackdrop = { src: 'media/photos/canopy-crowd-hero-wide.jpg' }
