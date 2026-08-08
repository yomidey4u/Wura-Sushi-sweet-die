import { Link } from "react-router-dom"

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.23a8.18 8.18 0 0 0 4.78 1.52V7.3a4.85 4.85 0 0 1-1.01-.61z" />
      </svg>
    ),
  },
]

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A1A2B" }}>
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand column */}
        <div>
          <div className="mb-4">
            <span
              className="text-2xl font-medium tracking-wide"
              style={{ fontFamily: "var(--font-serif)", color: "#C08A3E" }}
            >
              Ino Tankale
            </span>
            <div className="text-xs tracking-widest uppercase text-white/40 mt-1">Consultancy</div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Strategic execution and social media management for founders and public figures who are ready to do more than plan.
          </p>

          {/* Socials */}
          <div className="flex gap-3 mt-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="flex items-center justify-center w-9 h-9 rounded-sm transition-all duration-200"
                style={{
                  border: "1px solid rgba(192,138,62,0.25)",
                  color: "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "#C08A3E"
                  el.style.color = "#C08A3E"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "rgba(192,138,62,0.25)"
                  el.style.color = "rgba(255,255,255,0.5)"
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: "#C08A3E" }}
          >
            Navigation
          </h4>
          <ul className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/60 hover:text-white/90 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: "#C08A3E" }}
          >
            Get in Touch
          </h4>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <p>Newmarket, Suffolk, UK</p>
            <a
              href="mailto:hello@inotankale.co.uk"
              className="hover:text-white/90 transition-colors"
            >
              hello@inotankale.co.uk
            </a>
          </div>
          <Link
            to="/contact"
            className="inline-block mt-6 px-5 py-2.5 text-sm font-medium tracking-wide border transition-all duration-200"
            style={{ color: "#C08A3E", borderColor: "#C08A3E", borderRadius: "2px" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = "#C08A3E"
              el.style.color = "#0A1A2B"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = "transparent"
              el.style.color = "#C08A3E"
            }}
          >
            Book a Consultation
          </Link>
        </div>
      </div>

      {/* Legal strip */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-xs text-white/35 leading-relaxed">
            © {new Date().getFullYear()} Ino Tankale Ltd. All rights reserved.
          </p>
          <p className="text-xs text-white/25 leading-relaxed">
            Ino Tankale Ltd · Company No. 17355288 · Registered office: 66 Paul Street, London, England, EC2A 4NA ·
            SIC 70229 — Management consultancy activities other than financial management
          </p>
        </div>
      </div>
    </footer>
  )
}
