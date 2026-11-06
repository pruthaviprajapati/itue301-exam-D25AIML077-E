// Quick script to show MongoDB collections for screenshot
require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/Customer')
const Vehicle = require('./models/Vehicle')
const Booking = require('./models/Booking')

const showDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/driveeasy')

    console.log('\n========================================')
    console.log('  DriveEasy MongoDB - Saved Documents')
    console.log('========================================\n')

    // Show Customers
    const customers = await Customer.find().select('-password')
    console.log('--- CUSTOMERS Collection ---')
    console.log(`Count: ${customers.length}`)
    customers.forEach(c => {
      console.log(`  _id: ${c._id}`)
      console.log(`  name: ${c.name}`)
      console.log(`  email: ${c.email}`)
      console.log(`  licenseNumber: ${c.licenseNumber}`)
      console.log('')
    })

    // Show Vehicles
    const vehicles = await Vehicle.find()
    console.log('--- VEHICLES Collection ---')
    console.log(`Count: ${vehicles.length}`)
    vehicles.forEach(v => {
      console.log(`  _id: ${v._id}`)
      console.log(`  model: ${v.model}`)
      console.log(`  type: ${v.type}`)
      console.log(`  pricePerDay: ${v.pricePerDay}`)
      console.log(`  available: ${v.available}`)
      console.log('')
    })

    // Show Bookings with populate
    const bookings = await Booking.find()
      .populate('customerId', 'name email')
      .populate('vehicleId', 'model type')
    console.log('--- BOOKINGS Collection (with populate) ---')
    console.log(`Count: ${bookings.length}`)
    bookings.forEach(b => {
      console.log(`  _id: ${b._id}`)
      console.log(`  customerId: ${b.customerId.name} (${b.customerId.email})`)
      console.log(`  vehicleId: ${b.vehicleId.model} (${b.vehicleId.type})`)
      console.log(`  pickupDate: ${b.pickupDate}`)
      console.log(`  returnDate: ${b.returnDate}`)
      console.log(`  status: ${b.status}`)
      console.log('')
    })

    console.log('========================================')
    console.log('  All collections displayed!')
    console.log('========================================\n')
    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

showDB()
