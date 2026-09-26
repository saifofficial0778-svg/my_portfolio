import { motion, useReducedMotion } from 'framer-motion'
import { Code2, Layout, Server, Database, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import Section from './ui/Section'
import { skills } from '../data/resume'
import { getFadeUpVariants, getStaggerContainer } from '../lib/motion'

// Groups the resume's skill categories into the display layout requested.
// The underlying data in resume.js stays untouched — this is presentation only.
const SKILL_GROUPS = [
  { title: 'Programming Languages', Icon: Code2, items: skills.Languages },
  { title: 'Frontend', Icon: Layout, items: skills.Frontend },
  { title: 'Backend', Icon: Server, items: skills.Backend },
  { title: 'Databases', Icon: Database, items: skills.Databases },
  {
    title: 'Authentication & Architecture',
    Icon: ShieldCheck,
    items: [...skills['Authentication & Security'], ...skills.Architecture],
  },
  { title: 'AI / GenAI', Icon: Sparkles, items: skills['AI / Generative AI'] },
  { title: 'Tools & Core CS', Icon: Wrench, items: [...skills.Tools, ...skills['Core CS']] },
]

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()
  const fadeUp = getFadeUpVariants(shouldReduceMotion)
  const stagger = getStaggerContainer(shouldReduceMotion, 0.06)

  return (
    <Section id="skills" className="border-t">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="max-w-content mb-12">
          <p className="eyebrow mb-3">Skills</p>
          <h2 className="section-label">Technologies I work with</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SKILL_GROUPS.map(({ title, Icon, items }) => (
            <motion.div key={title} variants={fadeUp} className="surface-card p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <Icon size={18} style={{ color: 'var(--color-violet-soft)' }} />
                <h3 className="font-display text-base font-semibold" style={{ color: 'var(--color-ink)' }}>
                  {title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
