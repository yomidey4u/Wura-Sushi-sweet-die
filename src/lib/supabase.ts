import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

let supabase: any

if (supabaseUrl && supabaseAnonKey) {
	supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
	// Provide a safe shim so the app does not throw at runtime when env vars
	// are not set (e.g., in environments where Supabase isn't configured).
	// The shim implements the minimal `auth` surface used in the app.
	console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set — supabase client disabled')

	supabase = {
		auth: {
			getUser: async () => ({ data: { user: null } }),
			onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
			signUp: async () => ({ data: null, error: null }),
			signInWithPassword: async () => ({ data: null, error: null }),
			signOut: async () => ({ error: null }),
		},
	}
}

export { supabase }
export default supabase
