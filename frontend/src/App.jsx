import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navigation from './components/Navigation.jsx'
import LoginPage from './pages/LoginPage.jsx'
import FleetPage from './pages/FleetPage.jsx'
import MyBookingsPage from './pages/MyBookingsPage.jsx'

// ============================================================
// Task 2: React Router Configuration
//   /            → LoginPage (public)
//   /fleet       → FleetPage (protected)
//   /my-bookings → MyBookingsPage (protected)
//   /admin       → AdminPanel (lazy-loaded via React.lazy + Suspense)
// ============================================================

// Lazy-load AdminPanel (Task 2 requirement)
const AdminPanel = lazy(() => import('./pages/AdminPanel.jsx'))

// Suspense fallback shown while lazy component loads
const LoadingFallback = () => (
  <div style={{ textAlign: 'center', padding: 40 }}>
    <p style={{ fontSize: 16, color: '#1c3d5e' }}>Loading Admin Panel...</p>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', maxWidth: 960, margin: '0 auto', padding: 24 }}>
          <Navigation />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public route */}
              <Route path="/" element={<LoginPage />} />

              {/* Protected routes — wrapped by ProtectedRoute */}
              <Route
                path="/fleet"
                element={
                  <ProtectedRoute>
                    <FleetPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookingsPage />
                  </ProtectedRoute>
                }
              />

              {/* Lazy-loaded admin route */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
