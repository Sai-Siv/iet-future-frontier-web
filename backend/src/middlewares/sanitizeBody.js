import { HttpError } from '../utils/HttpError.js';

const MAX_STRING_LENGTH = 20000;
const MAX_ARRAY_LENGTH = 100;
const MAX_DEPTH = 4;
const SAFE_KEY = /^(?!__)[A-Za-z0-9_-]{1,64}$/;

const clean = (value, depth) => {
  if (typeof value === 'string') {
    if (value.length > MAX_STRING_LENGTH) {
      throw new HttpError(400, 'One of the submitted answers is too long.');
    }
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) return value;
  if (depth >= MAX_DEPTH) return undefined;
  if (Array.isArray(value)) {
    return value.slice(0, MAX_ARRAY_LENGTH).map((item) => clean(item, depth + 1)).filter((item) => item !== undefined);
  }
  if (typeof value === 'object') {
    const result = {};
    for (const [key, item] of Object.entries(value)) {
      if (!SAFE_KEY.test(key)) continue;
      const cleaned = clean(item, depth + 1);
      if (cleaned !== undefined) result[key] = cleaned;
    }
    return result;
  }
  return undefined;
};

/**
 * Bounds what can reach the database: drops unsafe keys and over-deep values, and
 * rejects oversized strings. `exempt` fields are kept out of the check and left as sent.
 */
export const sanitizeBody = ({ exempt = [] } = {}) => (req, res, next) => {
  try {
    const original = req.body || {};
    const cleaned = clean(Object.fromEntries(Object.entries(original).filter(([key]) => !exempt.includes(key))), 0);
    for (const key of exempt) {
      if (key in original) cleaned[key] = original[key];
    }
    req.body = cleaned;
    next();
  } catch (error) {
    next(error);
  }
};

/** Multipart forms send nested data as JSON strings. Converts the named fields back to objects. */
export const parseJsonFields = (fields) => (req, res, next) => {
  try {
    for (const field of fields) {
      const value = req.body?.[field];
      if (typeof value === 'string' && value) {
        const parsed = JSON.parse(value);
        if (typeof parsed !== 'object' || parsed === null) throw new Error('not an object');
        req.body[field] = parsed;
      }
    }
    next();
  } catch {
    next(new HttpError(400, 'Invalid JSON data in form submission'));
  }
};

/** Same as parseJsonFields, for forms whose field names are dynamic (award question IDs). */
export const parseJsonLikeFields = (req, res, next) => {
  for (const [key, value] of Object.entries(req.body || {})) {
    if (typeof value === 'string' && /^[[{]/.test(value)) {
      try {
        req.body[key] = JSON.parse(value);
      } catch {
        // A free-text answer that merely starts with a bracket stays a string.
      }
    }
  }
  next();
};
