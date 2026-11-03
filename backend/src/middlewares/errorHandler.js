import multer from 'multer';
import { renderError } from '../views/responseView.js';
import { HttpError } from '../utils/HttpError.js';
import { isProduction } from '../config/env.js';

const MULTER_MESSAGES = {
  LIMIT_FILE_SIZE: 'Each file must be 10 MB or smaller.',
  LIMIT_FILE_COUNT: 'Too many files were uploaded.',
  LIMIT_UNEXPECTED_FILE: 'An unexpected file was uploaded.',
};

const BODY_PARSER_ERRORS = {
  'entity.too.large': { status: 413, message: 'The submitted data is too large.' },
  'entity.parse.failed': { status: 400, message: 'The submitted data is not valid.' },
};

export const notFoundHandler = (req, res) => renderError(res, 'Route not found', null, 404);

// Only messages written for users are sent to the client. Anything unexpected is
// logged here and answered generically, so internal details never leak.
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err instanceof multer.MulterError) {
    return renderError(res, MULTER_MESSAGES[err.code] || 'The file upload could not be processed.', null, 400);
  }
  if (err instanceof HttpError) {
    return renderError(res, err.message, null, err.status);
  }
  if (BODY_PARSER_ERRORS[err.type]) {
    const { status, message } = BODY_PARSER_ERRORS[err.type];
    return renderError(res, message, null, status);
  }

  console.error(`[Error] ${req.method} ${req.path}:`, isProduction ? err.message : err);
  return renderError(res, 'Something went wrong. Please try again later.', null, 500);
};
