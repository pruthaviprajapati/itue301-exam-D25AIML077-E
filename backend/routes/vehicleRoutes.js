// ============================================================
// Task 3: Vehicle Routes
// GET /api/v1/vehicles (public — no authGuard)
// ============================================================

const express = require('express')
const router = express.Router()
const { getVehicles } = require('../controllers/vehicleController')

router.get('/', getVehicles)

module.exports = router
