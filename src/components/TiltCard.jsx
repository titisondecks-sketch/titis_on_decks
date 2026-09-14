import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'

/* 3D tilt that follows the pointer, with a moving glare spot.
   `as` lets it render as an <a>, <figure>, etc. */
export default function TiltCard({ children, className = '', as = 'div', maxTilt = 9, ...rest }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 260, damping: 22 })
  const sy = useSpring(py, { stiffness: 260, damping: 22 })
  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt])
  const glareX = useTransform(sx, [0, 1], ['20%', '80%'])
  const glareY = useTransform(sy, [0, 1], ['15%', '85%'])

  const MotionTag = motion[as] || motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className} {...rest}>{children}</Tag>
  }

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <MotionTag
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
      <motion.span
        className="tilt-glare"
        aria-hidden="true"
        style={{ '--gx': glareX, '--gy': glareY }}
      />
    </MotionTag>
  )
}
