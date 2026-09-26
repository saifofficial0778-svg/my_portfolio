import { motion, useReducedMotion } from 'framer-motion'
import Section from './ui/Section'
import ProjectCard from './ProjectCard'
import { projects } from '../data/resume'
import { getFadeUpVariants, getStaggerContainer } from '../lib/motion'

export default function Projects() {
  const shouldReduceMotion = useReducedMotion()
  const fadeUp = getFadeUpVariants(shouldReduceMotion)
  const stagger = getStaggerContainer(shouldReduceMotion, 0.08)

  return (
    <Section id="projects" className="border-t">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="max-w-content mb-12">
          <p className="eyebrow mb-3">Projects</p>
          <h2 className="section-label">Things I've built</h2>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
