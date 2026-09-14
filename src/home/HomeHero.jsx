import { motion, useReducedMotion } from 'motion/react'
import Spores from '../components/Spores.jsx'
import SplitText from '../components/SplitText.jsx'
import ShinyText from '../components/ShinyText.jsx'
import Waveform from '../components/Waveform.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { heroBackdrop } from './media.js'

/* spore palettes per skin: torch-lit amber for home, archived night for pink */
const SPORE_COLORS = {
  home: ['#ffb32e', '#f4ff3d', '#ff7a2e', '#b8ff2e', '#fff4e0'],
  pink: ['#ff3ecf', '#37f5e0', '#8a5cff', '#b8ff2e', '#f0e9ff']
}

export default function HomeHero({ variant = 'home' }) {
  const reduced = useReducedMotion()
  const { t } = useLang()

  return (
    <header className="h-hero" id="top">
      <img className="h-hero-bg" src={heroBackdrop.src} alt="" aria-hidden="true" />
      <Spores colors={SPORE_COLORS[variant] ?? SPORE_COLORS.home} />
      <div className="h-laser h-laser-a" aria-hidden="true" />
      <div className="h-laser h-laser-b" aria-hidden="true" />
      <div className="h-laser h-laser-c" aria-hidden="true" />

      <div className="h-hero-inner">
        <p className="h-eyebrow">
          <ShinyText>{t.home.hero.eyebrow}</ShinyText>
        </p>
        <h1 className="h-title">
          <SplitText as="span" className="row t-sun" text="TiTis" delay={0.2} stagger={0.09} />
          <SplitText as="span" className="t-on" text="on" delay={0.75} stagger={0.09} />
          <SplitText as="span" className="row t-uvy" text="Decks" delay={1.0} stagger={0.09} />
        </h1>
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Waveform />
        </motion.div>
        <motion.p
          className="h-sub"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: 'easeOut' }}
        >
          {t.home.hero.sub}
        </motion.p>
        <motion.div
          className="h-cta-row"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8, ease: 'easeOut' }}
        >
          <a className="h-btn" href="#sound">{t.home.hero.ctaListen}</a>
          <a className="h-btn h-btn-ghost" href="#booking">{t.home.hero.ctaBook}</a>
        </motion.div>
      </div>
    </header>
  )
}
