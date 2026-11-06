// ============================================================
// Task 3 + Task 5: Auth Controller
// POST /api/v1/auth/login — authenticate customer, issue JWT
// Now uses Mongoose Customer model
// ============================================================

const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      const err = new Error('Email and password are required')
      err.statusCode = 400
      throw err
    }

    // Find customer by email using Mongoose
    const customer = await Customer.findOne({ email: email.toLowerCase() })

    if (!customer || customer.password !== password) {
      const err = new Error('Invalid email or password')
      err.statusCode = 401
      throw err
    }

    // Issue JWT token
    const token = jwt.sign(
      { _id: customer._id, name: customer.name, email: customer.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    )

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
      },
    })
  } catch (err) {
    next(err)
  }
}
