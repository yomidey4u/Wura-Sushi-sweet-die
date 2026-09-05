import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export type SignUpMetadata = {
  name?: string
  intent?: 'consultation' | 'training' | 'both' | 'exploring'
}

type AuthContextType = {
  user: User | null
  signUp: (email: string, password: string, metadata?: SignUpMetadata) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  updateProfile: (updates: { name?: string; intent?: SignUpMetadata['intent'] }) => Promise<any>
  updatePassword: (password: string) => Promise<any>
  updatePasswordWithCurrent: (currentPassword: string, newPassword: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let mounted = true

    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (mounted) setUser(data?.user ?? null)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  // metadata (name, intent) is stored on the Supabase user's user_metadata,
  // so the dashboard can personalise the greeting and default tab without a
  // separate profile table.
  const signUp = (email: string, password: string, metadata?: SignUpMetadata) =>
    supabase.auth.signUp({
      email,
      password,
      options: metadata ? { data: metadata } : undefined,
    })

  const signIn = (email: string, password: string) => supabase.auth.signInWithPassword({ email, password })
  const signOut = () => supabase.auth.signOut()

  const updateProfile = (updates: { name?: string; intent?: SignUpMetadata['intent'] }) =>
    supabase.auth.updateUser({ data: updates })

  const updatePassword = (password: string) => supabase.auth.updateUser({ password })

  // Attempt to re-authenticate with the user's current password, then update
  // to the new password. If re-authentication fails, return that error.
  const updatePasswordWithCurrent = async (currentPassword: string, newPassword: string) => {
    if (!user?.email) return { error: new Error('No user email available for re-authentication') }
    // Try signing in to verify current password. This will replace the session
    // on success; that's acceptable since we immediately update the password.
    const signInResult = await supabase.auth.signInWithPassword({ email: user.email, password: currentPassword })
    if (signInResult.error) return { error: signInResult.error }
    // Now update the password
    return supabase.auth.updateUser({ password: newPassword })
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, updateProfile, updatePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

