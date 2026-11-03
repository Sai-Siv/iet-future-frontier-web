import { AwardsModel } from '../models/AwardsModel.js';
import { renderAwardsSuccess } from '../views/registrationViews.js';
import { uploadFile } from '../services/uploadService.js';
import { sendConfirmationEmail } from '../services/emailService.js';

export const submitAwardApplication = async (req, res, next) => {
  try {
    const uploadedFiles = {};
    await Promise.all(
      (req.files || []).map(async (file) => {
        uploadedFiles[file.fieldname] = await uploadFile(file.buffer, 'innoverse/awards/documents');
      })
    );

    const entity = AwardsModel.formatEntity(req.body, uploadedFiles);
    await AwardsModel.create(entity);

    if (entity.email) {
      sendConfirmationEmail({
        toEmail: entity.email,
        leaderName: entity.name,
        eventName: 'National Innovation Awards',
        registrationId: entity.registrationId,
      });
    }

    return renderAwardsSuccess(res, entity);
  } catch (error) {
    next(error);
  }
};
