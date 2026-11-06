// ============================================================
// Task 5: Seed Script
// Populates MongoDB with sample customers and vehicles
// Run with: node seed.js
// ============================================================

require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/Customer')
const Vehicle = require('./models/Vehicle')

const seedData = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/driveeasy'
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Customer.deleteMany({})
    await Vehicle.deleteMany({})
    console.log('Cleared existing data')

    // Seed customers
    const customers = await Customer.insertMany([
      { name: 'John Doe', email: 'john@example.com', phone: '9876543210', licenseNumber: 'DL001234', password: 'pass123' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '9876501234', licenseNumber: 'DL005678', password: 'pass456' },
    ])
    console.log(`Seeded ${customers.length} customers`)

    // Seed vehicles
    const vehicles = await Vehicle.insertMany([
      { model: 'Maruti Swift', type: 'Hatchback', pricePerDay: 1800, available: true },
      { model: 'Honda City', type: 'Sedan', pricePerDay: 2500, available: true },
      { model: 'Toyota Innova', type: 'SUV', pricePerDay: 3500, available: false },
      { model: 'Hyundai i20', type: 'Hatchback', pricePerDay: 1500, available: true },
      { model: 'Tata Nexon', type: 'SUV', pricePerDay: 2200, available: true },
    ])
    console.log(`Seeded ${vehicles.length} vehicles`)

    console.log('\n========================================')
    console.log('  Seed completed successfully!')
    console.log('========================================')
    console.log('\nLogin credentials:')
    console.log('  Email: john@example.com')
    console.log('  Password: pass123')
    console.log('')
    process.exit(0)
  } catch (err) {
    console.error('Seed error:', err.message)
    process.exit(1)
  }
}

seedData()
