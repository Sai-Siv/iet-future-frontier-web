import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import awardsRoutes from './routes/awardsRoutes.js';
import { corsOptions } from '../../shared/middlewares/corsConfig.js';
import { errorHandler } from '../../shared/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.AWARDS_SERVICE_PORT || 5006;

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    service: 'Awards Microservice',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use('/api/awards', awardsRoutes);
app.use('/', awardsRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Awards Microservice running on port ${PORT}`);
});

export default app;
