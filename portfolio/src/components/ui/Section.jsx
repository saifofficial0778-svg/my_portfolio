import Container from './Container'

/**
 * Standard vertical rhythm + id anchor for every top-level page section
 * (About, Experience, Projects, etc). Keeps spacing consistent so sections
 * don't need to redeclare padding individually.
 */
export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
