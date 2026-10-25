import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appAstralRoutes from './routes/appAstralRoutes.js';
import { corsOptions } from '../../shared/middlewares/corsConfig.js';
import { errorHandler } from '../../shared/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.APPASTRAL_SERVICE_PORT || 5004;

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    service: 'AppAstral Microservice',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use('/api/appastral', appAstralRoutes);
app.use('/', appAstralRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 AppAstral Microservice running on port ${PORT}`);
});

export default app;
