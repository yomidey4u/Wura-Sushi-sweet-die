import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

export default function About() {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Header */}
      <section style={{ backgroundColor: "#0A1A2B" }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#C08A3E" }}>Our story</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-normal text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            About Ino Tankale
          </h1>
          <p className="text-lg text-white/60 max-w-xl leading-relaxed">
            A consultancy built on the belief that most businesses already have what they need to succeed — they just need the discipline and partnership to actually execute.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F7F3EE" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          <FadeIn className="lg:col-span-3">
            <div>
              <h2
                className="text-3xl font-normal mb-8"
                style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
              >
                Why Ino Tankale exists
              </h2>

              <div className="flex flex-col gap-6 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
                <p>
                  There is a gap that most business support doesn't fill: the space between having a good plan and actually executing it. Founders go to workshops, hire coaches, read the books — and then return to their business and face the same reality: it's hard to stay accountable to yourself, especially when you're running everything.
                </p>
                <p>
                  Ino Tankale was founded to close that gap — not with more strategy, but with embedded operational support that keeps businesses moving. The kind of senior thinking partner that large companies take for granted, made accessible to small and growing businesses.
                </p>
                <p>
                  The same principle applies to social media. For churches, ministries, and entrepreneurs, presence online isn't optional anymore — but managing it consistently is genuinely difficult when your attention is already stretched. We take that weight off, so you can focus on what only you can do.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="lg:col-span-2">
            <div
              className="p-8 h-fit"
              style={{ backgroundColor: "#0A1A2B", borderRadius: "2px" }}
            >
              <h4
                className="text-xs tracking-widest uppercase mb-6"
                style={{ color: "#C08A3E" }}
              >
                The gap we fill
              </h4>
              <div className="flex flex-col gap-6">
                {[
                  {
                    problem: "Businesses with plans but no execution discipline",
                    solution: "Fractional COO — embedded accountability and strategic partnership",
                  },
                  {
                    problem: "Public figures with presence but no time to manage it",
                    solution: "Social media management — consistent posting and content planning",
                  },
                ].map((item, i) => (
                  <div key={i} style={{ borderTop: "1px solid rgba(192,138,62,0.15)", paddingTop: "20px" }}>
                    <p className="text-sm text-white/50 mb-2">{item.problem}</p>
                    <p className="text-sm font-medium text-white/85">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6" style={{ backgroundColor: "#EDE8E0" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "#C08A3E" }}>How we work</span>
            </div>
            <h2
              className="text-4xl font-normal mb-16"
              style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
            >
              The principles behind the work
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Directness over polish",
                body: "We tell you what we actually think — what's working, what isn't, and what needs to change. That's more valuable than smooth reassurance.",
              },
              {
                title: "Personal, not process-heavy",
                body: "We don't parachute in a framework and leave. We get to know your business, your constraints, and how you work before we start advising.",
              },
              {
                title: "Long-term thinking",
                body: "Every recommendation is made with your trajectory in mind — not just what solves this month's problem, but what builds the foundation for the next three years.",
              },
            ].map((v, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="p-8 h-full" style={{ backgroundColor: "#F7F3EE", borderRadius: "2px" }}>
                  <div
                    className="w-1 h-8 mb-6"
                    style={{ backgroundColor: "#C08A3E" }}
                  />
                  <h3
                    className="text-lg font-normal mb-4"
                    style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Background credibility */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F7F3EE" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "#C08A3E" }}>Background</span>
            </div>
            <h2
              className="text-3xl font-normal mb-8"
              style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
            >
              Built from real experience
            </h2>
            <div className="flex flex-col gap-6 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
              <p>
                Ino Tankale draws on a background in management consultancy and structured learning environments — contexts where accountability, systems, and consistent delivery are non-negotiable. That experience informs every engagement.
              </p>
              <p>
                We're based in Newmarket, Suffolk, and work with clients across the UK — founders, operators, church leaders, and entrepreneurs who are serious about where their business is going and willing to do the work to get there.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#0A1A2B" }}>
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Work with us
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            If the above resonates, we'd like to hear about what you're building.
          </p>
          <Link
            to="/contact"
            className="inline-block px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300"
            style={{ backgroundColor: "#C08A3E", color: "#0A1A2B", borderRadius: "2px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#D4A05A" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#C08A3E" }}
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
