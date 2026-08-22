const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: `Route Not Found - ${req.originalUrl}`
  });
};

const globalErrorHandler = (err, req, res, next) => {
  console.error('[ERROR HANDLER]:', err.stack || err.message);

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: `Validation Error: ${messages.join(', ')}` });
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(404).json({ error: `Resource not found with invalid ID: ${err.value}` });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error'
  });
};

module.exports = { notFoundHandler, globalErrorHandler };
