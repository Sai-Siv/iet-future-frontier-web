export const renderSuccess = (res, message, data = null, statusCode = 200) =>
  res.status(statusCode).json({
    success: true,
    message,
    ...(data !== null && data !== undefined ? { data } : {}),
  });

export const renderError = (res, message, details = null, statusCode = 500) =>
  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
  });
