import crypto from 'crypto';

export const createRegistrationId = (prefix) =>
  `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
