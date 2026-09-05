import React from 'react'
import { useAuth } from '../context/AuthProvider'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="mb-4">Welcome, {user?.email}</div>
      <button className="btn-secondary" onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
