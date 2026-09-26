import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Container from './ui/Container'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const shouldReduceMotion = useReducedMotion()
  const panelRef = useRef(null)

  // Scroll-spy: watches whichever nav-target sections currently exist in the
  // DOM. Sections added in later phases (#about, #skills, etc.) are picked
  // up automatically on the next page load — no changes needed here.
  useEffect(() => {
    const targets = NAV_LINKS
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Close the mobile menu on Escape, and lock body scroll while it's open.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => setIsOpen(false)

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-base) 80%, transparent)',
        borderColor: 'var(--color-border-soft)',
      }}
    >
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#home"
          className="font-display text-base font-semibold shrink-0"
          style={{ color: 'var(--color-ink)' }}
        >
          Mohd Saif
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={isActive ? { color: 'var(--color-ink)' } : undefined}
                aria-current={isActive ? 'true' : undefined}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-violet), var(--color-cyan-soft))',
                    }}
                    transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="flex items-center justify-center"
              >
                {isOpen ? (
                  <X size={18} style={{ color: 'var(--color-ink)' }} />
                ) : (
                  <Menu size={18} style={{ color: 'var(--color-ink)' }} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </Container>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            ref={panelRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: 'var(--color-border-soft)', backgroundColor: 'var(--color-base)' }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.04 } } }}
              className="flex flex-col py-3"
            >
              <Container className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => {
                  const isActive = activeId === link.href.slice(1)
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="mobile-nav-link"
                      variants={{
                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
                      }}
                      style={
                        isActive
                          ? { color: 'var(--color-ink)', backgroundColor: 'var(--color-surface-raised)' }
                          : undefined
                      }
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {link.label}
                    </motion.a>
                  )
                })}
              </Container>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
