import { Github, Linkedin, Mail } from 'lucide-react'
import Container from './ui/Container'
import LeetCodeIcon from './icons/LeetCodeIcon'
import { profile } from '../data/resume'

// Sourced from resume.js so the footer never drifts out of sync with the
// Contact section or Hero.
const SOCIAL_LINKS = [
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'GitHub', href: profile.links.github, Icon: Github },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: Linkedin },
  { label: 'LeetCode', href: profile.links.leetcode, Icon: LeetCodeIcon },
].filter((link) => Boolean(link.href))

// Short label derived from the full resume role title (kept in one place
// in resume.js) rather than hardcoded twice.
const shortRole = profile.roleTitle.split('|')[0].trim()

export default function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col items-center gap-6 py-10 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <p className="font-display text-base font-semibold" style={{ color: 'var(--color-ink)' }}>
            {profile.name}
          </p>
          <p className="text-sm text-muted">{shortRole}</p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => {
            const isExternal = href.startsWith('http')
            return (
              <a
                key={label}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                aria-label={label}
                title={label}
                className="icon-link"
              >
                <Icon size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            )
          })}
        </div>
      </Container>

      <Container
        className="border-t py-5 text-center text-xs text-muted"
        style={{ borderColor: 'var(--color-border-soft)' }}
      >
        © {new Date().getFullYear()} {profile.name}. All rights reserved. Built with React, Tailwind CSS &amp; Framer Motion.
      </Container>
    </footer>
  )
}
