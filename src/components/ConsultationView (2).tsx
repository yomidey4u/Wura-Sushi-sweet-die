import { useState, type FormEvent } from 'react';
import type { User } from '../App';

interface Props {
  user: User;
  onBook: () => void;
}

export default function ConsultationView({ user, onBook }: Props) {
  const [business, setBusiness] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSend(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="space-y-10">
      {/* Current engagement */}
      <section>
        <h2 className="font-serif text-xl text-[#0A1A2B] mb-4">Current engagement</h2>
        <div className="border border-[rgba(10,26,43,0.1)] bg-white p-8">
          <div className="w-9 h-9 border border-[rgba(10,26,43,0.13)] flex items-center justify-center mb-5 text-[#9A9490]">
            <EnvelopeIcon />
          </div>
          <h3 className="font-serif text-[#0A1A2B] text-lg mb-2">
            No active engagement yet.
          </h3>
          <p className="text-[#6B6560] text-sm leading-relaxed max-w-sm mb-6">
            Ready to explore how Ino Tankale can support your operations or social presence?
            The first conversation is always free — no commitments.
          </p>
          <button
            onClick={onBook}
            className="bg-[#C08A3E] text-white text-sm font-semibold px-5 py-3 hover:bg-[#D4A55A] active:bg-[#B07A30] transition-colors"
          >
            Start the conversation
          </button>
        </div>
      </section>

      {/* Message form */}
      <section>
        <h2 className="font-serif text-xl text-[#0A1A2B] mb-1">Send a message</h2>
        <p className="text-[#9A9490] text-sm mb-5">
          Prefer to write it out? Reach the team directly here.
        </p>

        {sent ? (
          <div className="border border-[rgba(10,26,43,0.1)] bg-white px-8 py-10 text-center">
            <p className="font-serif text-[#0A1A2B] text-lg mb-2">Message sent.</p>
            <p className="text-[#6B6560] text-sm leading-relaxed">
              {"We'll respond within one working day. "}
              <button onClick={onBook} className="text-[#C08A3E] hover:underline">
                {"Book a call directly"}
              </button>
              {" if you'd prefer not to wait."}
            </p>
            <button
              onClick={() => { setSent(false); setBusiness(''); setService(''); setMessage(''); }}
              className="mt-6 text-[#9A9490] text-xs underline hover:text-[#6B6560] transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="border border-[rgba(10,26,43,0.1)] bg-white p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <ReadonlyField label="Your name" value={user.name} />
              <ReadonlyField label="Email" value={user.email} />
            </div>

            <div className="space-y-4">
              <FormField label="Business name" value={business} onChange={setBusiness} type="text" />

              <div>
                <label className="block text-[10px] font-mono text-[#9A9490] uppercase tracking-widest mb-1.5">
                  Service of interest
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-[rgba(10,26,43,0.15)] bg-[#FAFAF8] px-3 py-2.5 text-sm text-[#2C2C2C] outline-none focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] transition-all appearance-none"
                >
                  <option value="">Select one…</option>
                  <option>Fractional COO support</option>
                  <option>Social media management</option>
                  <option>Cybersecurity training</option>
                  <option>More than one</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[#9A9490] uppercase tracking-widest mb-1.5">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="What are you looking for, or what problem are you trying to solve?"
                  className="w-full border border-[rgba(10,26,43,0.15)] bg-[#FAFAF8] px-3 py-2.5 text-sm text-[#2C2C2C] placeholder:text-[#C0BAB3] outline-none focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="bg-[#0A1A2B] text-[#F7F3EE] text-sm font-semibold px-6 py-3 hover:bg-[#112236] transition-colors"
              >
                Send message
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Engagement history */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-xl text-[#0A1A2B]">History</h2>
          <span className="text-[#B0AAA3] text-[10px] font-mono tracking-wide">Past activity will appear here</span>
        </div>
        <div className="border border-dashed border-[rgba(10,26,43,0.12)] px-6 py-9 text-center">
          <p className="text-[#B0AAA3] text-sm">No previous engagements on record.</p>
        </div>
      </section>
    </div>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-mono text-[#9A9490] uppercase tracking-widest mb-1.5">{label}</p>
      <p className="text-sm text-[#2C2C2C] font-medium border border-[rgba(10,26,43,0.1)] bg-[#F7F3EE] px-3 py-2.5 truncate">
        {value}
      </p>
    </div>
  );
}

function FormField({
  label, value, onChange, type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-mono text-[#9A9490] uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[rgba(10,26,43,0.15)] bg-[#FAFAF8] px-3 py-2.5 text-sm text-[#2C2C2C] outline-none focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] transition-all"
      />
    </div>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <rect x="1" y="3" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 5l7.5 5.5L16 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
