// ============================================================
// Task 3 + Task 5: Booking Controller
// POST   /api/v1/bookings          — create booking (protected)
// GET    /api/v1/bookings/my       — get own bookings (protected)
// PATCH  /api/v1/bookings/:id/status — update status (protected)
//
// Now uses Mongoose Booking + Vehicle models
// POST checks vehicle.available === true, sets to false after
// GET /my uses .populate('customerId') and .populate('vehicleId')
// ============================================================

const Booking = require('../models/Booking')
const Vehicle = require('../models/Vehicle')

// Create a new booking
exports.createBooking = async (req, res, next) => {
  try {
    const { vehicleId, pickupDate, returnDate } = req.body
    const customerId = req.customer._id

    // Validate required fields
    if (!vehicleId || !pickupDate || !returnDate) {
      const err = new Error('vehicleId, pickupDate, and returnDate are required')
      err.statusCode = 400
      throw err
    }

    // Find the vehicle using Mongoose
    const vehicle = await Vehicle.findById(vehicleId)

    if (!vehicle) {
      const err = new Error('Vehicle not found')
      err.statusCode = 404
      throw err
    }

    // Task 5 requirement: check vehicle.available === true
    if (!vehicle.available) {
      const err = new Error('Vehicle is not available for booking')
      err.statusCode = 400
      throw err
    }

    // Create the Booking record using Mongoose
    const newBooking = await Booking.create({
      customerId,
      vehicleId,
      pickupDate,
      returnDate,
      status: 'reserved', // default from schema
    })

    // Set vehicle available = false after booking
    vehicle.available = false
    await vehicle.save()

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking,
    })
  } catch (err) {
    next(err)
  }
}

// Get customer's own bookings with populate
exports.getMyBookings = async (req, res, next) => {
  try {
    const customerId = req.customer._id

    // Task 5 requirement: use .populate('customerId', 'name email')
    //                      and .populate('vehicleId', 'model type')
    const myBookings = await Booking.find({ customerId })
      .populate('customerId', 'name email')
      .populate('vehicleId', 'model type')

    res.status(200).json({
      success: true,
      count: myBookings.length,
      data: myBookings,
    })
  } catch (err) {
    next(err)
  }
}

// Update booking status
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    // Validate status value
    const validStatuses = ['reserved', 'ongoing', 'completed', 'cancelled']
    if (!status || !validStatuses.includes(status)) {
      const err = new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`)
      err.statusCode = 400
      throw err
    }

    // Find booking using Mongoose
    const booking = await Booking.findById(id)

    if (!booking) {
      const err = new Error('Booking not found')
      err.statusCode = 404
      throw err
    }

    // Verify ownership
    if (booking.customerId.toString() !== req.customer._id) {
      const err = new Error('Unauthorized: this is not your booking')
      err.statusCode = 401
      throw err
    }

    // Update status
    booking.status = status
    await booking.save()

    // If cancelled or completed, make vehicle available again
    if (status === 'cancelled' || status === 'completed') {
      await Vehicle.findByIdAndUpdate(booking.vehicleId, { available: true })
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated',
      data: booking,
    })
  } catch (err) {
    next(err)
  }
}
