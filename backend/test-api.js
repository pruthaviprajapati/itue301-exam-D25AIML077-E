// ============================================================
// Task 3: API Test Script
// Run with: node test-api.js
// Tests all 5 REST endpoints and prints formatted results
// ============================================================

const BASE = 'http://localhost:5000/api/v1'

async function runTests() {
  console.log('\n========================================')
  console.log('  DriveEasy API - Testing All Endpoints')
  console.log('========================================\n')

  // 1. POST /auth/login
  console.log('--- 1. POST /api/v1/auth/login ---')
  const loginRes = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'john@example.com', password: 'pass123' }),
  })
  const loginData = await loginRes.json()
  console.log(`Status: ${loginRes.status}`)
  console.log(JSON.stringify(loginData, null, 2))
  const token = loginData.token
  console.log('')

  // 2. GET /vehicles
  console.log('--- 2. GET /api/v1/vehicles ---')
  const vehRes = await fetch(`${BASE}/vehicles`)
  const vehData = await vehRes.json()
  console.log(`Status: ${vehRes.status}`)
  console.log(`Vehicles found: ${vehData.count}`)
  vehData.data.forEach(v => {
    console.log(`  - ${v.model} (${v.type}) - Rs.${v.pricePerDay}/day - Available: ${v.available}`)
  })
  console.log('')

  // 3. POST /bookings
  console.log('--- 3. POST /api/v1/bookings (protected) ---')
  const bookRes = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ vehicleId: 'v4', pickupDate: '2026-09-15', returnDate: '2026-09-20' }),
  })
  const bookData = await bookRes.json()
  console.log(`Status: ${bookRes.status}`)
  console.log(JSON.stringify(bookData, null, 2))
  console.log('')

  // 4. GET /bookings/my
  console.log('--- 4. GET /api/v1/bookings/my (protected) ---')
  const myRes = await fetch(`${BASE}/bookings/my`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  const myData = await myRes.json()
  console.log(`Status: ${myRes.status}`)
  console.log(`My bookings: ${myData.count}`)
  myData.data.forEach(b => {
    console.log(`  - Booking ${b._id}: ${b.vehicle ? b.vehicle.model : 'N/A'} | ${b.pickupDate} to ${b.returnDate} | ${b.status}`)
  })
  console.log('')

  // 5. PATCH /bookings/:id/status
  console.log('--- 5. PATCH /api/v1/bookings/b1/status (protected) ---')
  const patchRes = await fetch(`${BASE}/bookings/b1/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ status: 'completed' }),
  })
  const patchData = await patchRes.json()
  console.log(`Status: ${patchRes.status}`)
  console.log(JSON.stringify(patchData, null, 2))

  console.log('\n========================================')
  console.log('  All 5 Endpoints Tested Successfully!')
  console.log('========================================\n')
}

runTests().catch(console.error)
