import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './config/env.js';
import { corsOptions } from './config/cors.js';
import { apiLimiter, registrationLimiter } from './middlewares/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// Number of proxies in front of the app, so rate limiting sees the real client IP.
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? 1));

// The API is called cross-origin by the website, so it must allow cross-origin reads.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors(corsOptions));

// Rate limits run before body parsing so rejected requests cost as little as possible.
app.use('/api', apiLimiter);
app.post(/^\/api\/[a-z]+\/register$/, registrationLimiter);

// Innothon sends its payment screenshot as base64 JSON (10 MB file is about 13.4 MB encoded).
app.use('/api/innothon/register', express.json({ limit: '15mb' }));
app.use(express.json({ limit: '100kb' }));

app.get('/', (req, res) => res.json({ service: 'IET 360° API', status: 'online' }));
app.get('/health', (req, res) => res.json({ status: 'healthy' }));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
