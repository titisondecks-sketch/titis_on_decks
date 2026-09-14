/* THE MOSAIC - many, one. Drawn, like everything else in this family of
   pages: no image is fetched, and none could say this anyway.

   A grid of tiles, each its own colour, under a radial mask that throws
   the corners away so the grid reads as a single disc. Step back and it
   is one thing; step in and it is a hundred and forty-four. Both true at
   the same time, which is the motto.

   Roman, deliberately: the phrase is Latin and a mosaic is how Romans
   made one picture out of a heap of coloured stones.

   The hues are laid out by the golden angle rather than evenly. An even
   spread across 144 tiles puts neighbours a couple of degrees apart, so
   the grid bands into stripes of near-identical colour; 137.5 degrees is
   the angle that never repeats a neighbour and never clumps - the same
   reason sunflowers use it. Deterministic either way: no Math.random, so
   the page renders the same tiles every time and a screenshot is
   comparable to the last one. */
const GOLDEN_ANGLE = 137.508

/* 144 = 12 x 12. Enough that no single tile matters, few enough that you
   can still see there are tiles - the picture stops working in both
   directions if that balance goes. */
const TILE_COUNT = 144

export default function Mosaic({ count = TILE_COUNT }) {
  return (
    <div className="mosaic" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{
            '--h': `${(i * GOLDEN_ANGLE) % 360}deg`,
            /* every tile breathes on its own offset, so the field never
               pulses as one block - that would make it one thing that
               happens to be tiled, which is the opposite of the point */
            '--delay': `${((i * 37) % 60) / 10}s`,
          }}
        />
      ))}
    </div>
  )
}
