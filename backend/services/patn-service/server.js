import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import patnRoutes from './routes/patnRoutes.js';
import { corsOptions } from '../../shared/middlewares/corsConfig.js';
import { errorHandler } from '../../shared/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PATN_SERVICE_PORT || 5002;

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check / Service info
app.get('/health', (req, res) => {
  res.json({
    service: 'PATN Microservice',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Mount Routes (accessible via root or /api/patn)
app.use('/api/patn', patnRoutes);
app.use('/', patnRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 PATN Microservice running on port ${PORT}`);
});

export default app;
