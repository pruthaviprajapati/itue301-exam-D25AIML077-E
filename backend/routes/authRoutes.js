// ============================================================
// Task 3: Auth Routes
// POST /api/v1/auth/login (public — no authGuard)
// ============================================================

const express = require('express')
const router = express.Router()
const { login } = require('../controllers/authController')

router.post('/login', login)

module.exports = router
