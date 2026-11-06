import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

// ============================================================
// Task 2: ProtectedRoute wrapper
// Redirects unauthenticated users to "/" (LoginPage)
// Uses <Navigate to="/" /> for the redirect
// ============================================================

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext)

  // If no token → redirect to login page
  if (!token) {
    return <Navigate to="/" replace />
  }

  // Authenticated → render the protected component
  return children
}

export default ProtectedRoute
