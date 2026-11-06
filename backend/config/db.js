// ============================================================
// Task 5: MongoDB connection using Mongoose
// Connection string from .env: MONGO_URI
// ============================================================

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/driveeasy'
    await mongoose.connect(uri)
    console.log('MongoDB connected successfully')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
