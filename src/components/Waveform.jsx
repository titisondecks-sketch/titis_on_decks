import { motion, useReducedMotion } from 'motion/react'

/* The logo's waveform brought to life: a small equalizer whose bars pulse
   at slightly different tempos. Purely decorative. */
const HEIGHTS = [10, 22, 34, 16, 27, 34, 12, 30, 18, 33, 14, 24]

export default function Waveform({ bars = 12, scale = 1, className = '' }) {
  const reduced = useReducedMotion()

  return (
    <span className={`h-wave ${className}`} aria-hidden="true">
      {HEIGHTS.slice(0, bars).map((h, i) =>
        reduced ? (
          <i key={i} style={{ height: h * 0.7 * scale }} />
        ) : (
          <motion.i
            key={i}
            style={{ height: h * scale, originY: 1 }}
            animate={{ scaleY: [0.35, 1, 0.5, 0.85, 0.35] }}
            transition={{
              duration: 1.1 + (i % 5) * 0.14,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.08
            }}
          />
        )
      )}
    </span>
  )
}
