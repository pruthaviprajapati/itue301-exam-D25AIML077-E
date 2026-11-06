import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

// ============================================================
// Task 4: MyBookingsPage
// Fetches customer's own bookings via GET /api/v1/bookings/my
// Uses useEffect + fetch, manages loading/error states
// ============================================================

function MyBookingsPage() {
  const { token } = useContext(AuthContext)

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMyBookings()
  }, [])

  const fetchMyBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/v1/bookings/my', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch bookings`)
      const data = await res.json()
      setBookings(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const thStyle = { border: '1px solid #ddd', padding: '8px 12px', textAlign: 'left' }
  const tdStyle = { border: '1px solid #ddd', padding: '8px 12px' }

  return (
    <div>
      <h2 style={{ color: '#1c3d5e' }}>My Bookings</h2>
      <p style={{ fontSize: 14, color: '#666' }}>View and manage your car rental bookings.</p>

      {loading && <p style={{ padding: 20, color: '#1c3d5e' }}>Loading bookings...</p>}

      {error && (
        <div style={{ padding: 16, border: '1px solid #e74c3c', borderRadius: 8, backgroundColor: '#fdf2f2' }}>
          <p style={{ color: '#e74c3c', fontWeight: 600 }}>Failed to load bookings: {error}</p>
          <button onClick={fetchMyBookings} style={{ padding: '8px 20px', backgroundColor: '#1c3d5e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', marginTop: 8 }}>Retry</button>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <p style={{ padding: 20, color: '#888' }}>No bookings found. Book a vehicle from the Fleet page!</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: '#1c3d5e', color: '#fff' }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Vehicle</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Pickup Date</th>
              <th style={thStyle}>Return Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={b._id}>
                <td style={tdStyle}>{idx + 1}</td>
                <td style={tdStyle}>{b.vehicle ? b.vehicle.model : b.vehicleId}</td>
                <td style={tdStyle}>{b.vehicle ? b.vehicle.type : '-'}</td>
                <td style={tdStyle}>{b.pickupDate}</td>
                <td style={tdStyle}>{b.returnDate}</td>
                <td style={tdStyle}>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MyBookingsPage
