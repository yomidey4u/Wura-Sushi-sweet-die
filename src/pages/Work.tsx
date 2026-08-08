import { Link } from "react-router-dom"

export default function Work() {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Header */}
      <section style={{ backgroundColor: "#0A1A2B" }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#C08A3E" }}>Case studies</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-normal text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Our work
          </h1>
          <p className="text-lg text-white/60 max-w-xl leading-relaxed">
            Client examples, outcomes, and case studies — coming soon as engagements progress.
          </p>
        </div>
      </section>

      {/* Placeholder content */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F7F3EE" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                type: "Fractional COO",
                title: "Client case study",
                description: "Details to follow — this space will showcase how we've helped a founder move from reactive firefighting to consistent, disciplined execution.",
                status: "Coming soon",
              },
              {
                type: "Social Media Management",
                title: "Client case study",
                description: "Details to follow — this space will document how we built and maintained a consistent social media presence for a public-facing organisation.",
                status: "Coming soon",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-10"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(10,26,43,0.08)",
                  borderRadius: "2px",
                  opacity: 0.7,
                }}
              >
                <div
                  className="inline-block text-xs tracking-widest uppercase px-3 py-1 mb-6"
                  style={{ backgroundColor: "rgba(192,138,62,0.1)", color: "#C08A3E" }}
                >
                  {item.type}
                </div>
                <h3
                  className="text-xl font-normal mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#4A4A4A" }}>{item.description}</p>
                <span
                  className="text-xs tracking-wide uppercase"
                  style={{ color: "rgba(10,26,43,0.35)" }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div
            className="p-10 text-center max-w-xl mx-auto"
            style={{ border: "1px dashed rgba(192,138,62,0.3)", borderRadius: "2px" }}
          >
            <div
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "#C08A3E" }}
            >
              Be among the first
            </div>
            <p
              className="text-2xl font-normal mb-4"
              style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
            >
              We're taking on new clients now.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#4A4A4A" }}>
              If you're interested in working with Ino Tankale, we'd love to hear what you're building and where you're stuck.
            </p>
            <Link
              to="/contact"
              className="inline-block px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300"
              style={{ backgroundColor: "#0A1A2B", color: "#fff", borderRadius: "2px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#112338" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0A1A2B" }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
