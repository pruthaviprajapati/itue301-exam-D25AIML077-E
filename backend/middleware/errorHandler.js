// ============================================================
// Task 3 + Task 5: Global error-handling middleware
// Must be the LAST middleware in the Express app
// Returns structured JSON instead of raw error stack
// Handles Mongoose validation/duplicate key errors gracefully
// ============================================================

function errorHandler(err, req, res, next) {
  console.error('Error:', err.message)

  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // ---- Mongoose validation error (schema-level validation) ----
  if (err.name === 'ValidationError') {
    statusCode = 400
    // Collect all validation error messages
    const messages = Object.values(err.errors).map((e) => e.message)
    message = `Validation failed: ${messages.join(', ')}`
  }

  // ---- Mongoose duplicate key error (unique constraint) ----
  if (err.code === 11000) {
    statusCode = 400
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    message = `Duplicate value for ${field}. This ${field} already exists.`
  }

  // ---- Mongoose cast error (invalid ObjectId, etc.) ----
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}: ${err.value} is not a valid ${err.kind}`
  }

  // Structured JSON error response (no raw Mongoose error object)
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler
