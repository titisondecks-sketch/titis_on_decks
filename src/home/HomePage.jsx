import HomeNav from './HomeNav.jsx'
import HomeHero from './HomeHero.jsx'
import Collective from './Collective.jsx'
import Story from './Story.jsx'
import Spectrum from './Spectrum.jsx'
import LiveSection from './LiveSection.jsx'
import HomeNextDates from './HomeNextDates.jsx'
import HomeSound from './HomeSound.jsx'
import HomeGathering from './HomeGathering.jsx'
import HomeBooking from './HomeBooking.jsx'
import Gallery from './Gallery.jsx'
import Finale from './Finale.jsx'

/* The real TiTis on Decks page: warm blacklight, real words, real sound.
   variant='pink' renders the identical page in the site's archived night
   palette (the CSS tokens flip via data-theme; only the spores need JS
   colors).
   live=true marks the real paths "/" and "/pink" - only they render the
   booking form and the real booking address; the draft backups come
   without it and stay frozen. */
export default function HomePage({ variant = 'home', live = false }) {
  return (
    <>
      <HomeNav />
      <HomeHero variant={variant} />
      <main>
        <Collective />
        <Story />
        <Spectrum />
        <LiveSection />
        {live && <HomeNextDates />}
        <HomeSound />
        <HomeGathering live={live} />
        <Gallery />
        {live && <HomeBooking />}
      </main>
      <Finale variant={variant} live={live} />
    </>
  )
}
