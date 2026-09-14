import { useEffect, useLayoutEffect, useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import HomePage from './home/HomePage.jsx'
import Radio from './sections/Radio.jsx'
import ArtistPage from './sections/ArtistPage.jsx'
import Glitta from './sections/Glitta.jsx'
import Soon from './sections/Soon.jsx'
import Desk from './sections/Desk.jsx'
import Events from './sections/Events.jsx'
import NuBreed from './sections/NuBreed.jsx'
import Joy from './sections/Joy.jsx'
import Love from './sections/Love.jsx'
import Pluribus from './sections/Pluribus.jsx'

/* THE CURTAIN. While the collective sorts out photo rights, the public
   domains show only the under-construction page; the full site stays
   reachable on staging.titisondecks.com, *.vercel.app and localhost.
   Reopening the site = set CURTAIN to false, commit, push. */
const CURTAIN = true
const CURTAINED_HOSTS = new Set(['titisondecks.com', 'www.titisondecks.com'])
const behindCurtain = () => CURTAIN && CURTAINED_HOSTS.has(window.location.hostname)

/* EVERY PAGE STARTS AT THE TOP - the layout effect below scrolls there
   on mount - so the browser's own restoring of the old position on a
   reload is not wanted, and it was doing harm: for a moment after load
   the page sat where you left it, then scrolled itself smoothly back up,
   and everything that waits to be scrolled into view (the Reveals) fired
   for a page nobody was looking at and was already finished by the time
   you scrolled down. Manual means the browser leaves the position to us,
   and we put it at the top. */
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

/* THE UPLOAD DESK owns its own subdomain and answers before anything
   else - it is a tool for the collective, not a page of the site, so
   the curtain never covers it. */
const UPLOAD_HOSTS = new Set(['uploads.titisondecks.com'])
const atUploadDesk = () => UPLOAD_HOSTS.has(window.location.hostname)

/* THE DATES PAGE stands in front of the curtain too. Where the
   collective plays next is the one thing the public needs while the
   rest of the site waits on photo rights, so /events answers before the
   curtain does - on titisondecks.com exactly as on staging. It carries
   no photos of the nights, only the promoter's own flyer. */
const atDates = () => window.location.pathname.startsWith('/events')

/* Two kinds of pages. LIVING: "/", "/pink" and "/radio" - real paths
   that keep evolving (EMOTIQ, new sets, new UI). DRAFTS: hash routes
   that back up a stage and never change - #/draft2 the warm home and
   #/draft3 its pink skin at the Monoton stage, #/draft4 the radio at
   the Monoton single-set stage, #/draft5 the radio at the EMOTIQ
   set-grid stage before the UI upgrade, #/draft6 the home and #/draft7
   the pink skin at the EMOTIQ stage before the booking form. Legacy
   "#/radio" / "#/pink" links land on the living pages. Plain in-page
   anchors ("#gathering") return null so the current page stays
   mounted. */
function routeFromLocation() {
  if (atUploadDesk()) return 'upload'
  if (atDates()) return 'events'
  if (behindCurtain()) return 'soon'
  const h = window.location.hash
  if (h === '#/radio') return 'radio'
  if (h === '#/pink') return 'pink'
  if (h === '#/draft2') return 'draft2'
  if (h === '#/draft3') return 'draft3'
  if (h === '#/draft4') return 'draft4'
  if (h === '#/draft5') return 'draft5'
  if (h === '#/draft6') return 'draft6'
  if (h === '#/draft7') return 'draft7'
  if (h.startsWith('#/')) return 'home'
  const p = window.location.pathname
  if (p.startsWith('/radio')) return 'radio'
  if (p.startsWith('/pink')) return 'pink'
  if (p.startsWith('/carla')) return 'carla'
  if (p.startsWith('/glitta')) return 'glitta'
  if (p.startsWith('/nubreed')) return 'nubreed'
  if (p.startsWith('/joy')) return 'joy'
  if (p.startsWith('/love')) return 'love'
  if (p.startsWith('/pluribus')) return 'pluribus'
  if (p.startsWith('/soon')) return 'soon'
  if (p.startsWith('/upload')) return 'upload'
  /* no /events line here on purpose - atDates() catches it above, in
     front of the curtain, so a second check down here would be dead. */
  return null
}

/* palette + font are separate axes: the Monoton drafts keep Monoton,
   the living pages - and draft5, which backs up an EMOTIQ stage -
   wear EMOTIQ (fonts.css / home.css key on data-font). */
const THEME = {
  home: 'home',
  pink: 'pink',
  carla: 'pink',
  glitta: 'pink',
  nubreed: 'home',
  /* the two halves of one homage, told in the site's two skins: /joy in
     the cool one, /love in the warm Nu Breed register. Both grounds are
     near-black, so the clouds' additive light works on either - the skin
     decides the type and the accents, not whether the picture survives. */
  joy: 'pink',
  love: 'home',
  /* the third of the family takes the cool skin back: its picture is a
     mosaic of every hue there is, and the indigo ground is the one that
     argues with none of them. */
  pluribus: 'pink',
  soon: 'home',
  upload: 'home',
  events: 'home',
  draft2: 'home',
  draft3: 'pink',
  draft6: 'home',
  draft7: 'pink',
  radio: 'radio',
  draft4: 'radio',
  draft5: 'radio',
}
const EMOTIQ_ROUTES = new Set(['home', 'pink', 'radio', 'draft5', 'draft6', 'draft7', 'carla', 'glitta', 'soon', 'upload', 'events', 'nubreed', 'joy', 'love', 'pluribus'])

export default function App() {
  const [route, setRoute] = useState(() => routeFromLocation() ?? 'home')

  useEffect(() => {
    const onHash = () => {
      const next = routeFromLocation()
      if (next) setRoute(next)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = THEME[route]
    document.documentElement.dataset.font = EMOTIQ_ROUTES.has(route) ? 'emotiq' : 'monoton'
    window.scrollTo(0, 0)
  }, [route])

  return (
    <LanguageProvider>
      {route === 'upload' ? (
        <Desk />
      ) : route === 'soon' ? (
        <Soon />
      ) : route === 'carla' ? (
        <ArtistPage artist="carla" />
      ) : route === 'glitta' ? (
        <Glitta />
      ) : route === 'nubreed' ? (
        <NuBreed />
      ) : route === 'joy' ? (
        <Joy />
      ) : route === 'love' ? (
        <Love />
      ) : route === 'pluribus' ? (
        <Pluribus />
      ) : route === 'radio' ? (
        <Radio />
      ) : route === 'events' ? (
        <Events />
      ) : route === 'draft5' ? (
        <Radio stage="draft5" />
      ) : route === 'draft4' ? (
        <Radio stage="draft4" />
      ) : (
        /* pink (living), draft3 (Monoton) and draft7 (EMOTIQ backup)
           re-skin the same page */
        <HomePage
          variant={route === 'pink' || route === 'draft3' || route === 'draft7' ? 'pink' : 'home'}
          live={route === 'home' || route === 'pink'}
        />
      )}
    </LanguageProvider>
  )
}
