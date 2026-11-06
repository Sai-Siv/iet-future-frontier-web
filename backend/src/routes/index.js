import { Router } from 'express';
import { imageUpload, awardDocumentUpload, verifyFileContents } from '../middlewares/upload.js';
import { sanitizeBody, parseJsonFields, parseJsonLikeFields } from '../middlewares/sanitizeBody.js';
import { validate } from '../middlewares/validate.js';
import { registrationGate } from '../middlewares/registrationGate.js';
import {
  appAstralRules,
  awardsRules,
  innothonRules,
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
  registrationGate('AppAstral', 'APPASTRAL_REGISTRATION_OPEN'),
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
  registrationGate('Innothon', 'INNOTHON_REGISTRATION_OPEN'),
  sanitizeBody({ exempt: ['transactionScreenshot'] }),
  innothonRules,
  validate,
  registerInnothon
);

router.post('/patn/register', registerPatn);

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
