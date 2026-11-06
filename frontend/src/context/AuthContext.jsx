import React, { createContext, useState } from 'react'

// ============================================================
// Task 2: Global Auth Context
// Holds { customer, token } and provides login/logout functions
// ProtectedRoute uses this to check authentication
// ============================================================

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null)
  const [token, setToken] = useState(null)

  // Login function — stores customer info and token
  const login = (customerData, jwt) => {
    setCustomer(customerData)
    setToken(jwt)
  }

  // Logout function — clears auth state
  const logout = () => {
    setCustomer(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ customer, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
