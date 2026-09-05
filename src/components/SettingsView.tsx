import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthProvider'

const SettingsView: React.FC = () => {
  const { user, updateProfile, updatePassword } = useAuth()
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<string | null>(null)
  const [pw, setPw] = useState('')
  const [pwMsg, setPwMsg] = useState<string | null>(null)

  useEffect(() => {
    setName(user?.user_metadata?.name ?? '')
  }, [user])

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveMsg(null)
    const { data, error } = await updateProfile({ name })
    setSaving(false)
    if (error) setSaveMsg(error.message)
    else setSaveMsg('Saved')
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwMsg(null)
    const { data, error } = await updatePassword(pw)
    if (error) setPwMsg(error.message)
    else setPwMsg('Password updated')
    setPw('')
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
      <p className="text-sm text-gray-600">Personalise your account and notification preferences.</p>

      <div className="mt-6 border rounded p-4 bg-white">
        <form onSubmit={handleProfileSave} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <button className="px-4 py-2 bg-cream rounded" disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</button>
            {saveMsg && <span className="ml-3 text-sm">{saveMsg}</span>}
          </div>
        </form>

        <form onSubmit={handlePasswordChange} className="mt-6 space-y-3">
          <div>
            <label className="block text-sm mb-1">New password</label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <button className="px-4 py-2 border rounded">Change password</button>
            {pwMsg && <span className="ml-3 text-sm">{pwMsg}</span>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingsView
