import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react'
import Section from './ui/Section'
import Button from './ui/Button'
import LeetCodeIcon from './icons/LeetCodeIcon'
import { profile } from '../data/resume'
import { getFadeUpVariants, getStaggerContainer } from '../lib/motion'

// Sourced straight from resume.js — add/remove a link there and both the
// href *and* the displayed handle flow through here automatically.
const getHandle = (url) => {
  try {
    const path = new URL(url).pathname.replace(/\/+$/, '')
    return path.split('/').filter(Boolean).pop() || url
  } catch {
    return url
  }
}

const CONTACT_LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'LinkedIn', value: getHandle(profile.links.linkedin), href: profile.links.linkedin, Icon: Linkedin },
  { label: 'GitHub', value: getHandle(profile.links.github), href: profile.links.github, Icon: Github },
  { label: 'LeetCode', value: getHandle(profile.links.leetcode), href: profile.links.leetcode, Icon: LeetCodeIcon },
].filter((link) => Boolean(link.href))

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const fadeUp = getFadeUpVariants(shouldReduceMotion)
  const stagger = getStaggerContainer(shouldReduceMotion)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // No backend/form service is wired up, so this honestly opens the user's
  // own email client with the message pre-filled — it never pretends to
  // submit anywhere. Swap this for a real form-service POST (e.g. Formspree)
  // once one is connected.
  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || 'N/A'} (${form.email || 'no email provided'})`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <Section id="contact" className="border-t">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={stagger}
        className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start"
      >
        {/* Invitation + direct links */}
        <motion.div variants={fadeUp}>
          <p className="eyebrow mb-3">Contact</p>
          <h2 className="section-label mb-6">Let's talk about software engineering roles</h2>
          <p className="text-base md:text-lg text-muted max-w-content mb-8">
            I'm actively looking for full-stack and backend engineering opportunities. If you have
            a role, internship, or project in mind — or just want to talk about REST APIs, MySQL
            architecture, or RAG systems — I'd love to hear from you.
          </p>

          <div className="space-y-3">
            {CONTACT_LINKS.map(({ label, value, href, Icon }) => {
              const isExternal = href.startsWith('http')
              return (
                <a
                  key={label}
                  href={href}
                  {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="surface-card flex items-center gap-4 p-4 transition-colors duration-200 hover:border-[var(--color-violet-soft)]"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'var(--color-surface-raised)' }}
                  >
                    <Icon size={17} strokeWidth={2} aria-hidden="true" style={{ color: 'var(--color-violet-soft)' }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                      {label}
                    </span>
                    <span className="block text-sm text-muted break-words">{value}</span>
                  </span>
                </a>
              )
            })}
          </div>
        </motion.div>

        {/* Mailto-backed contact form */}
        <motion.div variants={fadeUp} className="surface-card p-6 md:p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <CheckCircle2 size={36} aria-hidden="true" style={{ color: 'var(--color-violet-soft)' }} className="mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
                Your email app should be open
              </h3>
              <p className="text-sm text-muted max-w-[32ch] mb-6">
                Finish sending the message from there. Nothing was submitted to a server.
              </p>
              <Button variant="secondary" onClick={() => setSent(false)}>
                Fill the form again
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm transition-colors duration-200 focus:border-[var(--color-violet-soft)]"
                  style={{ backgroundColor: 'var(--color-surface-raised)', borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm transition-colors duration-200 focus:border-[var(--color-violet-soft)]"
                  style={{ backgroundColor: 'var(--color-surface-raised)', borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you looking to build or discuss?"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm transition-colors duration-200 focus:border-[var(--color-violet-soft)] resize-none"
                  style={{ backgroundColor: 'var(--color-surface-raised)', borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                <Send size={16} aria-hidden="true" />
                Send via email
              </Button>

              <p className="text-xs text-muted text-center">
                This opens your own email app with the message pre-filled — no data is stored or
                sent to a server. Prefer to write directly?{' '}
                <a href={`mailto:${profile.email}`} className="link-accent break-words">
                  Email {profile.email}
                </a>
                .
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </Section>
  )
}
