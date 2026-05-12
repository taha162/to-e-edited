# Aether — Cinematic Developer Portfolio

A premium, futuristic developer portfolio built like an interactive cinematic experience.
Designed with a dark luxury aesthetic, aurora gradient lighting, glassmorphism, subtle
3D depth, and choreographed scroll storytelling.

## Tech

- **Next.js 14** (App Router)
- **Tailwind CSS 3.4**
- **Framer Motion 11**
- **Lenis** (smooth scrolling)
- **Lucide** (iconography)
- **TypeScript 5**

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # start production server
npm run lint     # next lint
```

## Architecture

```
app/
  layout.tsx         # global providers, fonts, ambient layers, navigation, footer
  page.tsx           # composes all sections
  globals.css        # design system tokens + utilities
components/
  Navigation.tsx     # animated pill navigation w/ active section observer
  SmoothScroll.tsx   # Lenis-powered cinematic scroll
  AmbientBackground.tsx  # parallax aurora blobs + grid + vignette
  CursorSpotlight.tsx    # cursor-reactive ambient glow (desktop only)
  Footer.tsx
  AnimatedHeading.tsx    # staggered word reveal w/ blur-to-sharp
  MagneticButton.tsx     # cursor-magnetic CTA primitive
  ProjectCard.tsx        # 3D tilt project card w/ depth + cursor spotlight
  sections/
    Hero.tsx        # cinematic intro w/ floating UI chips + scroll cue
    About.tsx       # storytelling + animated timeline
    Skills.tsx      # capability pillars + marquee + highlights
    Projects.tsx    # immersive showcase grid w/ inline cinematic previews
    Contact.tsx     # magnetic CTAs + meta strip + socials
```

## Design system

- **Palette** — `ink-950 → ink-500` deep dark base + `aurora-violet/indigo/cyan/pink/mint` accents
- **Typography** — Space Grotesk (display) + Inter (body) + JetBrains Mono (numerics)
- **Spacing** — 8px grid (Tailwind native)
- **Radius** — 8 / 16 / 24 / 32 (rounded-lg → rounded-4xl)
- **Surfaces** — `.glass` and `.glass-strong` utilities for layered glassmorphism
- **Atmosphere** — fixed grain overlay, parallax aurora blobs, animated gradient lighting

## Motion principles

- All entrances use `cubic-bezier(0.22, 1, 0.36, 1)` ("premium ease")
- Headings: blur-to-sharp staggered word reveal
- Paragraphs: blur + soft upward fade
- Cards: opacity + lift + blur entrance, 3D tilt + cursor spotlight on hover
- Background: subtle parallax tied to scroll progress
- Buttons: magnetic pointer follow + glow ring + scale-less elevation
- All animations respect `prefers-reduced-motion` and degrade gracefully on touch devices

## Performance

- GPU-only transforms (`translate3d`, `scale`, `opacity`, `filter`)
- `will-change` only where necessary; never permanent
- Lenis driven by single `requestAnimationFrame`
- Heavy effects (cursor spotlight, magnetic) disabled on touch / reduced-motion
- Marquee uses CSS animation (no JS frame loop)

## Notes

- All copy is placeholder — swap in your own story, projects, and links.
- Replace project previews in `components/sections/Projects.tsx` with screenshots / `<video>` / 3D scenes as desired.
- Update social handles in `components/sections/Contact.tsx`.

## License

MIT — built as a cinematic foundation for ambitious portfolios.
