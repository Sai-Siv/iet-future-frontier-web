import express from 'express';
import { PatnController } from '../controllers/patnController.js';

const router = express.Router();

// Registration
router.post('/register', PatnController.register);

// Get all registrations
router.get('/registrations', PatnController.getAllRegistrations);

export default router;
