import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { corsOptions } from '../shared/middlewares/corsConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors(corsOptions));

// Service registry with environment variable overrides (supporting Docker / container networks)
const SERVICES = {
  protoplan: {
    target: process.env.PROTOPLANET_SERVICE_URL || 'http://localhost:5001',
    name: 'ProtoPlanet Service'
  },
  patn: {
    target: process.env.PATN_SERVICE_URL || 'http://localhost:5002',
    name: 'PATN Service'
  },
  startupsphere: {
    target: process.env.STARTUPSPHERE_SERVICE_URL || 'http://localhost:5003',
    name: 'StartupSphere Service'
  },
  appastral: {
    target: process.env.APPASTRAL_SERVICE_URL || 'http://localhost:5004',
    name: 'AppAstral Service'
  },
  innothon: {
    target: process.env.INNOTHON_SERVICE_URL || 'http://localhost:5005',
    name: 'Innothon Service'
  },
  awards: {
    target: process.env.AWARDS_SERVICE_URL || 'http://localhost:5006',
    name: 'Awards Service'
  }
};

// Root Health & Gateway Dashboard
app.get('/', (req, res) => {
  res.json({
    service: 'IET 360° API Gateway',
    architecture: 'Microservices with MVC Pattern',
    status: 'online',
    gatewayPort: PORT,
    routes: {
      protoplan: '/api/protoplan (-> ' + SERVICES.protoplan.target + ')',
      patn: '/api/patn (-> ' + SERVICES.patn.target + ')',
      startupsphere: '/api/startupsphere (-> ' + SERVICES.startupsphere.target + ')',
      appastral: '/api/appastral (-> ' + SERVICES.appastral.target + ')',
      innothon: '/api/innothon (-> ' + SERVICES.innothon.target + ')',
      awards: '/api/awards (-> ' + SERVICES.awards.target + ')'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Helper to create proxy route with error interception
const createServiceProxy = (serviceKey, serviceConfig) => {
  return createProxyMiddleware({
    target: serviceConfig.target,
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error(`[Gateway Proxy Error] Failed routing to ${serviceConfig.name}:`, err.message);
      if (!res.headersSent) {
        res.status(503).json({
          success: false,
          message: `Microservice (${serviceConfig.name}) is temporarily unavailable.`,
          error: err.message
        });
      }
    }
  });
};

// Reverse Proxy Routes to Individual Microservices
app.use('/api/protoplan', createServiceProxy('protoplan', SERVICES.protoplan));
app.use('/api/patn', createServiceProxy('patn', SERVICES.patn));
app.use('/api/startupsphere', createServiceProxy('startupsphere', SERVICES.startupsphere));
app.use('/api/appastral', createServiceProxy('appastral', SERVICES.appastral));
app.use('/api/innothon', createServiceProxy('innothon', SERVICES.innothon));
app.use('/api/awards', createServiceProxy('awards', SERVICES.awards));

// 404 Handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('[Gateway Error]:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Gateway Error',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🌐 IET 360° API Gateway running on port ${PORT}`);
  console.log(`   Connected Microservices:`);
  Object.entries(SERVICES).forEach(([key, info]) => {
    console.log(`   - /api/${key} -> ${info.target} (${info.name})`);
  });
});

export default app;
