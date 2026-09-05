import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'

type Props = { view: 'login' | 'signup' }

const AuthScreen: React.FC<Props> = ({ view }) => {
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [intent, setIntent] = useState<'consultation' | 'training' | 'both' | 'exploring'>('exploring')
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if (view === 'signup') {
      const { error } = await signUp(email, password, { name, intent })
      if (error) setMessage(error.message)
      else setMessage('Check your inbox for a confirmation link (if required).')
    } else {
      const { error } = await signIn(email, password)
      if (error) setMessage(error.message)
    }
  }

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-b from-white to-cream">
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-4">{view === 'signup' ? 'Create account' : 'Sign in'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'signup' && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full p-2 border rounded" />
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" />
          {view === 'signup' && (
            <select value={intent} onChange={(e) => setIntent(e.target.value as any)} className="w-full p-2 border rounded">
              <option value="exploring">Just exploring</option>
              <option value="consultation">Consultation</option>
              <option value="training">Training</option>
              <option value="both">Both</option>
            </select>
          )}
          <button className="w-full bg-navy text-white p-2 rounded">{view === 'signup' ? 'Sign up' : 'Sign in'}</button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  )
}

export default AuthScreen
