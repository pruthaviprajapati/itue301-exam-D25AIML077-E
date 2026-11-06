import React, { useState, useEffect, useContext } from 'react'
import VehicleCard from '../components/VehicleCard.jsx'
import { AuthContext } from '../context/AuthContext.jsx'

// ============================================================
// Task 4: REST API Consumption in React
//   - Fetch vehicles via GET /api/v1/vehicles using fetch + useEffect
//   - Three states: vehicles, loading, error
//   - Loading indicator while fetching
//   - Error message if request fails
//   - VehicleCard grid on success (data from API, not hardcoded)
//   - Client-side type filter (All | Hatchback | Sedan | SUV)
//     applied to already-fetched array (no new API request)
// ============================================================

function FleetPage() {
  const { token } = useContext(AuthContext)

  // Three states as required by Task 4
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Client-side filter state
  const [filter, setFilter] = useState('All')

  // Booking form state (from Task 2)
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  // useEffect — fetch vehicles when component mounts
  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    setLoading(true)
    setError(null)
    try {
      // API call using fetch (Vite proxy routes /api to backend on port 5000)
      const res = await fetch('/api/v1/vehicles')
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch vehicles`)
      const data = await res.json()
      setVehicles(data.data) // store full array in state
    } catch (err) {
      setError(err.message) // friendly error message
    } finally {
      setLoading(false)
    }
  }

  // Derive filtered list from the already-fetched array (no new API call)
  const filteredVehicles = filter === 'All'
    ? vehicles
    : vehicles.filter((v) => v.type === filter)

  // ---- Styles ----
  const formStyle = { maxWidth: 400, padding: 20, border: '1px solid #ccc', borderRadius: 8, margin: '20px 0' }
  const inputStyle = { width: '100%', padding: '8px', margin: '6px 0', border: '1px solid #ccc', borderRadius: 4, fontSize: 14 }
  const btnStyle = { padding: '8px 20px', backgroundColor: '#1c3d5e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }
  const filterBtn = (active) => ({
    padding: '6px 14px', border: '1px solid #1c3d5e', borderRadius: 4,
    cursor: 'pointer', fontWeight: 600, fontSize: 13,
    backgroundColor: active ? '#1c3d5e' : '#fff',
    color: active ? '#fff' : '#1c3d5e',
  })

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!selectedVehicle || !pickupDate || !returnDate) {
      alert('Please select a vehicle and dates')
      return
    }
    // Find selected vehicle object
    const vehicle = vehicles.find((v) => v.model === selectedVehicle)
    if (!vehicle) return

    try {
      const res = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId: vehicle._id,
          pickupDate,
          returnDate,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        alert(`Booking confirmed! Status: ${data.data.status}`)
        fetchVehicles() // refresh list after booking
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  return (
    <div>
      <h2 style={{ color: '#1c3d5e' }}>Our Fleet</h2>
      <p style={{ fontSize: 14, color: '#666' }}>Browse available vehicles and book your ride.</p>

      {/* Client-side type filter (no new API request) */}
      <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        <span style={{ fontSize: 14, fontWeight: 600, alignSelf: 'center', marginRight: 4 }}>Filter:</span>
        {['All', 'Hatchback', 'Sedan', 'SUV'].map((t) => (
          <button key={t} style={filterBtn(filter === t)} onClick={() => setFilter(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* 1) Loading indicator while request is in progress */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ fontSize: 16, color: '#1c3d5e' }}>Loading vehicles...</p>
        </div>
      )}

      {/* 2) Friendly error message if request fails */}
      {error && (
        <div style={{ padding: 16, border: '1px solid #e74c3c', borderRadius: 8, backgroundColor: '#fdf2f2', margin: '16px 0' }}>
          <p style={{ color: '#e74c3c', fontWeight: 600 }}>Failed to load vehicles: {error}</p>
          <button onClick={fetchVehicles} style={{ ...btnStyle, marginTop: 8 }}>Retry</button>
        </div>
      )}

      {/* 3) Grid of VehicleCard components after successful request */}
      {!loading && !error && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
            {filteredVehicles.map((v) => (
              <VehicleCard
                key={v._id}
                model={v.model}
                type={v.type}
                pricePerDay={v.pricePerDay}
                available={v.available}
              />
            ))}
          </div>
          {filteredVehicles.length === 0 && (
            <p style={{ textAlign: 'center', color: '#888', padding: 20 }}>No vehicles found for this type.</p>
          )}
        </>
      )}

      {/* Booking form using useState (Task 2) */}
      {!loading && !error && (
        <div style={formStyle}>
          <h3 style={{ color: '#1c3d5e' }}>Book a Vehicle</h3>
          <form onSubmit={handleBooking}>
            <label>Select Vehicle</label>
            <select style={inputStyle} value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} required>
              <option value="">-- Choose a vehicle --</option>
              {vehicles.filter((v) => v.available).map((v) => (
                <option key={v._id} value={v.model}>{v.model} — Rs.{v.pricePerDay}/day</option>
              ))}
            </select>
            <label>Pickup Date</label>
            <input type="date" style={inputStyle} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
            <label>Return Date</label>
            <input type="date" style={inputStyle} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
            <button type="submit" style={btnStyle}>Confirm Booking</button>
          </form>
          {selectedVehicle && (
            <p style={{ marginTop: 12, fontSize: 14, color: '#1c3d5e' }}>
              Selected: <b>{selectedVehicle}</b>{pickupDate && ` | Pickup: ${pickupDate}`}{returnDate && ` | Return: ${returnDate}`}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default FleetPage
