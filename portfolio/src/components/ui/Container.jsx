/**
 * Constrains content to the site's shell width with responsive side padding.
 * Use this instead of repeating max-width/padding utility classes per section.
 */
export default function Container({ children, className = '' }) {
  return <div className={`container-shell ${className}`}>{children}</div>
}
