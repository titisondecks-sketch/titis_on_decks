/* Rainbow clouds - volumes of coloured light that add where they overlap.

   One component, two callers, the way ArtistPage is one template worn by
   /carla: /joy drifts in the cool seven, /love in the warm ones. The
   palette is the only difference, so it is a prop and the drawing is
   shared - see `.clouds` in home.css.

   Each entry is one volume: hex is its colour, x/y where it sits in the
   field, w/h its size, rot its own tilt, dur its own clock. Nothing here
   divides evenly into anything else, so the arrangement takes minutes to
   repeat rather than pulsing on a beat. */

/* The cool seven - the collective's own colours, the ones the unicorn's
   rainbow is built from. */
export const COOL_CLOUDS = [
  { key: 'wick', hex: '#ff3ecf', x: -34, y: -14, w: 54, h: 46, rot: -14, dur: 27 },
  { key: 'sun', hex: '#ffb32e', x: 30, y: -18, w: 48, h: 40, rot: 10, dur: 31 },
  { key: 'teal', hex: '#37f5e0', x: 36, y: 12, w: 52, h: 38, rot: -8, dur: 23 },
  { key: 'acid', hex: '#b8ff2e', x: -8, y: 24, w: 58, h: 36, rot: 16, dur: 35 },
  { key: 'ember', hex: '#8a5cff', x: -38, y: 14, w: 50, h: 42, rot: 6, dur: 29 },
  { key: 'flame', hex: '#ff7a2e', x: 6, y: -26, w: 46, h: 38, rot: -20, dur: 33 },
  { key: 'sky', hex: '#5bc8ff', x: 2, y: 4, w: 56, h: 44, rot: 4, dur: 25 },
]

/* The warm seven - the same idea in the Nu Breed register: rose, coral
   and gold carry it, and the cool end is kept only as far as it takes to
   stay a rainbow rather than a sunset. */
export const WARM_CLOUDS = [
  { key: 'rose', hex: '#ff4d8d', x: -36, y: -16, w: 56, h: 46, rot: -12, dur: 29 },
  { key: 'coral', hex: '#ff7a4d', x: 28, y: -20, w: 50, h: 42, rot: 14, dur: 33 },
  { key: 'gold', hex: '#ffc247', x: 38, y: 10, w: 54, h: 40, rot: -6, dur: 25 },
  { key: 'honey', hex: '#ffe86b', x: -6, y: 22, w: 52, h: 38, rot: 18, dur: 37 },
  { key: 'jade', hex: '#5bffc0', x: -38, y: 16, w: 46, h: 40, rot: 8, dur: 31 },
  { key: 'plum', hex: '#c05bff', x: 8, y: -26, w: 48, h: 40, rot: -18, dur: 35 },
  { key: 'amber', hex: '#ff9e2e', x: 0, y: 2, w: 58, h: 46, rot: 2, dur: 27 },
]

/* `full` hangs the field behind the whole page instead of sitting it in
   the column - the difference between an illustration and weather. The
   scrim is what makes that safe: screen-blended light on top of body text
   is a contrast problem that moves, so a veil of the page's own ground
   goes over the light and under the words. */
export default function Clouds({ palette = COOL_CLOUDS, full = false }) {
  return (
    <div className={full ? 'clouds clouds-full' : 'clouds'} aria-hidden="true">
      {palette.map((cloud) => (
        <span
          key={cloud.key}
          style={{
            '--hue': cloud.hex,
            '--x': `${cloud.x}%`,
            '--y': `${cloud.y}%`,
            '--w': `${cloud.w}%`,
            '--h': `${cloud.h}%`,
            '--rot': `${cloud.rot}deg`,
            '--dur': `${cloud.dur}s`,
          }}
        />
      ))}
      {full && <i className="clouds-scrim" />}
    </div>
  )
}
