// ============================================================
// Task 5: Vehicle Mongoose Schema
// Fields: model (required), type (required),
//         pricePerDay (min 0), available (Boolean, default true)
// Schema-level validation: required, min
// ============================================================

const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, 'Vehicle model is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Vehicle type is required'],
      enum: ['Hatchback', 'Sedan', 'SUV'],
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Price per day is required'],
      min: [0, 'Price per day cannot be negative'],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Vehicle', vehicleSchema)
