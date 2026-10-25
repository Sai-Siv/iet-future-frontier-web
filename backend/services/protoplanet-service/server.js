import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import protoPlanRoutes from './routes/protoPlanRoutes.js';
import { corsOptions } from '../../shared/middlewares/corsConfig.js';
import { errorHandler } from '../../shared/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PROTOPLANET_SERVICE_PORT || 5001;

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check / Service info
app.get('/health', (req, res) => {
  res.json({
    service: 'ProtoPlanet Microservice',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Mount Routes (root / prefix compatible with both gateway and direct calls)
app.use('/api/protoplan', protoPlanRoutes);
app.use('/', protoPlanRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 ProtoPlanet Microservice running on port ${PORT}`);
});

export default app;
