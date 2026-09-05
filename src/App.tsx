import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Services from "./pages/Services"
import About from "./pages/About"
import Work from "./pages/Work"
import Contact from "./pages/Contact"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

// Shared types used by AuthScreen / DashboardShell / ConsultationView /
// TrainingView / SettingsView. Kept here so those components' existing
// `import type { User } from '../App'` imports keep working unchanged.
export type AuthView = 'login' | 'signup'
export type DashboardTab = 'consultation' | 'training' | 'settings'
export interface User {
  name: string
  email: string
  intent?: 'consultation' | 'training' | 'both' | 'exploring'
}

const FULL_SCREEN_ROUTES = ["/login", "/signup", "/dashboard"]

function AppRoutes() {
  const location = useLocation()
  const isFullScreen = FULL_SCREEN_ROUTES.some((p) => location.pathname.startsWith(p))

  if (isFullScreen) {
    // Auth screens and the dashboard render as their own full-height
    // layouts (sidebar / split panel) — no marketing Nav or Footer here.
    return (
      <div className="h-screen w-full overflow-hidden">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
        </Routes>
      </div>
    )
  }

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
