import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'motion/react'

/* ---- the listener ----

   The turntable hands its <audio> element in here from the click that
   starts it, and the flower field asks audioLevel() every frame and
   breathes to the bass. Module state rather than context, the way
   sun_dra's audio bus does it: no React, one element per page, nothing
   to unmount.

   Desktop only, on purpose. A media element routed through Web Audio
   comes under iOS's ring/silent switch, where a plain <audio> does not -
   a phone on silent would watch the arm go down and hear nothing - and
   the field has no room to react on a phone anyway. So the analyser is
   only attached where there is a fine pointer and a hover; everywhere
   else the record simply plays. */
let ctx = null
let analyser = null
let data = null
let attached = null

export function attachAudio(el) {
  if (attached === el) {
    ctx?.resume()
    return
  }
  if (attached || typeof AudioContext === 'undefined') return
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  try {
    ctx = new AudioContext()
    const source = ctx.createMediaElementSource(el)
    analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.82
    data = new Uint8Array(analyser.frequencyBinCount)
    source.connect(analyser)
    analyser.connect(ctx.destination)
    attached = el
    ctx.resume()
  } catch {
    /* an engine without MediaElementSource: the record still plays, the
       field just does not hear it */
    analyser = null
  }
}

/* Bass-weighted energy, 0..1: the bottom twenty bins, roughly the bottom
   1.7 kHz at 44.1 kHz and fftSize 256. Cheap enough to ask every frame. */
export function audioLevel() {
  if (!analyser || !attached || attached.paused) return 0
  analyser.getByteFrequencyData(data)
  let sum = 0
  for (let i = 0; i < 20; i++) sum += data[i]
  return Math.min(1, (sum / (20 * 255)) * 1.6)
}

/* 33⅓ rpm, in degrees per second: one turn in 1.8 s. */
const RPM_33 = 200

function Equalizer({ on }) {
  return (
    <span className="tt-eq" aria-hidden="true">
      {[0.5, 0.9, 0.7, 1, 0.6].map((h, i) => (
        <motion.span
          key={i}
          animate={on ? { scaleY: [0.3, h, 0.4, 1, 0.3] } : { scaleY: 0.25 }}
          transition={on ? { duration: 0.9 + i * 0.13, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
        />
      ))}
    </span>
  )
}

/* A turntable, after the one on sun_dra: a sleeve tilted out behind the
   platter, a record with its label paper, a tonearm on a spring, and a
   cue line underneath that says what to do and then what is happening.
   The record is the control - press it and the needle goes down, press
   it again and it lifts - and the <audio> under it is the only sound on
   the page.

   `record` is { artist, title, catalogue, label, href, sources }; the
   sources are public paths with their MIME types, first playable wins.
   `labels` is { drop, lift, playing } out of i18n. `onNeedle(down)` is
   told after the record has actually started or stopped, never before:
   a browser can refuse play(), and then the arm stays up and nobody is
   told anything. */
export default function Turntable({ record, stripes = [], labels, onNeedle }) {
  const reduced = useReducedMotion()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  /* The platter has inertia: it spins up when the needle goes down and
     runs out when it lifts, rather than snapping between the two. The
     angle is a motion value on the record itself, so the label paper
     turns with it. Held still under reduced motion - the arm still moves
     there, because the arm is the state, not decoration. */
  const angle = useMotionValue(0)
  const speed = useRef(0)
  useEffect(() => {
    if (reduced) return undefined
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(48, now - last) / 1000
      last = now
      const target = playing ? RPM_33 : 0
      speed.current += (target - speed.current) * Math.min(1, (playing ? 2.2 : 1.4) * dt)
      if (!playing && speed.current < 1) {
        speed.current = 0
        return
      }
      angle.set((angle.get() + speed.current * dt) % 360)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, reduced, angle])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
      onNeedle?.(false)
      return
    }
    attachAudio(a)
    try {
      await Promise.resolve(a.play())
    } catch {
      /* refused - an autoplay policy that did not count the click, a
         file the engine cannot decode - so the arm stays up */
      return
    }
    setPlaying(true)
    onNeedle?.(true)
    /* the lock screen and the media keys get the sleeve, not the page title */
    if ('mediaSession' in navigator && typeof MediaMetadata !== 'undefined') {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: record.title,
          artist: record.artist,
          album: `${record.catalogue} · ${record.label}`,
        })
      } catch {
        /* an engine that knows the session but not the metadata */
      }
    }
  }

  const spring = (stiffness, damping) => (reduced ? { duration: 0 } : { type: 'spring', stiffness, damping })

  return (
    <div className="tt">
      <div className="tt-stage">
        {/* the sleeve, tilted out behind the platter; it slides out of
            the way once the record is on */}
        <motion.div
          className="tt-sleeve"
          initial={false}
          animate={playing ? { x: '-16%', y: -10, rotate: -8 } : { x: '-3%', y: 0, rotate: -2 }}
          transition={spring(120, 14)}
        >
          <div className="tt-sleeve-inner">
            <div>
              <a className="tt-artist" href={record.href} target="_blank" rel="noopener noreferrer">
                {record.artist}
              </a>
              <p className="tt-title">{record.title}</p>
              <p className="tt-cat">
                {record.catalogue} · {record.label}
              </p>
            </div>
            <div className="tt-stripes" aria-hidden="true">
              {stripes.map((c) => (
                <span key={c} className="tt-stripe" style={{ background: c }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* the record is the control */}
        <motion.button
          type="button"
          className="tt-platter"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? labels.lift : labels.drop}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span className="tt-vinyl" style={{ rotate: angle }}>
            <span className="tt-sheen" />
            <span className="tt-paper">
              <span className="tt-paper-artist">{record.artist}</span>
              <span className="tt-hole" />
              <span className="tt-paper-title">{record.title}</span>
              <span className="tt-paper-cat">{record.catalogue}</span>
            </span>
          </motion.span>

          <motion.span
            className="tt-tonearm"
            aria-hidden="true"
            initial={false}
            animate={{ rotate: playing ? 22 : -8 }}
            transition={spring(90, 12)}
          >
            <span className="tt-pivot" />
            <span className="tt-rod" />
            <span className="tt-head" />
          </motion.span>
        </motion.button>
      </div>

      <motion.p
        className="tt-cue"
        aria-live="polite"
        animate={playing && !reduced ? { opacity: [0.6, 1, 0.6] } : { opacity: playing ? 1 : 0.7 }}
        transition={playing && !reduced ? { duration: 1.6, repeat: Infinity } : { duration: 0.3 }}
      >
        {playing ? labels.playing : labels.drop}
        {playing && <Equalizer on={!reduced} />}
      </motion.p>

      {/* Loops, because everything on the page it lives on does. Nothing
          is fetched until the needle goes down; the page has enough to
          carry already. */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        {record.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </audio>
    </div>
  )
}
