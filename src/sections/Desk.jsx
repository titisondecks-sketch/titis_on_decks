import { useState } from 'react'
import LangSwitcher from '../components/LangSwitcher.jsx'
import Spores from '../components/Spores.jsx'
import { WaveMark } from '../home/HomeNav.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import Gallery from './Gallery.jsx'
import Upload from './Upload.jsx'

const WARM_SPORES = ['#ffb32e', '#f4ff3d', '#ff7a2e', '#b8ff2e', '#fff4e0']

/* What uploads.titisondecks.com shows. The desk has two sides: sending
   is the point of it, and looking at what already arrived is what you
   want the moment after.

   The word is typed once on the send side and held here, so crossing
   to the other side never asks for it again. It is never persisted -
   close the tab and it is gone, which is the right amount of memory
   for a shared word on a phone that gets passed around.

   Also reachable at /upload on any host, for review. */
export default function Desk() {
  const { t } = useLang()
  const g = t.gallery
  const [view, setView] = useState('send')
  const [passcode, setPasscode] = useState('')

  return (
    <div className="soon up">
      <div className="soon-atmo" aria-hidden="true">
        <Spores colors={WARM_SPORES} />
      </div>

      <header className="soon-top">
        <span className="soon-mark">
          <WaveMark size={22} />
          TITIS&nbsp;ON&nbsp;DECKS
        </span>
        <LangSwitcher />
      </header>

      <nav className="desk-tabs">
        <button
          type="button"
          className={`gal-btn${view === 'send' ? ' is-on' : ''}`}
          onClick={() => setView('send')}
        >
          {g.tabSend}
        </button>
        <button
          type="button"
          className={`gal-btn${view === 'sent' ? ' is-on' : ''}`}
          onClick={() => setView('sent')}
        >
          {g.tabSent}
        </button>
      </nav>

      <main className="up-main">
        {view === 'send'
          ? <Upload passcode={passcode} onPasscode={setPasscode} />
          : <Gallery passcode={passcode} />}
      </main>
    </div>
  )
}
