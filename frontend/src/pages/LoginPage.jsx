import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

// ============================================================
// Task 1 + Task 2 + Task 4: LoginPage
// Now calls real backend API: POST /api/v1/auth/login
// Stores { customer, token } in AuthContext on success
// ============================================================

function LoginPage() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const formStyle = { maxWidth: 380, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }
  const inputStyle = { width: '100%', padding: '10px 8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: 4, fontSize: 14 }
  const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#1c3d5e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 15, fontWeight: 600, marginTop: 12 }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // Call real backend API
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')

      // Store customer + token in AuthContext
      login(data.customer, data.token)
      navigate('/fleet')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={formStyle}>
      <h2 style={{ color: '#1c3d5e', textAlign: 'center' }}>DriveEasy Login</h2>
      <p style={{ fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 12 }}>
        Demo: john@example.com / pass123
      </p>
      {error && <p style={{ color: '#e74c3c', fontSize: 13, marginBottom: 8 }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" style={inputStyle} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" style={inputStyle} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" style={btnStyle} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
