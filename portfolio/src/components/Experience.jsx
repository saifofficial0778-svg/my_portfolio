import { motion, useReducedMotion } from 'framer-motion'
import Section from './ui/Section'
import { experience } from '../data/resume'
import { getFadeUpVariants, getStaggerContainer } from '../lib/motion'

export default function Experience() {
  const shouldReduceMotion = useReducedMotion()
  const fadeUp = getFadeUpVariants(shouldReduceMotion)
  const stagger = getStaggerContainer(shouldReduceMotion)

  return (
    <Section id="experience" className="border-t">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="max-w-content mb-12">
          <p className="eyebrow mb-3">Experience</p>
          <h2 className="section-label">Where I've worked</h2>
        </motion.div>

        {experience.map((job) => {
          const stackItems = job.stack.split(',').map((s) => s.trim())
          return (
            <motion.div key={job.role} variants={fadeUp} className="surface-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3
                    className="font-display text-xl md:text-2xl font-semibold"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {job.role}
                  </h3>
                  <p className="text-sm mt-1 text-muted">{job.subtitle}</p>
                </div>
                <span
                  className="shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}
                >
                  {job.date}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {stackItems.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>

              <ul className="space-y-3">
                {job.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
                    />
                    <p className="text-sm md:text-base text-muted">{point}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
