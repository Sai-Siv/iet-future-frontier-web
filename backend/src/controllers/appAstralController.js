import { AppAstralModel } from '../models/AppAstralModel.js';
import { renderAppAstralSuccess } from '../views/registrationViews.js';
import { uploadFile } from '../services/uploadService.js';
import { sendConfirmationEmail } from '../services/emailService.js';

const FOLDER_FOR_FIELD = {
  member1Payment: 'innoverse/appastral/payments',
  member2Payment: 'innoverse/appastral/payments',
  member3Payment: 'innoverse/appastral/payments',
  member1AccommodationPayment: 'innoverse/appastral/accommodation',
  member2AccommodationPayment: 'innoverse/appastral/accommodation',
  member3AccommodationPayment: 'innoverse/appastral/accommodation',
};

export const APPASTRAL_FILE_FIELDS = Object.keys(FOLDER_FOR_FIELD);

export const registerAppAstral = async (req, res, next) => {
  try {
    const urls = {};
    await Promise.all(
      APPASTRAL_FILE_FIELDS.map(async (field) => {
        const file = req.files?.[field]?.[0];
        if (file) urls[field] = await uploadFile(file.buffer, FOLDER_FOR_FIELD[field]);
      })
    );

    const entity = AppAstralModel.formatEntity(req.body, urls);
    await AppAstralModel.create(entity);

    const leader = entity.teamMembers.leader;
    if (leader.email) {
      sendConfirmationEmail({
        toEmail: leader.email,
        leaderName: leader.name,
        eventName: 'AppAstral (UI/UX Design Sprint)',
        registrationId: entity.registrationId,
        details: [
          { label: 'Team Name', value: entity.teamDetails.teamName },
          { label: 'Institution Name', value: entity.teamDetails.institutionName },
          { label: 'Accommodation (Leader)', value: leader.accommodation === 'yes' ? 'Yes' : 'No' },
        ],
      });
    }

    return renderAppAstralSuccess(res, entity);
  } catch (error) {
    next(error);
  }
};
