const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    let error = { ...err };
    error.message = err.message;
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      error = {
        message: 'Resource not found',
        statusCode: 404
      };
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      error = {
        message: messages,
        statusCode: 400
      };
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  };
  
  module.exports = errorHandler;