import express from 'express';
import { InnothonController } from '../controllers/innothonController.js';

const router = express.Router();

router.post('/register', InnothonController.register);
router.get('/status/:registrationId', InnothonController.getStatus);

export default router;
