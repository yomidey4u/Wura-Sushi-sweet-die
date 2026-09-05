import { useState, type FormEvent } from 'react';
import type { User } from '../App';

interface Props {
  user: User;
  onSignOut: () => void;
}

export default function SettingsView({ user, onSignOut }: Props) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profileSaved, setProfileSaved] = useState(false);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSaved, setPwSaved] = useState(false);

  function handleProfileSave(e: FormEvent) {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  function handlePasswordChange(e: FormEvent) {
    e.preventDefault();
    if (newPw.length < 8) {
      setPwError('New password must be at least 8 characters.');
      return;
    }
    if (newPw !== confirmPw) {
      setPwError("The passwords you entered don't match.");
      return;
    }
    setPwError('');
    setPwSaved(true);
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setTimeout(() => setPwSaved(false), 3000);
  }

  return (
    <div className="max-w-lg space-y-8">
      {/* Profile */}
      <section>
        <h2 className="font-serif text-xl text-[#0A1A2B] mb-1">Profile</h2>
        <p className="text-[#9A9490] text-sm mb-5">Update your name and email address.</p>

        <form onSubmit={handleProfileSave} className="border border-[rgba(10,26,43,0.1)] bg-white p-6 space-y-4">
          <SettingsInput label="Full name" type="text" value={name} onChange={setName} autoComplete="name" />
          <SettingsInput label="Email address" type="email" value={email} onChange={setEmail} autoComplete="email" />
          <div className="flex items-center justify-between pt-1">
            {profileSaved ? (
              <span className="text-[#2E7D8A] text-xs font-medium">Changes saved.</span>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="bg-[#0A1A2B] text-[#F7F3EE] text-sm font-semibold px-5 py-2.5 hover:bg-[#112236] transition-colors"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>

      {/* Password */}
      <section>
        <h2 className="font-serif text-xl text-[#0A1A2B] mb-1">Password</h2>
        <p className="text-[#9A9490] text-sm mb-5">Choose something you haven't used before. At least 8 characters.</p>

        <form onSubmit={handlePasswordChange} className="border border-[rgba(10,26,43,0.1)] bg-white p-6 space-y-4">
          <SettingsInput
            label="Current password"
            type="password"
            value={currentPw}
            onChange={setCurrentPw}
            autoComplete="current-password"
          />
          <SettingsInput
            label="New password"
            type="password"
            value={newPw}
            onChange={setNewPw}
            autoComplete="new-password"
          />
          <SettingsInput
            label="Confirm new password"
            type="password"
            value={confirmPw}
            onChange={setConfirmPw}
            autoComplete="new-password"
          />

          {pwError && <p className="text-red-600 text-xs">{pwError}</p>}

          <div className="flex items-center justify-between pt-1">
            {pwSaved ? (
              <span className="text-[#2E7D8A] text-xs font-medium">Password updated.</span>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="bg-[#0A1A2B] text-[#F7F3EE] text-sm font-semibold px-5 py-2.5 hover:bg-[#112236] transition-colors"
            >
              Update password
            </button>
          </div>
        </form>
      </section>

      {/* Sign out */}
      <section>
        <div className="border border-[rgba(10,26,43,0.1)] bg-white p-6">
          <h3 className="font-serif text-[#0A1A2B] text-base mb-1">Sign out</h3>
          <p className="text-[#9A9490] text-sm mb-5">
            {"You'll need to sign back in to access your account."}
          </p>
          <button
            onClick={onSignOut}
            className="border border-[rgba(180,40,40,0.25)] text-red-700 text-sm font-medium px-5 py-2.5 hover:bg-red-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </section>
    </div>
  );
}

function SettingsInput({
  label, type, value, onChange, autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
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
        autoComplete={autoComplete}
        className="w-full border border-[rgba(10,26,43,0.15)] bg-[#FAFAF8] px-3 py-2.5 text-sm text-[#2C2C2C] outline-none focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] transition-all"
      />
    </div>
  );
}
