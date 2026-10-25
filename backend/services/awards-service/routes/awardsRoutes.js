import express from 'express';
import multer from 'multer';
import { AwardsController } from '../controllers/awardsController.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit per file
});

router.get('/test', AwardsController.test);
router.post('/register', upload.any(), AwardsController.submitApplication);

export default router;
