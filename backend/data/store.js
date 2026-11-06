// ============================================================
// In-memory data store for Task 3
// (Task 5 will replace this with Mongoose + MongoDB models)
// ============================================================

const customers = [
  { _id: 'c1', name: 'John Doe', email: 'john@example.com', phone: '9876543210', licenseNumber: 'DL001234', password: 'pass123' },
  { _id: 'c2', name: 'Jane Smith', email: 'jane@example.com', phone: '9876501234', licenseNumber: 'DL005678', password: 'pass456' },
]

const vehicles = [
  { _id: 'v1', model: 'Maruti Swift', type: 'Hatchback', pricePerDay: 1800, available: true },
  { _id: 'v2', model: 'Honda City', type: 'Sedan', pricePerDay: 2500, available: true },
  { _id: 'v3', model: 'Toyota Innova', type: 'SUV', pricePerDay: 3500, available: false },
  { _id: 'v4', model: 'Hyundai i20', type: 'Hatchback', pricePerDay: 1500, available: true },
  { _id: 'v5', model: 'Tata Nexon', type: 'SUV', pricePerDay: 2200, available: true },
]

const bookings = []

module.exports = { customers, vehicles, bookings }
