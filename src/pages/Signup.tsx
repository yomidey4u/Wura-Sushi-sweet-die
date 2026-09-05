import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await signUp(email, password)
    if (error) setError(error.message)
    else navigate('/dashboard')
  }

    return <AuthScreen view="signup" />
}
