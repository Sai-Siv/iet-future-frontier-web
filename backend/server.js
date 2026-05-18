
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import protoPlanRoutes from './routes/protoPlanRoutes.js';
import patn from './routes/registrationRoutes.js';
import startupSphereRoutes from './routes/startupSphereRoutes.js';
import appAstralRoutes from './routes/appAstralRoutes.js';
import innothonRoutes from './routes/innothonRoutes.js';

dotenv.config();

const app = express();

// CORS configuration - Updated to include production domains
const corsOptions = {
    origin: [
        'http://localhost:8081', 
        'http://localhost:8080', 
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        service: "Future Tech Conclave Backend API",
        status: "online",
        database: "connected (Firestore)",
        cloudinary: "active",
        timestamp: new Date().toISOString()
    });
});

app.use('/api/protoplan', protoPlanRoutes);
app.use('/api/patn', patn);
app.use('/api/startupsphere', startupSphereRoutes);
app.use('/api/appastral', appAstralRoutes);
app.use('/api/innothon', innothonRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
    });
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
