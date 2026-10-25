import express from 'express';
import { StartupSphereController } from '../controllers/startupSphereController.js';

const router = express.Router();

router.post('/register', StartupSphereController.register);

export default router;
