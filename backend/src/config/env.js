import dotenv from 'dotenv';

dotenv.config();

const REQUIRED = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

// Failing at startup makes a misconfigured deploy fail visibly, instead of
// accepting registrations that cannot be saved.
const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

export const isProduction = process.env.NODE_ENV === 'production';
