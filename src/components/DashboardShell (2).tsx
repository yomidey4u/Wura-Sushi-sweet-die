import { useState, type ReactNode, type FormEvent } from 'react';
import type { User, DashboardTab } from '../App';
import ConsultationView from './ConsultationView';
import TrainingView from './TrainingView';
import SettingsView from './SettingsView';

interface Props {
  user: User;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onSignOut: () => void;
}

export default function DashboardShell({ user, activeTab, onTabChange, onSignOut }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const firstName = user.name.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const subGreetings: Record<DashboardTab, string> = {
    consultation: "Here's the status of your consultation work.",
    training: 'Your cybersecurity training is in progress.',
    settings: 'Manage your account details and preferences.',
  };

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="h-full flex overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#0A1A2B]/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-[#0A1A2B] flex flex-col flex-shrink-0
          transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <BrandMark />
            <span className="font-serif text-white text-sm tracking-wide">Ino Tankale</span>
          </div>
        </div>

        <div className="mx-5 h-px bg-white/[0.08]" />

        {/* Nav */}
        <nav className="flex-1 px-3 py-6">
          <p className="text-white/30 text-[9px] tracking-[0.14em] uppercase px-3 mb-3 font-mono">
            Your services
          </p>

          <NavItem
            label="Consultation"
            active={activeTab === 'consultation'}
            accentColor="#C08A3E"
            onClick={() => { onTabChange('consultation'); setSidebarOpen(false); }}
            icon={<BriefcaseIcon />}
          />
          <NavItem
            label="Training"
            active={activeTab === 'training'}
            accentColor="#2E7D8A"
            onClick={() => { onTabChange('training'); setSidebarOpen(false); }}
            icon={<ShieldIcon />}
          />

          <div className="mx-3 h-px bg-white/[0.08] my-4" />

          <NavItem
            label="Account settings"
            active={activeTab === 'settings'}
            accentColor="#C08A3E"
            onClick={() => { onTabChange('settings'); setSidebarOpen(false); }}
            icon={<GearIcon />}
          />
        </nav>

        {/* Always-visible CTA */}
        <div className="px-4 pb-4">
          <button
            onClick={() => { setBookModalOpen(true); setSidebarOpen(false); }}
            className="w-full bg-[#C08A3E] text-white text-xs font-semibold py-3 px-4 hover:bg-[#D4A55A] active:bg-[#B07A30] transition-colors flex items-center justify-center gap-2 tracking-wide"
          >
            <CalendarIcon />
            Book a consultation
          </button>
        </div>

        {/* User footer */}
        <div className="border-t border-white/[0.08] px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C08A3E]/20 border border-[#C08A3E]/40 flex items-center justify-center flex-shrink-0">
            <span className="text-[#C08A3E] text-xs font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user.name}</p>
            <p className="text-white/35 text-[10px] truncate font-mono">{user.email}</p>
          </div>
          <button
            onClick={onSignOut}
            title="Sign out"
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <SignOutIcon />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden bg-[#F7F3EE] border-b border-[rgba(10,26,43,0.1)] px-4 py-3 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#0A1A2B] p-1 -ml-1"
          >
            <MenuIcon />
          </button>
          <span className="font-serif text-[#0A1A2B] text-sm">Ino Tankale</span>
          <button
            onClick={() => setBookModalOpen(true)}
            className="text-[#C08A3E] text-xs font-semibold"
          >
            Book
          </button>
        </header>

        {/* Desktop page header */}
        <div className="hidden lg:block bg-[#F7F3EE] border-b border-[rgba(10,26,43,0.07)] px-10 py-7 flex-shrink-0">
          <p className="text-[#B0AAA3] text-[10px] font-mono tracking-widest mb-1.5 uppercase">
            {today}
          </p>
          <h1 className="font-serif text-[26px] text-[#0A1A2B] leading-tight">
            {greeting}, {firstName}.
          </h1>
          <p className="text-[#6B6560] text-sm mt-1">{subGreetings[activeTab]}</p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto bg-[#F7F3EE]">
          <div className="px-4 py-6 lg:px-10 lg:py-9 max-w-4xl">
            {activeTab === 'consultation' && (
              <ConsultationView user={user} onBook={() => setBookModalOpen(true)} />
            )}
            {activeTab === 'training' && <TrainingView />}
            {activeTab === 'settings' && (
              <SettingsView user={user} onSignOut={onSignOut} />
            )}
          </div>
        </div>
      </main>

      {/* Book a consultation modal */}
      {bookModalOpen && (
        <BookModal user={user} onClose={() => setBookModalOpen(false)} />
      )}
    </div>
  );
}

function NavItem({
  label, active, accentColor, onClick, icon,
}: {
  label: string;
  active: boolean;
  accentColor: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={
        active
          ? { borderLeftColor: accentColor, color: accentColor }
          : {}
      }
      className={`flex items-center gap-3 w-full px-3 py-2.5 text-left text-sm border-l-2 mb-0.5 transition-all rounded-r-sm ${
        active
          ? 'bg-white/[0.06]'
          : 'border-transparent text-white/50 hover:text-white/85 hover:bg-white/[0.05]'
      }`}
    >
      <span className="opacity-75 flex-shrink-0">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function BookModal({ user, onClose }: { user: User; onClose: () => void }) {
  const [business, setBusiness] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0A1A2B]/70" onClick={onClose} />
      <div className="relative bg-[#F7F3EE] w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-[rgba(10,26,43,0.1)]">
          <h2 className="font-serif text-lg text-[#0A1A2B]">Book a consultation</h2>
          <button onClick={onClose} className="text-[#9A9490] hover:text-[#2C2C2C] transition-colors p-0.5">
            <CloseIcon />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-12 text-center">
            <div className="w-10 h-10 border border-[#C08A3E] flex items-center justify-center mx-auto mb-5">
              <TickIcon />
            </div>
            <h3 className="font-serif text-[#0A1A2B] text-xl mb-2">Request received.</h3>
            <p className="text-[#6B6560] text-sm leading-relaxed">
              {"We'll be in touch within one working day to confirm a time."}
            </p>
            <button
              onClick={onClose}
              className="mt-7 text-[#C08A3E] text-sm font-medium hover:underline"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <div className="grid grid-cols-2 gap-4 pb-1">
              <div>
                <p className="text-[10px] text-[#9A9490] uppercase tracking-wide font-mono mb-1">Name</p>
                <p className="text-sm text-[#2C2C2C] font-medium truncate">{user.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#9A9490] uppercase tracking-wide font-mono mb-1">Email</p>
                <p className="text-sm text-[#2C2C2C] font-medium truncate">{user.email}</p>
              </div>
            </div>

            <ModalField label="Business name" value={business} onChange={setBusiness} type="text" />

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                What can we help with?
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full border border-[rgba(10,26,43,0.18)] bg-white px-4 py-3 text-sm text-[#2C2C2C] outline-none focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] transition-all appearance-none"
              >
                <option value="">Select a service…</option>
                <option>Fractional COO support</option>
                <option>Social media management</option>
                <option>Cybersecurity training</option>
                <option>More than one of the above</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Tell us a bit about what you're looking for…"
                className="w-full border border-[rgba(10,26,43,0.18)] bg-white px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#B0AAA3] outline-none focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C08A3E] text-white py-3.5 text-sm font-semibold hover:bg-[#D4A55A] active:bg-[#B07A30] transition-colors"
            >
              Send request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ModalField({
  label, value, onChange, type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[rgba(10,26,43,0.18)] bg-white px-4 py-3 text-sm text-[#2C2C2C] outline-none focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] transition-all"
      />
    </div>
  );
}

/* ── Icons ─────────────────────────────────────── */

function BrandMark() {
  return (
    <div className="w-6 h-6 border border-[#C08A3E] flex items-center justify-center flex-shrink-0">
      <div className="w-1.5 h-1.5 bg-[#C08A3E]" />
    </div>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M1 9h13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M7.5 1.5L13 4v3.5c0 3-2.3 5.2-5.5 6C2.3 12.7 0 10.5 0 7.5V4L7.5 1.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M4.5 7.5l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.9 2.9l1.1 1.1M11 11l1.1 1.1M2.9 12.1l1.1-1.1M11 4l1.1-1.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="0.5" y="2" width="12" height="10.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M0.5 5.5h12M4 0.5V3.5M9 0.5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 7h8M10 4l3 3-3 3M8.5 2.5H2v9h6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.5 9l4 4 7-7" stroke="#C08A3E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
