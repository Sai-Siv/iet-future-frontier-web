import express from 'express';
import multer from 'multer';
import { ProtoPlanController } from '../controllers/protoPlanController.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Test endpoint
router.get('/test', ProtoPlanController.test);

// Registration endpoint
router.post('/register', upload.single('screenshot'), ProtoPlanController.register);

// Status check endpoint
router.get('/status/:registrationId', ProtoPlanController.getStatus);

export default router;
