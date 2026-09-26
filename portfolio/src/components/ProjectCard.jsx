import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Github, ExternalLink, ArrowRight } from 'lucide-react'
import { getFadeUpVariants } from '../lib/motion'

const PREVIEW_COUNT = 2

export default function ProjectCard({ project }) {
  const { title, tagline, stack, points, pipeline, githubUrl, liveUrl } = project
  const [expanded, setExpanded] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const fadeUp = getFadeUpVariants(shouldReduceMotion)

  const previewPoints = points.slice(0, PREVIEW_COUNT)
  const restPoints = points.slice(PREVIEW_COUNT)
  const hasMore = restPoints.length > 0
  const hasLinks = Boolean(githubUrl || liveUrl)
  // Stable id for the expandable region so the toggle button can reference
  // it with aria-controls (screen readers announce what the button reveals).
  const detailsId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-details`

  return (
    <motion.article
      variants={fadeUp}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="surface-card p-6 md:p-7 flex flex-col h-full transition-colors duration-200 hover:border-[var(--color-violet-soft)]"
    >
      <h3 className="font-display text-lg md:text-xl font-semibold" style={{ color: 'var(--color-ink)' }}>
        {title}
      </h3>
      <p className="mt-2 text-sm md:text-[0.95rem] text-muted">{tagline}</p>

      <div className="flex flex-wrap gap-2 mt-5">
        {stack.map((item) => (
          <span key={item} className="skill-chip">
            {item}
          </span>
        ))}
      </div>

      {pipeline && (
        <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {pipeline.map((step, i) => (
            <span key={step} className="flex items-center gap-1.5">
              <span
                className="rounded-md border px-2 py-1 text-xs font-medium"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}
              >
                {step}
              </span>
              {i < pipeline.length - 1 && (
                <ArrowRight size={12} aria-hidden="true" style={{ color: 'var(--color-ink-faint)' }} />
              )}
            </span>
          ))}
        </div>
      )}

      <ul className="mt-5 space-y-2.5">
        {previewPoints.map((point) => (
          <li key={point} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
            />
            <p className="text-sm text-muted">{point}</p>
          </li>
        ))}
      </ul>

      {hasMore && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
              className="space-y-2.5 overflow-hidden"
            >
              {restPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 pt-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
                  />
                  <p className="text-sm text-muted">{point}</p>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium self-start transition-colors duration-200"
          style={{ color: 'var(--color-violet-soft)' }}
        >
          {expanded ? 'Show less' : 'View details'}
          <ChevronDown
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
      )}

      {hasLinks && (
        <div className="mt-6 pt-5 border-t flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="icon-link"
              aria-label={`${title} on GitHub`}
              title="View source on GitHub"
            >
              <Github size={17} aria-hidden="true" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="icon-link"
              aria-label={`${title} live demo`}
              title="View live demo"
            >
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}
