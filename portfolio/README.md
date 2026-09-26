# Mohd Saif — Portfolio

React + Vite + Tailwind CSS + Framer Motion + Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure (current phase)

```
src/
  assets/
    profile.jpeg          # your photo, used in the hero
  components/
    ui/
      Button.jsx           # primary / secondary / ghost variants
      Container.jsx         # max-width shell wrapper
      Section.jsx            # section spacing + id anchor
    icons/
      LeetCodeIcon.jsx        # custom icon (not in lucide-react)
    Navbar.jsx                 # smooth-scroll nav, mobile menu, scroll-spy
    Hero.jsx                    # headline, photo, CTAs, social links
    About.jsx                    # intro copy + quick-facts card
    Skills.jsx                    # categorized skill cards with chips
    Experience.jsx                 # SRMS Connect internship card
    Projects.jsx                    # project grid (renders ProjectCard)
    ProjectCard.jsx                  # expandable card, optional pipeline diagram
    Footer.jsx
    ThemeToggle.jsx
  context/
    ThemeContext.jsx          # light/dark toggle, persisted in localStorage
  data/
    resume.js                  # structured resume content (source of truth)
  lib/
    motion.js                   # shared stagger/fade-up animation variants
  index.css                     # design tokens + reusable classes
  App.jsx
  main.jsx
```

## Sections built so far

- ✅ Navbar (Home, About, Skills, Experience, Projects, Contact — smooth scroll, mobile menu, scroll-spy, theme toggle)
- ✅ Hero (headline, intro, photo, CTAs, social links)
- ✅ About (intro copy + quick-facts card)
- ✅ Skills (7 categorized cards, chip layout)
- ✅ Experience (SRMS Connect internship — role, dates, stack, achievements)
- ✅ Projects (School ERP, SRMS Connect, AI Resume Parser, Personal Notes RAG)
- ⬜ Contact — not built yet

Note: the Navbar's "Contact" link points to `#contact`, which doesn't exist
yet, so clicking it currently does nothing (no error, just no scroll) until
that section is built. All other nav links now scroll correctly.

GitHub/live-demo buttons on project cards are hidden by default
(`githubUrl`/`liveUrl` are `null` in `resume.js`) since no real project URLs
were provided. Fill those in whenever you have them — the button appears
automatically.
