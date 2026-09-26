import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, GraduationCap, Sparkles } from 'lucide-react'
import Section from './ui/Section'
import { getFadeUpVariants, getStaggerContainer } from '../lib/motion'

const QUICK_FACTS = [
  { Icon: MapPin, text: 'Bareilly, Uttar Pradesh, India' },
  { Icon: GraduationCap, text: 'MCA · SRMS College · Expected 2027' },
  { Icon: Sparkles, text: 'Focus: backend engineering & AI/RAG systems' },
]

export default function About() {
  const shouldReduceMotion = useReducedMotion()
  const fadeUp = getFadeUpVariants(shouldReduceMotion)
  const stagger = getStaggerContainer(shouldReduceMotion)

  return (
    <Section id="about">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-12 lg:gap-16 items-start"
      >
        <motion.div variants={fadeUp}>
          <p className="eyebrow mb-3">About</p>
          <h2 className="section-label mb-6">A backend-first developer, building toward AI</h2>

          <div className="space-y-4 text-base md:text-lg text-muted max-w-content">
            <p>
              I'm a full-stack developer with a backend-first mindset, currently pursuing my
              Master of Computer Applications (MCA) at SRMS College, Bareilly — expected to
              graduate in 2027. Most of my hands-on experience comes from building two
              production-style platforms: a multi-tenant School ERP system and SRMS Connect,
              an alumni-student networking platform, where I worked on REST APIs, JWT/RBAC
              authentication, and MySQL-driven backend architecture.
            </p>
            <p>
              Alongside backend work, I've been exploring how large language models and
              Retrieval-Augmented Generation can power practical applications — from an AI
              resume screening tool to a personal RAG system built over my own study notes.
              I also keep my CS fundamentals sharp: I've solved 100+ DSA problems and stay
              grounded in OOP, DBMS, operating systems, and computer networks.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="surface-card p-6 space-y-5">
          {QUICK_FACTS.map(({ Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: 'var(--color-surface-raised)' }}
              >
                <Icon size={16} aria-hidden="true" style={{ color: 'var(--color-violet-soft)' }} />
              </span>
              <p className="text-sm md:text-[0.95rem] pt-2" style={{ color: 'var(--color-ink)' }}>
                {text}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
