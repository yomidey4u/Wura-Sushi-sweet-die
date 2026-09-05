import { useState, type FormEvent } from 'react';
import type { AuthView, User } from '../App';

interface Props {
  view: AuthView;
  onSwitchView: (v: AuthView) => void;
  onAuth: (u: User) => void;
}

export default function AuthScreen({ view, onSwitchView, onAuth }: Props) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [intent, setIntent] = useState<User['intent'] | ''>('');
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    const errs: typeof loginErrors = {};
    if (!loginEmail) errs.email = 'Please enter your email address.';
    else if (!/\S+@\S+\.\S+/.test(loginEmail)) errs.email = "That doesn't look like a valid email address.";
    if (!loginPassword) errs.password = 'Please enter your password.';
    if (Object.keys(errs).length) { setLoginErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({ name: loginEmail.split('@')[0], email: loginEmail });
    }, 700);
  }

  function handleSignup(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Your name helps us personalise your experience.';
    if (!signupEmail) errs.email = 'Please enter your email address.';
    else if (!/\S+@\S+\.\S+/.test(signupEmail)) errs.email = "That doesn't look like a valid email address.";
    if (!signupPassword) errs.password = 'Please choose a password.';
    else if (signupPassword.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (signupPassword !== confirmPassword) errs.confirmPassword = "The passwords you entered don't match.";
    if (Object.keys(errs).length) { setSignupErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({ name: name.trim(), email: signupEmail, intent: intent || 'exploring' });
    }, 700);
  }

  const intentOptions: Array<{ value: NonNullable<User['intent']>; label: string; sub: string }> = [
    { value: 'consultation', label: 'Consultation', sub: 'COO support or social media' },
    { value: 'training', label: 'Training', sub: 'Cybersecurity courses' },
    { value: 'both', label: 'Both', sub: "I'm interested in both" },
    { value: 'exploring', label: 'Just exploring', sub: "I'll decide as I go" },
  ];

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Brand panel */}
      <div className="bg-[#0A1A2B] text-white lg:w-[42%] flex flex-col flex-shrink-0">
        {/* Mobile compact header */}
        <div className="lg:hidden px-6 py-5 flex items-center gap-3 border-b border-white/10">
          <BrandMark />
          <span className="font-serif text-base tracking-wide">Ino Tankale</span>
        </div>

        {/* Desktop full panel */}
        <div className="hidden lg:flex flex-col flex-1 px-12 pt-14 pb-10">
          <div className="flex items-center gap-3 mb-16">
            <BrandMark />
            <span className="font-serif text-lg tracking-wide">Ino Tankale</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="w-8 h-px bg-[#C08A3E] mb-8" />
            <h1 className="font-serif text-3xl leading-tight mb-6">
              Fractional COO.<br />
              Social media.<br />
              <span className="text-[#C08A3E]">Cybersecurity.</span>
            </h1>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              One account. Every service. Built around the way you actually work.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <a
              href="#"
              className="text-white/35 text-xs hover:text-white/65 transition-colors inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>Back to ino-tankale.co.uk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 bg-[#F7F3EE] flex items-start lg:items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[420px] py-4 lg:py-0">
          {view === 'login' ? (
            <form onSubmit={handleLogin} noValidate>
              <h2 className="font-serif text-2xl lg:text-[28px] text-[#0A1A2B] mb-2">
                Welcome back.
              </h2>
              <p className="text-[#6B6560] text-sm mb-8">
                Sign in to your Ino Tankale account.
              </p>

              <div className="space-y-4">
                <InputField
                  label="Email address"
                  type="email"
                  value={loginEmail}
                  onChange={setLoginEmail}
                  error={loginErrors.email}
                  autoComplete="email"
                />
                <InputField
                  label="Password"
                  type="password"
                  value={loginPassword}
                  onChange={setLoginPassword}
                  error={loginErrors.password}
                  autoComplete="current-password"
                />
              </div>

              <div className="flex justify-end mt-3 mb-6">
                <button type="button" className="text-[#C08A3E] text-xs hover:underline">
                  Forgot your password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A1A2B] text-[#F7F3EE] py-3.5 font-medium text-sm hover:bg-[#112236] transition-colors disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>

              <p className="text-center mt-6 text-sm text-[#6B6560]">
                New to Ino Tankale?{' '}
                <button
                  type="button"
                  onClick={() => onSwitchView('signup')}
                  className="text-[#C08A3E] hover:underline font-medium"
                >
                  Create an account
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} noValidate>
              <h2 className="font-serif text-2xl lg:text-[28px] text-[#0A1A2B] mb-2">
                Create your account.
              </h2>
              <p className="text-[#6B6560] text-sm mb-8">
                One account for all Ino Tankale services.
              </p>

              <div className="space-y-4">
                <InputField
                  label="Full name"
                  type="text"
                  value={name}
                  onChange={setName}
                  error={signupErrors.name}
                  autoComplete="name"
                />
                <InputField
                  label="Email address"
                  type="email"
                  value={signupEmail}
                  onChange={setSignupEmail}
                  error={signupErrors.email}
                  autoComplete="email"
                />
                <InputField
                  label="Password"
                  type="password"
                  value={signupPassword}
                  onChange={setSignupPassword}
                  error={signupErrors.password}
                  autoComplete="new-password"
                />
                <InputField
                  label="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  error={signupErrors.confirmPassword}
                  autoComplete="new-password"
                />

                {/* Intent selector */}
                <div>
                  <p className="text-sm font-medium text-[#2C2C2C] mb-1">
                    What brings you here?{' '}
                    <span className="text-[#9A9490] font-normal text-xs">— optional</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2.5">
                    {intentOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setIntent(intent === opt.value ? '' : opt.value)}
                        className={`p-3 text-left border transition-all ${
                          intent === opt.value
                            ? 'border-[#C08A3E] bg-[#C08A3E]/[0.07]'
                            : 'border-[rgba(10,26,43,0.15)] bg-white hover:border-[rgba(10,26,43,0.3)]'
                        }`}
                      >
                        <div
                          className={`text-xs font-semibold ${
                            intent === opt.value ? 'text-[#0A1A2B]' : 'text-[#2C2C2C]'
                          }`}
                        >
                          {opt.label}
                        </div>
                        <div className="text-[10px] text-[#9A9490] mt-0.5 leading-tight">
                          {opt.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#9A9490] mt-2 leading-relaxed">
                    This only personalises your first view — you can access everything regardless.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A1A2B] text-[#F7F3EE] py-3.5 font-medium text-sm mt-6 hover:bg-[#112236] transition-colors disabled:opacity-60"
              >
                {loading ? 'Creating account…' : 'Create account'}
              </button>

              <p className="text-center mt-6 text-sm text-[#6B6560]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onSwitchView('login')}
                  className="text-[#C08A3E] hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function InputField({
  label, type, value, onChange, error, autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={`w-full border px-4 py-3 text-[#2C2C2C] bg-white text-sm outline-none transition-all ${
          error
            ? 'border-red-400 ring-1 ring-red-300'
            : 'border-[rgba(10,26,43,0.18)] focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E]'
        }`}
      />
      {error && <p className="text-red-600 text-xs mt-1.5 leading-snug">{error}</p>}
    </div>
  );
}

function BrandMark() {
  return (
    <div className="w-6 h-6 border border-[#C08A3E] flex items-center justify-center flex-shrink-0">
      <div className="w-1.5 h-1.5 bg-[#C08A3E]" />
    </div>
  );
}
