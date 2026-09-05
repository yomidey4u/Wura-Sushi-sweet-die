import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await signIn(email, password)
    if (error) setError(error.message)
    else navigate('/dashboard')
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl mb-4">Log in</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="input" />
        </div>
        <div>
          <label className="block">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
        </div>
        <div>
          <button className="btn-primary" type="submit">Log in</button>
        </div>
      </form>
      <p className="mt-4">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}
