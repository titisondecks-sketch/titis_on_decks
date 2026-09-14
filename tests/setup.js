/* Preload for `bun test`. Replaces what vitest.config.js + vitest.setup.js
   gave for free: a jsdom global, the IntersectionObserver/matchMedia/canvas
   stubs, and two vi.* calls Bun's built-in vitest-compat shim is missing
   (vi.stubGlobal / vi.unstubAllGlobals).

   Bun's `vi` (from bun:test; the bare `vitest` specifier is aliased to the
   same object) ships fn/spyOn/mock/restoreAllMocks/resetAllMocks/
   clearAllMocks but not stubGlobal/unstubAllGlobals. This file patches
   those two methods onto that singleton, so every test file's
   `import { vi } from 'bun:test'` sees them.

   `bun test` also has one process-wide preload, not a per-file hook, so the
   `// @vitest-environment-options { "url": "..." }` docblock Vitest used to
   read has no equivalent here. Files that need a distinct URL call
   setTestUrl() once at the top instead - see below. That only works
   reliably under `--isolate`, which gives each test file a fresh global
   object; without it, one file's setTestUrl() would leak into the next
   file sharing the same global. */

import { JSDOM, VirtualConsole } from 'jsdom'
import { vi } from 'bun:test'

const DEFAULT_URL = 'https://titisondecks.com/'

/* jsdom reports every API it lacks ("Not implemented: Window's
   scrollTo()") as a jsdomError on its console; dropped, they are noise
   in every run and never a test's fault. Real page errors still print. */
const quiet = new VirtualConsole()
quiet.forwardTo(console, { jsdomErrors: 'none' })

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: DEFAULT_URL,
  pretendToBeVisual: true,
  virtualConsole: quiet,
})

/* Copy every enumerable global the jsdom window carries (HTMLElement,
   HTMLMediaElement, Event, matchMedia once defined below, etc) rather
   than hand-picking - a fixed allow-list kept missing constructors
   (HTMLMediaElement broke a page test with a "spyOn is not defined"-
   adjacent ReferenceError before this was widened). */
function applyWindow(win) {
  /* the router scrolls to the top at mount; jsdom has no viewport */
  win.scrollTo = () => {}
  /* Set before copying, so the copy loop below picks it up too -
     testing-library and React check `window.matchMedia` on the window
     object itself, not just globalThis, so both must carry it. */
  win.matchMedia ??= (query) => ({
    matches: false, media: query, onchange: null,
    addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {},
    dispatchEvent() { return false },
  })
  /* jsdom/lib/jsdom/browser/Window.js wraps several host APIs as
     delegating functions that, at call time, look up the *same* bare
     identifier in the surrounding scope (Node's real queueMicrotask,
     performance, setTimeout, fetch, crypto...). Copying jsdom's wrapper
     over globalThis's slot makes that lookup resolve back to the
     wrapper itself: infinite recursion, confirmed here for `performance`
     (stack overflow on the first `performance.now()` a render triggers)
     and `queueMicrotask` (stack overflow the instant jsdom's Window.js
     assigns it, since the assignment itself calls the old identifier).
     Blanket-copying every window property is therefore unsafe; block
     the known delegating wrappers and keep Bun's native timers/host
     APIs for everything else. */
  const DELEGATING_WRAPPERS = new Set([
    'performance', 'queueMicrotask', 'setTimeout', 'clearTimeout',
    'setInterval', 'clearInterval', 'setImmediate', 'clearImmediate',
    'fetch', 'crypto', 'structuredClone', 'atob', 'btoa',
    'TextEncoder', 'TextDecoder', 'Blob', 'File', 'URL', 'URLSearchParams',
  ])
  for (const key of Object.getOwnPropertyNames(win)) {
    if (key === 'window' || key === 'globalThis' || key === 'self' || key === 'top' || key === 'parent') continue
    if (DELEGATING_WRAPPERS.has(key)) continue
    try { globalThis[key] = win[key] } catch { /* read-only globals (e.g. some intrinsics) */ }
  }
  globalThis.window = win
  globalThis.document = win.document

  /* Every `new JSDOM(...)` call - the initial one and every
     setTestUrl() call below - constructs its own HTMLCanvasElement
     class, so this patch has to be reapplied per window, not just
     once at the top of the file: the first attempt patched only the
     initial window's prototype, and it silently stopped taking effect
     the moment a test called setTestUrl(), which builds a new JSDOM
     instance with an unpatched HTMLCanvasElement. */
  if (win.HTMLCanvasElement) {
    const NOOP_CONTEXT = new Proxy(
      { canvas: null, createLinearGradient: () => ({ addColorStop() {} }), measureText: () => ({ width: 0 }) },
      {
        get(target, prop) {
          if (prop in target) return target[prop]
          return () => {}
        },
        set() { return true },
      }
    )
    win.HTMLCanvasElement.prototype.getContext = () => NOOP_CONTEXT
  }
}
applyWindow(dom.window)

/* Ported from vitest.setup.js verbatim (same rationale, same code). */
class ImmediateIntersectionObserver {
  constructor(callback) { this.callback = callback }
  observe(target) {
    this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this)
  }
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
globalThis.IntersectionObserver ??= ImmediateIntersectionObserver

/* Mutating the singleton here is visible to every test file that does
   `import { vi } from 'bun:test'`, because it is the same object. */
const stubbedGlobals = new Map()

vi.stubGlobal = (name, value) => {
  if (!stubbedGlobals.has(name)) stubbedGlobals.set(name, globalThis[name])
  globalThis[name] = value
  return vi
}
vi.unstubAllGlobals = () => {
  for (const [name, original] of stubbedGlobals) globalThis[name] = original
  stubbedGlobals.clear()
  return vi
}

/* Per-file URL escape hatch for the files that used to carry
   `@vitest-environment-options { "url": "..." }`. Called once, e.g. at
   the top of the file: `setTestUrl('https://.../nubreed')`. Requires
   `bun test --isolate` so one file's URL can't leak into the next. */
export function setTestUrl(url) {
  const fresh = new JSDOM('<!doctype html><html><body></body></html>', { url, pretendToBeVisual: true, virtualConsole: quiet })
  applyWindow(fresh.window)
}
