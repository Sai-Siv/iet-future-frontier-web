/**
 * Shared API View / Presenter Layer
 * Standardizes API responses across all microservices
 */

export const renderSuccess = (res, message, data = null, statusCode = 200) => {
  const payload = {
    success: true,
    message,
    ...(data !== null && data !== undefined ? { data } : {})
  };
  return res.status(statusCode).json(payload);
};

export const renderCreated = (res, message, data = null) => {
  return renderSuccess(res, message, data, 201);
};

export const renderError = (res, message, error = null, statusCode = 500) => {
  const payload = {
    success: false,
    message,
    ...(error ? { error: typeof error === 'object' && error.message ? error.message : error } : {})
  };
  return res.status(statusCode).json(payload);
};

export const renderBadRequest = (res, message, details = null) => {
  return res.status(400).json({
    success: false,
    message,
    ...(details ? { details } : {})
  });
};

export const renderNotFound = (res, message = 'Resource not found') => {
  return res.status(404).json({
    success: false,
    message
  });
};
