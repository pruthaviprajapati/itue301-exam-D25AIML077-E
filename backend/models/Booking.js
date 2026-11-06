// ============================================================
// Task 5: Booking Mongoose Schema
// Fields: customerId (ref Customer), vehicleId (ref Vehicle),
//         pickupDate (required), returnDate (required),
//         status (enum: reserved|ongoing|completed|cancelled, default: reserved)
// Schema-level validation: required, enum
// ============================================================

const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer ID is required'],
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle ID is required'],
    },
    pickupDate: {
      type: Date,
      required: [true, 'Pickup date is required'],
    },
    returnDate: {
      type: Date,
      required: [true, 'Return date is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['reserved', 'ongoing', 'completed', 'cancelled'],
        message: '{VALUE} is not a valid status',
      },
      default: 'reserved',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
