/**
 * Shared scroll-reveal animation variants.
 * Used by any section that fades/staggers its content into view.
 * Pass the result of Framer Motion's `useReducedMotion()` so movement
 * is dropped (opacity-only) when the user prefers reduced motion.
 */

export function getFadeUpVariants(shouldReduceMotion) {
  return {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }
}

export function getStaggerContainer(shouldReduceMotion, staggerChildren = 0.08) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : staggerChildren },
    },
  }
}
