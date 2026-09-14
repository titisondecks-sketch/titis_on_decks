/* Language-independent set-card data: links, artists, hover photos.
   Merged with the translated texts by index (same pattern as the draft).
   All three are real, verified sets:
   - 3 Empresses (Glitta b2b Lutzi, 154 min, Dec 2025) - the collective in action
   - dirty feet (Lutzi solo, 64 min techno, Dec 2025)
   - WONDERLAND Market May 2026 (Glitta live, 118 min) */
import { hoverPhotos } from './media.js'

export const PROFILE_URLS = {
  collective: 'https://soundcloud.com/titisondecks',
  lutzi: 'https://soundcloud.com/dielu',
  glitta: 'https://soundcloud.com/glittawicca'
}

export const SET_LINKS = [
  {
    href: 'https://soundcloud.com/glittawicca/3-empresses-glitta-b2b-lutzi',
    artist: 'Glitta b2b Lutzi',
    photo: hoverPhotos[0]
  },
  {
    href: 'https://soundcloud.com/dielu/dirty-feet',
    artist: 'Lutzi',
    photo: hoverPhotos[1]
  },
  {
    href: 'https://soundcloud.com/glittawicca/wonderland-spring-market-may',
    artist: 'Glitta',
    photo: hoverPhotos[2]
  }
]
