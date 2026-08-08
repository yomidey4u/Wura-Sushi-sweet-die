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

const cooSteps = [
  { step: "01", title: "Discovery call", body: "We map your current plan, priorities, and the gaps between where you are and where you want to be." },
  { step: "02", title: "Engagement design", body: "We agree on a rhythm — weekly check-ins, accountability metrics, and the specific commitments we'll track together." },
  { step: "03", title: "Embedded partnership", body: "I work alongside you as an operational partner, helping you prioritize, unblock, and execute week by week." },
]

const socialSteps = [
  { step: "01", title: "Audit & strategy", body: "We assess your current presence, define your audience, and agree on the tone and content pillars that will serve your goals." },
  { step: "02", title: "Content planning", body: "A structured content calendar — planned in advance, aligned to your brand, and ready to go before the week starts." },
  { step: "03", title: "Consistent delivery", body: "Posts go out on time, every time. You show up for the high-value moments; we handle everything in between." },
]

export default function Services() {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Page header */}
      <section style={{ backgroundColor: "#0A1A2B" }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#C08A3E" }}>What we offer</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-normal text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Our services
          </h1>
          <p className="text-lg text-white/60 max-w-xl leading-relaxed">
            Two focused service lines, each designed to remove a specific bottleneck that stops good businesses from growing.
          </p>
        </div>
      </section>

      {/* COO Service */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F7F3EE" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <div>
                <span className="text-xs tracking-widest uppercase block mb-3" style={{ color: "#C08A3E" }}>Service 01</span>
                <h2
                  className="text-4xl font-normal mb-6"
                  style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                >
                  Fractional / Outsourced COO
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: "#4A4A4A" }}>
                  You don't need a full-time operations director — you need the discipline, accountability, and strategic support of one, without the overhead of a senior hire.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#4A4A4A" }}>
                  As your fractional COO, I embed directly into your business to help you make decisions confidently, execute consistently, and hold your leadership team accountable to the plan.
                </p>

                <h4
                  className="font-medium mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                >
                  This is for you if:
                </h4>
                <ul className="flex flex-col gap-2 mb-8">
                  {[
                    "You have a strategy but struggle to execute it consistently",
                    "Your team lacks operational discipline or clear ownership",
                    "You want a senior thinking partner, not just a task manager",
                    "You're scaling and need processes before they break",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#4A4A4A" }}>
                      <span className="mt-1 w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-sm" style={{ backgroundColor: "#C08A3E" }}>
                        <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                          <path d="M1 3.5L3 5.5L7 1.5" stroke="#0A1A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-block px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300"
                  style={{ backgroundColor: "#0A1A2B", color: "#fff", borderRadius: "2px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#112338" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0A1A2B" }}
                >
                  Enquire about COO services
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div>
                <h4
                  className="text-xs tracking-widest uppercase mb-8"
                  style={{ color: "#C08A3E" }}
                >
                  How an engagement works
                </h4>
                <div className="flex flex-col gap-6">
                  {cooSteps.map((s) => (
                    <div
                      key={s.step}
                      className="flex gap-6"
                    >
                      <div
                        className="text-3xl font-normal flex-shrink-0"
                        style={{ fontFamily: "var(--font-serif)", color: "rgba(192,138,62,0.35)", minWidth: "3rem" }}
                      >
                        {s.step}
                      </div>
                      <div style={{ borderTop: "1px solid rgba(10,26,43,0.1)", paddingTop: "4px" }}>
                        <h5
                          className="font-medium mb-2"
                          style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                        >
                          {s.title}
                        </h5>
                        <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social Media Service */}
      <section className="py-24 px-6" style={{ backgroundColor: "#EDE8E0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn delay={150} className="order-2 lg:order-1">
              <div>
                <h4
                  className="text-xs tracking-widest uppercase mb-8"
                  style={{ color: "#C08A3E" }}
                >
                  How it works
                </h4>
                <div className="flex flex-col gap-6">
                  {socialSteps.map((s) => (
                    <div key={s.step} className="flex gap-6">
                      <div
                        className="text-3xl font-normal flex-shrink-0"
                        style={{ fontFamily: "var(--font-serif)", color: "rgba(192,138,62,0.35)", minWidth: "3rem" }}
                      >
                        {s.step}
                      </div>
                      <div style={{ borderTop: "1px solid rgba(10,26,43,0.1)", paddingTop: "4px" }}>
                        <h5
                          className="font-medium mb-2"
                          style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                        >
                          {s.title}
                        </h5>
                        <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn className="order-1 lg:order-2">
              <div>
                <span className="text-xs tracking-widest uppercase block mb-3" style={{ color: "#C08A3E" }}>Service 02</span>
                <h2
                  className="text-4xl font-normal mb-6"
                  style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                >
                  Social Media Management
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: "#4A4A4A" }}>
                  Consistency is the hardest thing about social media. Not creativity — consistency. Showing up on time, every time, with content that sounds like you and moves your audience closer to you.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#4A4A4A" }}>
                  We manage the day-to-day of your social presence so you can focus on your business, ministry, or mission — and only step in front of the camera when it genuinely matters.
                </p>

                <h4
                  className="font-medium mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                >
                  Ideal for:
                </h4>
                <ul className="flex flex-col gap-2 mb-8">
                  {[
                    "Business owners who know they should post but never do",
                    "Churches and ministries building an online community",
                    "Entrepreneurs who want to grow their personal brand",
                    "Anyone who's posted inconsistently and wants that to change",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#4A4A4A" }}>
                      <span className="mt-1 w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-sm" style={{ backgroundColor: "#C08A3E" }}>
                        <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                          <path d="M1 3.5L3 5.5L7 1.5" stroke="#0A1A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-block px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300"
                  style={{ backgroundColor: "#0A1A2B", color: "#fff", borderRadius: "2px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#112338" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0A1A2B" }}
                >
                  Enquire about social media management
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#0A1A2B" }}>
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Not sure which service fits?
          </h2>
          <p className="text-white/60 mb-8">Let's have a conversation. The right fit will become clear quickly.</p>
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
