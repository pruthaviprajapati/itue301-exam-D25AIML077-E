// ============================================================
// Task 3 + Task 5: Vehicle Controller
// GET /api/v1/vehicles — return all vehicles (public)
// Now uses Mongoose Vehicle model
// ============================================================

const Vehicle = require('../models/Vehicle')

exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find()
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    })
  } catch (err) {
    next(err)
  }
}
