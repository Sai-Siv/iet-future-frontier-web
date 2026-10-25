import express from 'express';
import multer from 'multer';
import { AppAstralController } from '../controllers/appAstralController.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

const cpUpload = upload.fields([
  { name: 'member1Payment', maxCount: 1 },
  { name: 'member2Payment', maxCount: 1 },
  { name: 'member3Payment', maxCount: 1 },
  { name: 'paymentScreenshot', maxCount: 1 },
  { name: 'prototypeScreens', maxCount: 1 }
]);

router.post('/register', cpUpload, AppAstralController.register);

export default router;
