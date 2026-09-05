import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth()

  // During local development allow bypassing auth so we can test dashboard
  // flows without a real Supabase session. This is gated behind Vite's
  // `import.meta.env.DEV` flag so it won't run in production.
  if (import.meta.env.DEV && !user) {
    return children
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
