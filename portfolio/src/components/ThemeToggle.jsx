import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const shouldReduceMotion = useReducedMotion()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border transition-colors duration-200"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.7 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun size={16} strokeWidth={2} aria-hidden="true" style={{ color: 'var(--color-ink-muted)' }} />
          ) : (
            <Moon size={16} strokeWidth={2} aria-hidden="true" style={{ color: 'var(--color-ink-muted)' }} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
