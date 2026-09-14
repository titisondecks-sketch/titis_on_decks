import { motion, useReducedMotion } from 'motion/react'

/* Scroll-into-view fade + rise. Wraps a section or any block. */
export default function Reveal({ children, className = '', delay = 0, y = 26 }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
