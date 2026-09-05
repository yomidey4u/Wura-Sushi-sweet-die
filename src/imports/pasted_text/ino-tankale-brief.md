# Design Brief — Ino Tankale: Signup, Login & Member Dashboard

Copy everything below into Figma (Figma AI / Figma Make) or your AI design tool of choice.

---

## Context

Ino Tankale is a UK-based consultancy (Fractional COO services + Social Media Management) that is now **adding a third service line: Cybersecurity Training**. The public marketing site already exists (navy/gold brand, serif headings, warm and confident tone). This brief is for the **logged-in experience**: signup, login, and what happens after — for two kinds of users who may now overlap:

1. **Consultation clients** — founders/businesses wanting COO or social media support
2. **Trainees** — people taking cybersecurity training/courses

**Key decision already made:** this is **one account system, not two separate portals.** A user signs up once. Inside, they choose (or are shown) a path — "Consultation" and "Training" — most naturally as tabs or a switcher inside a single dashboard shell, not as two disconnected logins. Someone could plausibly want both over time, so don't force a hard fork at signup.

---

## Brand

- Primary: Deep navy `#0A1A2B`
- Accent: Warm gold/amber `#C08A3E`
- Neutrals: cream `#F7F3EE`, warm off-white `#EDE8E0`, charcoal body text `#2C2C2C` / `#4A4A4A`
- Headings: serif (Lora or similar elegant serif)
- Body: clean modern sans-serif (Outfit or similar)
- Tone: boutique consultancy — premium, confident, personal, not corporate or templated

**Open design question for you to answer:** Should the Training side visually feel like part of the same family, or earn a slightly distinct identity (e.g. a secondary accent color, a more technical/structured typographic rhythm, subtle "terminal" or "systems" visual motifs appropriate to cybersecurity) while staying recognizably Ino Tankale? Propose whichever reads best — this doesn't need to match the consultancy pages 1:1, it needs to feel like a trustworthy sibling of them. If you introduce a second accent, keep it in the same tonal family as the gold (don't clash) and use it sparingly — for wayfinding, not decoration.

---

## Core flow

### 1. Sign up
- Single form: name, email, password (+ confirm)
- Optional, non-blocking: "What brings you here?" as a soft-select (Consultation / Training / Both / Just exploring) — used only to personalize the first dashboard view, never to gate access. Someone who picks "Consultation" today should be able to explore Training later without re-registering.
- Clear link to log in instead
- Real validation states (inline errors, not just red borders — tell the person what to fix)
- After signup: land directly in the dashboard, not a dead-end confirmation page

### 2. Log in
- Email + password, "forgot password" link
- Same visual family as signup — this shouldn't feel like a different product
- Clear error state for wrong credentials (never vague like "something went wrong")

### 3. Dashboard shell (the home base after login)
- Persistent header/sidebar with the account name, a way to get back to the marketing site, and a clear switcher between **Consultation** and **Training** — make this switcher the single most legible element in the UI, since it's the whole point of one account serving two needs
- A short personalized greeting, not a generic "Welcome to your dashboard"
- Room for a global "Book a consultation" or "Talk to us" action that's always reachable regardless of which path someone's in — this business runs on conversations, don't bury that

### 4. Consultation path (inside dashboard)
- Status of any current engagement or enquiry (or an empty state prompting them to book, if none yet)
- A way to message or book time directly (this can visually reuse/extend the existing public contact form's field logic: name, business, which service, message)
- Space for simple engagement history later (not required now — just don't design something that can't grow into it)

### 5. Training path (inside dashboard)
No fixed spec here — you have room to propose the simplest version that still feels complete. As a starting point to react to, not a requirement:
- A course/module library — cards or a list, each with a short description and a clear state (not started / in progress / complete)
- One "continue where you left off" entry point, since that's what makes a training dashboard feel alive rather than static
- A resources area for anything supplementary (guides, downloads) if it fits naturally
- Keep it honest about where the content actually lives today — if there isn't a real course backend yet, design an empty/early state that looks intentional (e.g. "Your first course is being prepared" with a realistic date or a waitlist-style message), not a broken-feeling placeholder

Propose whichever structure feels the most genuinely useful for someone learning cybersecurity fundamentals in a self-paced way — you know this pattern well from good LMS design (Coursera, Maven, or similar have solved wayfinding for exactly this). Don't over-build it; a shortlist of well-designed modules beats a sprawling nav.

### 6. Account settings
- Simple: name, email, password change, sign out
- Nothing fancy needed here — just make sure it exists and matches the visual language

---

## Functional requirements

- Fully responsive, mobile-first — assume a real trainee will often be on a phone
- Fast, minimal but polished transitions (consistent with the subtle fade/slide-in style already used on the marketing site)
- Accessible contrast on navy/gold, including any new accent color you introduce
- Clear empty states everywhere data doesn't exist yet — never a blank void
- Sticky, always-visible way back to "Book a consultation" from any authenticated screen

## Notes for the AI designer

- This is an extension of an existing brand, not a fresh one — anchor to the navy/gold/serif identity already established, then use your judgment on where the Training experience earns its own visual texture.
- Avoid generic SaaS-dashboard clichés (blue sidebar, default Material icons, stock "welcome back" hero banners). This should still feel like a boutique, personal business — even the software surfaces.
- Avoid generic cybersecurity clichés too (hoodie hackers, green matrix code, padlock-on-globe stock art). Favor clean typographic structure, and if you want a technical motif, something more like subtle grid/circuit-inspired line work used sparingly beats literal iconography.
- Copy/microcopy throughout should sound like a confident senior operator talking to the user directly — not corporate SaaS voice ("Oops! Something went wrong 🙃" is wrong; direct and warm is right).