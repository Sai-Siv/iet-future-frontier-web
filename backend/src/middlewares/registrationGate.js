import { HttpError } from '../utils/HttpError.js';

/**
 * Refuses registrations for an event until its env flag is set to "true".
 * Runs before uploads are parsed, so nothing is stored while registration is closed.
 * The flag is read on every request, so changing it only needs a restart, not a code change.
 */
export const registrationGate = (eventName, envFlag) => (req, res, next) => {
  if (process.env[envFlag] === 'true') return next();
  return next(new HttpError(403, `${eventName} registration has not opened yet. Registration will start soon.`));
};
