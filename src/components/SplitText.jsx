import { motion, useReducedMotion } from 'motion/react'

/* Splits text into characters that flicker on like neon tubes, one after
   another. `as` controls the wrapper element so headings stay headings. */
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  once = true
}) {
  const reduced = useReducedMotion()
  const chars = Array.from(text)

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(6px)' }}
          whileInView={{
            opacity: [0, 1, 0.35, 1],
            y: ['0.35em', '0em', '0em', '0em'],
            filter: ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
          }}
          viewport={{ once, amount: 0.6 }}
          transition={{
            delay: delay + i * stagger,
            duration: 0.7,
            times: [0, 0.55, 0.75, 1],
            ease: 'easeOut'
          }}
        >
          {ch}
        </motion.span>
      ))}
    </Tag>
  )
}
