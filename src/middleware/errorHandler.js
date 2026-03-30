const errorHandler = (err, req, res, next) => {
  console.error('[Error]:', err.message || err);

  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    // Only send stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
