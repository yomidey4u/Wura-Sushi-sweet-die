import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import ConsultationView from './ConsultationView'
import TrainingView from './TrainingView'
import SettingsView from './SettingsView'

type Tab = 'consultation' | 'training' | 'settings'

const DashboardShell: React.FC = () => {
  const { user, signOut } = useAuth()
  const [tab, setTab] = useState<Tab>('consultation')

  return (
    <div className="h-full flex">
      <aside className="w-64 bg-white p-6 border-r">
        <div className="mb-6">
          <div className="text-sm text-gray-500">Signed in as</div>
          <div className="font-semibold">{user?.email ?? '—'}</div>
        </div>
        <nav className="space-y-2">
          <button onClick={() => setTab('consultation')} className={`w-full text-left p-2 rounded ${tab==='consultation'?'bg-cream':''}`}>Consultation</button>
          <button onClick={() => setTab('training')} className={`w-full text-left p-2 rounded ${tab==='training'?'bg-cream':''}`}>Training</button>
          <button onClick={() => setTab('settings')} className={`w-full text-left p-2 rounded ${tab==='settings'?'bg-cream':''}`}>Settings</button>
        </nav>
        <div className="mt-6">
          <button onClick={() => signOut()} className="text-sm text-red-600">Sign out</button>
        </div>
      </aside>
      <section className="flex-1 p-6 overflow-auto">
        {tab === 'consultation' && <ConsultationView />}
        {tab === 'training' && <TrainingView />}
        {tab === 'settings' && <SettingsView />}
      </section>
    </div>
  )
}

export default DashboardShell
