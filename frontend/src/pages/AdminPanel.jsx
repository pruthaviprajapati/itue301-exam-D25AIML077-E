import React from 'react'

// ============================================================
// Task 2: AdminPanel (lazy-loaded via React.lazy + Suspense)
// Shows admin-level fleet management view
// ============================================================

function AdminPanel() {
  return (
    <div>
      <h2 style={{ color: '#1c3d5e' }}>Admin Panel</h2>
      <p style={{ fontSize: 14, color: '#666' }}>Manage vehicles, bookings, and customers.</p>

      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <div style={cardStyle}>
          <h3 style={{ color: '#1c3d5e' }}>Total Vehicles</h3>
          <p style={{ fontSize: 28, fontWeight: 700 }}>4</p>
        </div>
        <div style={cardStyle}>
          <h3 style={{ color: '#1c3d5e' }}>Active Bookings</h3>
          <p style={{ fontSize: 28, fontWeight: 700 }}>2</p>
        </div>
        <div style={cardStyle}>
          <h3 style={{ color: '#1c3d5e' }}>Registered Customers</h3>
          <p style={{ fontSize: 28, fontWeight: 700 }}>5</p>
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: 8,
  padding: 16,
  width: 180,
  textAlign: 'center',
}

export default AdminPanel
