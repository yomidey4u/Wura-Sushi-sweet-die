import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,26,43,0.97)" : "#0A1A2B",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(192,138,62,0.15)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <Link to="/" className="flex flex-col leading-none group">
          <span
            className="text-xl md:text-2xl font-medium tracking-wide transition-colors"
            style={{ fontFamily: "var(--font-serif)", color: "#C08A3E" }}
          >
            Ino Tankale
          </span>
          <span className="text-xs tracking-widest uppercase text-white/40 mt-0.5 group-hover:text-white/60 transition-colors">
            Consultancy
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm tracking-wide transition-colors duration-200"
                style={{
                  color: active ? "#C08A3E" : "rgba(255,255,255,0.75)",
                  fontWeight: active ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "#fff"
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"
                }}
              >
                {l.label}
              </Link>
            )
          })}
          <Link
            to="/contact"
            className="ml-2 px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200 border"
            style={{
              color: "#C08A3E",
              borderColor: "#C08A3E",
              borderRadius: "2px",
            }}
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

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300 origin-center"
            style={{
              backgroundColor: "#C08A3E",
              transform: open ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: "#C08A3E",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300 origin-center"
            style={{
              backgroundColor: "#C08A3E",
              transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "400px" : "0",
          backgroundColor: "#0A1A2B",
          borderTop: open ? "1px solid rgba(192,138,62,0.15)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((l) => {
            const active = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm tracking-wide py-1"
                style={{ color: active ? "#C08A3E" : "rgba(255,255,255,0.8)" }}
              >
                {l.label}
              </Link>
            )
          })}
          <Link
            to="/contact"
            className="mt-2 px-5 py-2.5 text-sm font-medium tracking-wide text-center border self-start"
            style={{ color: "#C08A3E", borderColor: "#C08A3E", borderRadius: "2px" }}
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </header>
  )
}
