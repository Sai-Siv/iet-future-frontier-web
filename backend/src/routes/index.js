import { Router } from 'express';
import { imageUpload, awardDocumentUpload, verifyFileContents } from '../middlewares/upload.js';
import { sanitizeBody, parseJsonFields, parseJsonLikeFields } from '../middlewares/sanitizeBody.js';
import { validate } from '../middlewares/validate.js';
import {
  appAstralRules,
  awardsRules,
  innothonRules,
  patnRules,
  protoPlanetRules,
} from '../validators/registrationValidators.js';
import { APPASTRAL_FILE_FIELDS, registerAppAstral } from '../controllers/appAstralController.js';
import { submitAwardApplication } from '../controllers/awardsController.js';
import { registerInnothon } from '../controllers/innothonController.js';
import { registerPatn } from '../controllers/patnController.js';
import { registerProtoPlanet } from '../controllers/protoPlanetController.js';

const MEMBER_FIELDS = ['member1', 'member2', 'member3'];

const router = Router();

router.post(
  '/appastral/register',
  imageUpload(APPASTRAL_FILE_FIELDS.length).fields(APPASTRAL_FILE_FIELDS.map((name) => ({ name, maxCount: 1 }))),
  verifyFileContents,
  parseJsonFields(MEMBER_FIELDS),
  sanitizeBody(),
  appAstralRules,
  validate,
  registerAppAstral
);

router.post(
  '/awards/register',
  awardDocumentUpload.any(),
  verifyFileContents,
  parseJsonLikeFields,
  sanitizeBody(),
  awardsRules,
  validate,
  submitAwardApplication
);

router.post(
  '/innothon/register',
  sanitizeBody({ exempt: ['transactionScreenshot'] }),
  innothonRules,
  validate,
  registerInnothon
);

router.post('/patn/register', sanitizeBody(), patnRules, validate, registerPatn);

router.post(
  '/protoplan/register',
  imageUpload().single('screenshot'),
  verifyFileContents,
  parseJsonFields(['projectAbstract', ...MEMBER_FIELDS]),
  sanitizeBody(),
  protoPlanetRules,
  validate,
  registerProtoPlanet
);

export default router;
