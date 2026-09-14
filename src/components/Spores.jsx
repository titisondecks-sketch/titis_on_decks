import { useEffect, useRef } from 'react'

const DEFAULT_COLORS = ['#ff3ecf', '#37f5e0', '#8a5cff', '#b8ff2e', '#f0e9ff']

/* Ambient spores drifting up through the hero - canvas, throttled to the
   element's size, paused when the tab is hidden. Pass `colors` for a
   different palette (the warm home page does); pass a stable array. */
export default function Spores({ colors = DEFAULT_COLORS }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const host = canvas.parentElement
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0
    let spores = []
    let raf = 0
    let running = true

    const makeSpore = (fresh) => ({
      x: Math.random() * W,
      y: fresh ? H + 10 : Math.random() * H,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.15 + Math.random() * 0.45,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.004 + Math.random() * 0.01,
      swayAmp: 0.3 + Math.random() * 0.7,
      color: colors[(Math.random() * colors.length) | 0],
      alpha: 0.25 + Math.random() * 0.55
    })

    /* THE BITMAP FOLLOWS THE BOX, always. The canvas is styled 100% x 100%
       of its host, so whenever the host's box changes, the bitmap has to be
       re-sized to match or the browser stretches the old bitmap to fit -
       and a stretch that is not the same in both axes turns every round
       spore into a smear. That is not hypothetical: a `position: fixed;
       inset: 0` host on a phone grows and shrinks every time the browser
       toolbar collapses, and that transition does not reliably fire a
       window `resize`. So the size is watched three ways below, and this
       is the one place all of them land.

       Existing spores survive a resize: their positions are scaled into
       the new box and the count is topped up or trimmed. Regenerating
       them all - what this used to do - made the whole field jump every
       time a toolbar moved, which is exactly the moment a phone is
       looking at it. */
    const resize = () => {
      const nextW = host.clientWidth
      const nextH = host.clientHeight
      if (nextW === W && nextH === H) return
      const sx = W ? nextW / W : 1
      const sy = H ? nextH / H : 1
      W = nextW
      H = nextH
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, Math.max(35, (W * H) / 22000)))
      spores = spores.map((s) => ({ ...s, x: s.x * sx, y: s.y * sy })).slice(0, count)
      while (spores.length < count) spores.push(makeSpore(false))
    }

    /* the third watch: every half second or so the frame loop itself
       checks the box, so even a browser that fires neither `resize` nor
       ResizeObserver during a toolbar transition is caught within a few
       hundred milliseconds instead of never */
    let tick = 0
    const frame = () => {
      if (!running) return
      if (++tick % 30 === 0) resize()
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < spores.length; i++) {
        let s = spores[i]
        s.y -= s.vy
        s.sway += s.swaySpeed
        s.x += Math.sin(s.sway) * s.swayAmp * 0.4
        if (s.y < -12) spores[i] = s = makeSpore(true)

        ctx.globalAlpha = s.alpha
        ctx.fillStyle = s.color
        ctx.shadowColor = s.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      const wasRunning = running
      running = !document.hidden
      if (running && !wasRunning) raf = requestAnimationFrame(frame)
    }

    resize()
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    /* the second watch: ResizeObserver reports the host's own box, which
       is the thing that actually matters - a fixed host can change size
       with no window resize at all. Guarded: the test preload has no
       ResizeObserver, and neither did every browser this has to run in. */
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null
    ro?.observe(host)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      ro?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [colors])

  return <canvas ref={canvasRef} id="spores" aria-hidden="true" />
}
