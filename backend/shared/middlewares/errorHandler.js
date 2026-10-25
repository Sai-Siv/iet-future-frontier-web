import { renderError } from '../views/responseView.js';

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });

  return renderError(
    res,
    err.message || 'Something went wrong!',
    process.env.NODE_ENV === 'development' ? err.stack : undefined,
    err.status || 500
  );
};
