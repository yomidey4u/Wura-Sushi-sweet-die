import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import slideWorkspace from "../images/pexels-architecture-1837058_1920.jpg"
import slideProfessional from "../images/mercierzeng-man-7274817_1920.jpg"
import slideTeam from "../images/tumisu-team-4200837_1920.jpg"
import slideGroup from "../images/stocksnap-group-2606784_1920.jpg"
import slideMeeting from "../images/aniset-class-1227100_1920.jpg"

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function HeroCarousel() {
  const slides = [
    { src: slideWorkspace, alt: "Architectural workspace interior" },
    { src: slideProfessional, alt: "Professional working in a modern office" },
    { src: slideTeam, alt: "Team collaborating around a desk" },
    { src: slideGroup, alt: "Group discussion and planning" },
    { src: slideMeeting, alt: "Focused business meeting scene" },
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl h-[420px] sm:h-[480px]" style={{ backgroundColor: "#091220" }}>
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: activeIndex === index ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: activeIndex === index ? "#C08A3E" : "rgba(255,255,255,0.45)",
              transform: activeIndex === index ? "scale(1.15)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ backgroundColor: "#0A1A2B" }}
      >
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(192,138,62,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Gold accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px opacity-30"
          style={{ backgroundColor: "#C08A3E", left: "max(24px, calc(50% - 680px))" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="text-xs tracking-widest uppercase mb-6 flex items-center gap-3"
              style={{ color: "#C08A3E" }}
            >
              <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-white mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Plans are easy.{" "}
              <em className="not-italic" style={{ color: "#C08A3E" }}>
                Execution
              </em>{" "}
              is where it counts.
            </h1>

            

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300"
                style={{ backgroundColor: "#C08A3E", color: "#0A1A2B", borderRadius: "2px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#D4A05A" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#C08A3E" }}
              >
                Book a Consultation
              </Link>
              <Link
                to="/services"
                className="px-7 py-3.5 text-sm font-medium tracking-wide border transition-all duration-300"
                style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.25)", borderRadius: "2px" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "rgba(255,255,255,0.6)"
                  el.style.color = "#fff"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "rgba(255,255,255,0.25)"
                  el.style.color = "rgba(255,255,255,0.8)"
                }}
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Hero image carousel */}
          <div className="lg:pl-8">
            <HeroCarousel />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="text-xs tracking-widest text-white uppercase">Scroll</div>
          <div className="w-px h-10 overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
            <div
              className="w-full h-1/2"
              style={{
                backgroundColor: "#C08A3E",
                animation: "scrollDown 1.8s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes scrollDown {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </section>

      {/* Services overview */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <FadeIn>
          <div className="flex items-center gap-4 mb-4">
            <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#C08A3E" }}>What we do</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-normal mb-16"
            style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
          >
            Two ways we help you grow
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={100}>
            <div
              className="p-10 h-full flex flex-col"
              style={{ backgroundColor: "#0A1A2B", borderRadius: "2px" }}
            >
              <div
                className="text-xs tracking-widest uppercase mb-8 flex items-center gap-3"
                style={{ color: "#C08A3E" }}
              >
                <span className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>01</span>
              </div>
              <h3
                className="text-2xl font-normal text-white mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Fractional / Outsourced COO
              </h3>
              <p className="text-white/60 leading-relaxed mb-8 flex-1">
                You have a strategy. What you need is someone to help you execute it consistently — tracking commitments, holding the plan accountable, and making sure the right things actually get done week after week.
              </p>
              <Link
                to="/services"
                className="text-sm tracking-wide flex items-center gap-2 group w-fit"
                style={{ color: "#C08A3E" }}
              >
                Learn more
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div
              className="p-10 h-full flex flex-col"
              style={{ border: "1px solid rgba(10,26,43,0.12)", borderRadius: "2px" }}
            >
              <div
                className="text-xs tracking-widest uppercase mb-8 flex items-center gap-3"
                style={{ color: "#C08A3E" }}
              >
                <span className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>02</span>
              </div>
              <h3
                className="text-2xl font-normal mb-4"
                style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
              >
                Social Media Management
              </h3>
              <p className="text-charcoal-light leading-relaxed mb-8 flex-1" style={{ color: "#4A4A4A" }}>
                Consistent, professional presence across your platforms — content planned, posted, and managed so you only have to show up for the moments that matter most.
              </p>
              <Link
                to="/services"
                className="text-sm tracking-wide flex items-center gap-2 group w-fit"
                style={{ color: "#C08A3E" }}
              >
                Learn more
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission / Approach */}
      <section style={{ backgroundColor: "#F0EBE3" }} className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
                  <span className="text-xs tracking-widest uppercase" style={{ color: "#C08A3E" }}>Our approach</span>
                </div>
                <h2
                  className="text-4xl md:text-5xl font-normal mb-8"
                  style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                >
                  Strategy without execution is just a wish list.
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: "#4A4A4A" }}>
                  Most small businesses don't fail from a lack of ideas — they stall because execution is hard, lonely, and relentless. Ino Tankale exists to close that gap.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
                  We embed alongside you as a senior operational partner: part strategist, part accountability system, part steady hand when the week gets noisy. The goal is simple — make sure your business delivers on its commitments, every single week.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Strategic clarity", body: "We start with where you're going, then work backwards to what needs to happen this quarter, this month, this week." },
                  { title: "Relentless accountability", body: "Regular check-ins aren't just updates — they're structured conversations designed to surface blockers and protect momentum." },
                  { title: "Personal, not templated", body: "No off-the-shelf frameworks. Every engagement is shaped around your business, your constraints, and your pace." },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <div
                      className="p-6"
                      style={{ backgroundColor: "rgba(10,26,43,0.04)", borderLeft: "2px solid #C08A3E" }}
                    >
                      <h4
                        className="font-medium mb-2"
                        style={{ color: "#0A1A2B", fontFamily: "var(--font-serif)" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{item.body}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="py-24 text-center"
        style={{ backgroundColor: "#0A1A2B" }}
      >
        <FadeIn>
          <div className="max-w-2xl mx-auto px-6">
            <div
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: "#C08A3E" }}
            >
              Ready to move forward?
            </div>
            <h2
              className="text-4xl md:text-5xl font-normal text-white mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Let's talk about what your business needs next.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Whether you need an operational partner or a consistent social media presence — the first conversation is always about you.
            </p>
            <Link
              to="/contact"
              className="inline-block px-9 py-4 text-sm font-medium tracking-wide transition-all duration-300"
              style={{ backgroundColor: "#C08A3E", color: "#0A1A2B", borderRadius: "2px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#D4A05A" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#C08A3E" }}
            >
              Book a Consultation
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
