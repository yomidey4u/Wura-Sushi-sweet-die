import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import ConsultationView from './ConsultationView'
import TrainingView from './TrainingView'
import SettingsView from './SettingsView'
import { useForm } from '@formspree/react'

const FORMSPREE_ID = 'xqpzprrz'

type Tab = 'consultation' | 'training' | 'settings'

const DashboardShell: React.FC = () => {
  const { user, signOut } = useAuth()
  const [tab, setTab] = useState<Tab>('consultation')
  const [modalOpen, setModalOpen] = useState(false)

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
          <button onClick={() => setModalOpen(true)} className="text-sm text-gray-700 mb-3">Book a call</button>
          <button onClick={() => signOut()} className="text-sm text-red-600">Sign out</button>
        </div>
      </aside>
      {modalOpen && <BookModal onClose={() => setModalOpen(false)} user={user} />}
      <section className="flex-1 p-6 overflow-auto">
        {tab === 'consultation' && <ConsultationView />}
        {tab === 'training' && <TrainingView />}
        {tab === 'settings' && <SettingsView />}
      </section>
    </div>
  )
}

function BookModal({ onClose, user }: { onClose: () => void; user: any }) {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)
  const [notes, setNotes] = useState('')

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    handleSubmit(ev)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-4">Request a booking</h3>
        {state.succeeded ? (
          <div>
            <p className="mb-4">Thanks — your booking request has been sent.</p>
            <button onClick={onClose} className="px-4 py-2 bg-cream rounded">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <input type="hidden" name="source" value="dashboard-booking" />
            <input type="hidden" name="name" value={user?.user_metadata?.name ?? ''} />
            <input type="hidden" name="email" value={user?.email ?? ''} />

            <div>
              <label className="block text-sm mb-1">Notes</label>
              <textarea name="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={state.submitting} className="px-4 py-2 bg-cream rounded">{state.submitting ? 'Sending...' : 'Send request'}</button>
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default DashboardShell
