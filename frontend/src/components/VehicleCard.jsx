import React from 'react'

// ============================================================
// Task 1: Reusable VehicleCard component
// Accepts props: model, type, pricePerDay, available
// If available is false  → render "Not Available" badge
// If available is true   → render "Book Now" button
// ============================================================

function VehicleCard({ model, type, pricePerDay, available }) {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
    width: 220,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  }

  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 600,
  }

  const bookBtnStyle = {
    padding: '6px 16px',
    backgroundColor: '#1c3d5e',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
  }

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 8px', fontSize: 17, color: '#1c3d5e' }}>{model}</h3>
      <p style={{ margin: '4px 0', fontSize: 14 }}><b>Type:</b> {type}</p>
      <p style={{ margin: '4px 0', fontSize: 14 }}><b>Price/Day:</b> ₹{pricePerDay}</p>
      <p style={{ margin: '4px 0', fontSize: 14 }}>
        <b>Available:</b> {available ? 'Yes' : 'No'}
      </p>

      {/* Ternary: swap between badge and button based on availability */}
      {available ? (
        <button style={bookBtnStyle} onClick={() => alert(`Booking ${model}...`)}>
          Book Now
        </button>
      ) : (
        <span style={badgeStyle}>Not Available</span>
      )}
    </div>
  )
}

export default VehicleCard
