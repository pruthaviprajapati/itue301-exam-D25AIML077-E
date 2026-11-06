// ============================================================
// Task 3: Global requestLogger middleware
// Logs [METHOD] [PATH] [TIMESTAMP] for every request
// Applied globally in server.js
// ============================================================

function requestLogger(req, res, next) {
  const method = req.method
  const path = req.path
  const timestamp = new Date().toISOString()

  console.log(`[${method}] [${path}] [${timestamp}]`)

  next()
}

module.exports = requestLogger
