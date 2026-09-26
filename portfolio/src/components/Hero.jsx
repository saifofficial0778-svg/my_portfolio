import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import Section from './ui/Section'
import Button from './ui/Button'
import LeetCodeIcon from './icons/LeetCodeIcon'
import { profile } from '../data/resume'
import profileImg from '../assets/profile.jpeg'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: profile.links.github, Icon: Github },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: Linkedin },
  { label: 'LeetCode', href: profile.links.leetcode, Icon: LeetCodeIcon },
].filter((link) => Boolean(link.href))

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: 'easeOut' },
    }),
  }

  return (
    <Section id="home" className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Ambient background glow — decorative only, ignored by screen readers.
          Kept faint since the page already carries a subtle global tint. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: 'var(--color-violet)' }}
        />
        <div
          className="absolute top-1/3 right-0 h-[360px] w-[360px] rounded-full blur-[120px] opacity-[0.12]"
          style={{ backgroundColor: 'var(--color-cyan)' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center w-full">
        {/* Text column */}
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="eyebrow mb-4"
          >
            Full-Stack Developer · Backend &amp; AI/RAG
          </motion.p>

          <motion.h1
            custom={0.08}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] max-w-[22ch] sm:max-w-[20ch] lg:max-w-[17ch]"
            style={{ color: 'var(--color-ink)' }}
          >
            Building secure backend systems{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              with a growing focus on AI &amp; RAG
            </span>
          </motion.h1>

          <motion.p
            custom={0.16}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-base md:text-lg text-muted max-w-content"
          >
            MERN/Full-stack developer and MCA candidate (expected 2027), building scalable
            REST APIs, JWT/RBAC authentication systems, and MySQL-driven backends — with
            hands-on experience integrating LLMs and Retrieval-Augmented Generation for
            AI-powered applications.
          </motion.p>

          <motion.div
            custom={0.24}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href="#projects" variant="primary">
              View Projects
            </Button>
            <Button as="a" href="#contact" variant="secondary">
              Contact Me
            </Button>
          </motion.div>

          {SOCIAL_LINKS.length > 0 && (
            <motion.div
              custom={0.32}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 flex items-center gap-3"
            >
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  title={label}
                  className="icon-link"
                >
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
            </motion.div>
          )}
        </div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2rem] opacity-40 blur-lg -z-10"
            style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan))' }}
          />
          <div
            className="relative rounded-[1.75rem] p-[3px]"
            style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
          >
            <div
              className="overflow-hidden rounded-[1.6rem]"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <img
                src={profileImg}
                alt="Portrait of Mohd Saif"
                className="aspect-[4/5] w-full object-cover"
                width={480}
                height={600}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
