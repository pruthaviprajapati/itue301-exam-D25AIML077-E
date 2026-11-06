// ============================================================
// Task 3 + Task 5: Express Server — DriveEasy Car Rental Backend
// Entry point: `node server.js` or `npm start`
//
// Middleware:
//   1. requestLogger — global (every request)
//   2. authGuard     — per protected route
//   3. errorHandler  — global, registered LAST
//
// Task 5: Connects to MongoDB via Mongoose
// ============================================================

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const connectDB = require('./config/db')
const requestLogger = require('./middleware/requestLogger')
const errorHandler = require('./middleware/errorHandler')

const authRoutes = require('./routes/authRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// ---- Global middleware ----
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static test page
app.use(express.static(path.join(__dirname, 'public')))

// requestLogger — applied globally to every request
app.use(requestLogger)

// ---- Routes ----
// Public routes (no authGuard)
app.use('/api/v1/auth', authRoutes)        // POST /api/v1/auth/login
app.use('/api/v1/vehicles', vehicleRoutes)  // GET  /api/v1/vehicles

// Protected routes (authGuard applied inside bookingRoutes)
app.use('/api/v1/bookings', bookingRoutes)  // POST, GET /my, PATCH /:id/status

// ---- 404 handler for unknown routes ----
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
})

// ---- Global error handler — MUST be the last middleware ----
app.use(errorHandler)

// ---- Start server after MongoDB connection ----
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n========================================`)
    console.log(`  DriveEasy Backend running`)
    console.log(`  Port: ${PORT}`)
    console.log(`  http://localhost:${PORT}`)
    console.log(`  MongoDB: ${process.env.MONGO_URI || 'mongodb://localhost:27017/driveeasy'}`)
    console.log(`========================================\n`)
  })
})
