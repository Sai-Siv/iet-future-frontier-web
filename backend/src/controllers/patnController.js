import { HttpError } from '../utils/HttpError.js';

// The registration deadline (21 July 2026) has passed. Existing records are kept in Firestore.
export const registerPatn = (req, res, next) => {
  next(new HttpError(403, 'PATN registration is closed. The registration deadline was July 21, 2026.'));
};
