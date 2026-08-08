import { useState } from "react"

type FormState = {
  name: string
  email: string
  business: string
  interest: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    business: "",
    interest: "",
    message: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = "Please enter your name."
    if (!form.email.trim()) e.email = "Please enter your email."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address."
    if (!form.interest) e.interest = "Please select an option."
    if (!form.message.trim()) e.message = "Please include a message."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const field = (id: keyof FormState, label: string, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs tracking-wide uppercase"
        style={{ color: "#4A4A4A" }}
      >
        {label}
        {["name", "email", "interest", "message"].includes(id) && (
          <span style={{ color: "#C08A3E" }}> *</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={form[id]}
        placeholder={placeholder}
        onChange={(e) => {
          setForm((f) => ({ ...f, [id]: e.target.value }))
          if (errors[id]) setErrors((er) => ({ ...er, [id]: undefined }))
        }}
        className="px-4 py-3 text-sm outline-none transition-all"
        style={{
          backgroundColor: "#fff",
          border: errors[id] ? "1px solid #c0392b" : "1px solid rgba(10,26,43,0.15)",
          borderRadius: "2px",
          color: "#2C2C2C",
        }}
        onFocus={(e) => {
          if (!errors[id]) (e.currentTarget as HTMLElement).style.borderColor = "#C08A3E"
        }}
        onBlur={(e) => {
          if (!errors[id]) (e.currentTarget as HTMLElement).style.borderColor = "rgba(10,26,43,0.15)"
        }}
      />
      {errors[id] && (
        <span className="text-xs" style={{ color: "#c0392b" }}>{errors[id]}</span>
      )}
    </div>
  )

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Header */}
      <section style={{ backgroundColor: "#0A1A2B" }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="block w-8 h-px" style={{ backgroundColor: "#C08A3E" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#C08A3E" }}>Let's talk</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-normal text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Get in touch
          </h1>
          <p className="text-lg text-white/60 max-w-xl leading-relaxed">
            Tell us a little about what you're working on. The first conversation is free, informal, and focused on whether we're the right fit.
          </p>
        </div>
      </section>

      <section className="py-24 px-6" style={{ backgroundColor: "#F7F3EE" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="p-10"
                style={{ backgroundColor: "#0A1A2B", borderRadius: "2px" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#C08A3E", borderRadius: "2px" }}
                >
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path d="M1 8L7 14L19 2" stroke="#0A1A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-normal text-white mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Thank you, {form.name.split(" ")[0]}.
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We've received your message and will be in touch within 2 business days. We look forward to the conversation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {field("name", "Full name", "text", "Jane Smith")}
                  {field("email", "Email address", "email", "jane@yourbusiness.com")}
                </div>
                {field("business", "Business / organisation name", "text", "Optional")}

                {/* Interest select */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="interest"
                    className="text-xs tracking-wide uppercase"
                    style={{ color: "#4A4A4A" }}
                  >
                    I'm interested in <span style={{ color: "#C08A3E" }}>*</span>
                  </label>
                  <select
                    id="interest"
                    value={form.interest}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, interest: e.target.value }))
                      if (errors.interest) setErrors((er) => ({ ...er, interest: undefined }))
                    }}
                    className="px-4 py-3 text-sm outline-none transition-all appearance-none"
                    style={{
                      backgroundColor: "#fff",
                      border: errors.interest ? "1px solid #c0392b" : "1px solid rgba(10,26,43,0.15)",
                      borderRadius: "2px",
                      color: form.interest ? "#2C2C2C" : "rgba(44,44,44,0.4)",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%234A4A4A' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      paddingRight: "40px",
                    }}
                  >
                    <option value="" disabled>Select a service…</option>
                    <option value="coo">Fractional / Outsourced COO services</option>
                    <option value="social">Social media management</option>
                    <option value="both">Both services</option>
                    <option value="other">Something else / not sure yet</option>
                  </select>
                  {errors.interest && (
                    <span className="text-xs" style={{ color: "#c0392b" }}>{errors.interest}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs tracking-wide uppercase"
                    style={{ color: "#4A4A4A" }}
                  >
                    Tell us about your situation <span style={{ color: "#C08A3E" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    placeholder="What are you working on? What's getting in the way?"
                    onChange={(e) => {
                      setForm((f) => ({ ...f, message: e.target.value }))
                      if (errors.message) setErrors((er) => ({ ...er, message: undefined }))
                    }}
                    className="px-4 py-3 text-sm outline-none transition-all resize-none"
                    style={{
                      backgroundColor: "#fff",
                      border: errors.message ? "1px solid #c0392b" : "1px solid rgba(10,26,43,0.15)",
                      borderRadius: "2px",
                      color: "#2C2C2C",
                    }}
                    onFocus={(e) => {
                      if (!errors.message) (e.currentTarget as HTMLElement).style.borderColor = "#C08A3E"
                    }}
                    onBlur={(e) => {
                      if (!errors.message) (e.currentTarget as HTMLElement).style.borderColor = "rgba(10,26,43,0.15)"
                    }}
                  />
                  {errors.message && (
                    <span className="text-xs" style={{ color: "#c0392b" }}>{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="self-start px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300"
                  style={{ backgroundColor: "#C08A3E", color: "#0A1A2B", borderRadius: "2px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#D4A05A" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#C08A3E" }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div
              className="p-8"
              style={{ backgroundColor: "#0A1A2B", borderRadius: "2px" }}
            >
              <h4
                className="text-xs tracking-widest uppercase mb-6"
                style={{ color: "#C08A3E" }}
              >
                Direct contact
              </h4>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40 mb-1">Email</p>
                  <a href="mailto:hello@inotankale.co.uk" className="text-sm text-white/80 hover:text-white transition-colors">
                    hello@inotankale.co.uk
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40 mb-1">Location</p>
                  <p className="text-sm text-white/80">Newmarket, Suffolk, UK</p>
                </div>
              </div>
            </div>

            <div
              className="p-8"
              style={{ border: "1px solid rgba(10,26,43,0.12)", borderRadius: "2px" }}
            >
              <h4
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: "#C08A3E" }}
              >
                Book a call
              </h4>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#4A4A4A" }}>
                Prefer to schedule time directly? Use the booking link below to find a slot that works for you.
              </p>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-all duration-200"
                style={{ color: "#C08A3E" }}
              >
                Open booking calendar
                <span>→</span>
              </a>
              <p className="text-xs mt-2" style={{ color: "rgba(74,74,74,0.5)" }}>
                (Calendly link — add your URL here)
              </p>
            </div>

            <div
              className="p-8"
              style={{ backgroundColor: "#EDE8E0", borderRadius: "2px" }}
            >
              <p
                className="text-lg font-normal mb-2"
                style={{ fontFamily: "var(--font-serif)", color: "#0A1A2B" }}
              >
                "The first conversation is always about you."
              </p>
              <p className="text-sm" style={{ color: "#4A4A4A" }}>
                No pitch, no pressure — we want to understand what you're trying to build before we say anything else.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
