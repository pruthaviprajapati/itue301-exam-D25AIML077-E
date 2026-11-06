// ============================================================
// Task 3: authGuard middleware
// Validates the Bearer token from Authorization header
// Returns 401 if token is missing or invalid
// Applied to every protected route
// ============================================================

const jwt = require('jsonwebtoken')

function authGuard(req, res, next) {
  const authHeader = req.headers.authorization

  // Check if Authorization header exists and has Bearer scheme
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided or invalid scheme.',
    })
  }

  // Extract the token
  const token = authHeader.split(' ')[1]

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret')
    req.customer = decoded // attach decoded customer info to request
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    })
  }
}

module.exports = authGuard
