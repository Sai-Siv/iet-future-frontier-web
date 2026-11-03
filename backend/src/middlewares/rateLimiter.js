import rateLimit from 'express-rate-limit';

const createLimiter = (limit, message) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message },
  });

export const apiLimiter = createLimiter(
  Number(process.env.RATE_LIMIT_API_MAX ?? 300),
  'Too many requests. Please try again in a few minutes.'
);

// Deliberately generous: a whole college campus can share one public IP address.
export const registrationLimiter = createLimiter(
  Number(process.env.RATE_LIMIT_REGISTRATION_MAX ?? 60),
  'Too many registration attempts. Please try again in a few minutes.'
);
