import { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import DashboardShell from './components/DashboardShell';

export type AuthView = 'login' | 'signup';
export type DashboardTab = 'consultation' | 'training' | 'settings';

export interface User {
  name: string;
  email: string;
  intent?: 'consultation' | 'training' | 'both' | 'exploring';
}

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [dashTab, setDashTab] = useState<DashboardTab>('consultation');
  const [user, setUser] = useState<User | null>(null);

  function handleAuth(u: User) {
    setUser(u);
    setDashTab(u.intent === 'training' ? 'training' : 'consultation');
  }

  function handleSignOut() {
    setUser(null);
    setAuthView('login');
  }

  if (user) {
    return (
      <DashboardShell
        user={user}
        activeTab={dashTab}
        onTabChange={setDashTab}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <AuthScreen
      view={authView}
      onSwitchView={setAuthView}
      onAuth={handleAuth}
    />
  );
}
