import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

// ============================================================
// Task 2: Navigation component
// Uses React Router <Link> for client-side navigation (no reload)
// Shows logout button when authenticated
// ============================================================

function Navigation() {
  const { customer, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    borderBottom: '2px solid #1c3d5e',
    paddingBottom: 10,
  }

  const linkStyle = {
    padding: '6px 16px',
    textDecoration: 'none',
    border: '1px solid #1c3d5e',
    borderRadius: 4,
    fontWeight: 600,
    color: '#1c3d5e',
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Login</Link>
      <Link to="/fleet" style={linkStyle}>Fleet</Link>
      <Link to="/my-bookings" style={linkStyle}>My Bookings</Link>
      <Link to="/admin" style={linkStyle}>Admin</Link>

      {customer && (
        <span style={{ marginLeft: 'auto', fontSize: 14 }}>
          Welcome, <b>{customer.name}</b>
          <button onClick={handleLogout} style={{ ...linkStyle, marginLeft: 8, cursor: 'pointer', background: '#fff' }}>
            Logout
          </button>
        </span>
      )}
    </nav>
  )
}

export default Navigation
