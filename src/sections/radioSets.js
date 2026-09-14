/* The collective's public SoundCloud sets, newest first: all of Lutzi's,
   Glitta's curated across the years. Numeric track IDs power the embeds
   because they survive username renames (matariki-1 taught us that);
   the permalink URLs are for humans. */
export const RADIO_SETS = [
  { id: 2348820749, title: 'OneWing', artist: 'Lutzi', year: 2026, url: 'https://soundcloud.com/dielu/onewing' },
  { id: 2337650513, title: 'WONDERLAND Market', artist: 'Glitta', year: 2026, url: 'https://soundcloud.com/glittawicca/wonderland-spring-market-may' },
  { id: 2289318593, title: 'What is LOVE? WeAva Journey', artist: 'Glitta', year: 2026, url: 'https://soundcloud.com/glittawicca/what-is-love-weava-journey-24' },
  { id: 2222797898, title: '3 Empresses', artist: 'Glitta b2b Lutzi', year: 2025, url: 'https://soundcloud.com/glittawicca/3-empresses-glitta-b2b-lutzi' },
  { id: 2222825750, title: '3 Empresses', artist: 'Glitta', year: 2025, url: 'https://soundcloud.com/glittawicca/3-empresses-glitta' },
  { id: 2222960741, title: 'dirty feet', artist: 'Lutzi', year: 2025, url: 'https://soundcloud.com/dielu/dirty-feet' },
  { id: 2096132175, title: 'Wonderland Springmarket', artist: 'Glitta', year: 2025, url: 'https://soundcloud.com/glittawicca/wonderland-springmarket' },
  { id: 1937241716, title: 'FAVO Bar', artist: 'Glitta', year: 2024, url: 'https://soundcloud.com/glittawicca/favo-bar' },
  { id: 1656629655, title: 'RainingGirl Festival', artist: 'Lutzi', year: 2023, url: 'https://soundcloud.com/dielu/240109_0059mp3' },
  { id: 1643667873, title: 'Raining Girl Festival Portugal', artist: 'Glitta', year: 2023, url: 'https://soundcloud.com/glittawicca/20231015-raining-girl-festival-portugal-2023' },
]

export function radioEmbedSrc(id) {
  return (
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + id +
    '&color=%23ff7a3d&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false'
  )
}
