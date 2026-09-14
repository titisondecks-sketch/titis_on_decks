/* A slow light sweep across text, like a torch passing over a tapestry.
   Pure CSS (see .shiny in site.css); disabled by prefers-reduced-motion. */
export default function ShinyText({ children, className = '' }) {
  return <span className={`shiny ${className}`}>{children}</span>
}
