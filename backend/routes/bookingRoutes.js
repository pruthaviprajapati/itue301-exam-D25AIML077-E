// ============================================================
// Task 3: Booking Routes
// POST   /api/v1/bookings          (protected — authGuard)
// GET    /api/v1/bookings/my       (protected — authGuard)
// PATCH  /api/v1/bookings/:id/status (protected — authGuard)
// ============================================================

const express = require('express')
const router = express.Router()
const authGuard = require('../middleware/authGuard')
const { createBooking, getMyBookings, updateBookingStatus } = require('../controllers/bookingController')

// All booking routes require authentication
router.post('/', authGuard, createBooking)
router.get('/my', authGuard, getMyBookings)
router.patch('/:id/status', authGuard, updateBookingStatus)

module.exports = router
