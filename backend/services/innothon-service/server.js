import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import innothonRoutes from './routes/innothonRoutes.js';
import { corsOptions } from '../../shared/middlewares/corsConfig.js';
import { errorHandler } from '../../shared/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.INNOTHON_SERVICE_PORT || 5005;

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    service: 'Innothon Microservice',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use('/api/innothon', innothonRoutes);
app.use('/', innothonRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Innothon Microservice running on port ${PORT}`);
});

export default app;
