import express from 'express';
import multer from 'multer';
import { AppAstralController } from '../controllers/appAstralController.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

// Use upload.any() to accept any uploaded payment/accommodation files without Multer throwing "Unexpected field"
router.post('/register', upload.any(), (req, res, next) => {
  if (Array.isArray(req.files)) {
    const filesMap = {};
    req.files.forEach(file => {
      if (!filesMap[file.fieldname]) {
        filesMap[file.fieldname] = [];
      }
      filesMap[file.fieldname].push(file);
    });
    req.files = filesMap;
  }
  next();
}, AppAstralController.register);

export default router;
