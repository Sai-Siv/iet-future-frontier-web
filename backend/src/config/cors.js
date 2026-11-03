import { isProduction } from './env.js';

const productionOrigins = [
  'https://iet360.org',
  'https://www.iet360.org',
  'https://iet-future-frontier-web.vercel.app',
];

const developmentOrigins = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:3000',
  'http://localhost:5173',
];

const extraOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsOptions = {
  origin: [...productionOrigins, ...(isProduction ? [] : developmentOrigins), ...extraOrigins],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
};
