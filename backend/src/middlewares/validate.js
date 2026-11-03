import { validationResult } from 'express-validator';
import { HttpError } from '../utils/HttpError.js';

/** Runs after a list of express-validator rules and reports every failed field at once. */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const message = errors.array({ onlyFirstError: true }).map((error) => error.msg).join('; ');
  next(new HttpError(400, message));
};
