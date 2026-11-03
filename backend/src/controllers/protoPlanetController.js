import { ProtoPlanetModel } from '../models/ProtoPlanetModel.js';
import { renderProtoPlanetSuccess } from '../views/registrationViews.js';
import { uploadFile } from '../services/uploadService.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import { HttpError } from '../utils/HttpError.js';

export const registerProtoPlanet = async (req, res, next) => {
  try {
    if (!req.file) throw new HttpError(400, 'Payment screenshot is required');

    const screenshotUrl = await uploadFile(req.file.buffer, 'innoverse/protoplanet/payments');

    const entity = ProtoPlanetModel.formatEntity(req.body, screenshotUrl);
    await ProtoPlanetModel.create(entity);

    const leader = entity.teamMembers.leader;
    if (leader.email) {
      sendConfirmationEmail({
        toEmail: leader.email,
        leaderName: leader.name,
        eventName: 'ProtoPlanet (Hardware Innovation Sprint)',
        registrationId: entity.registrationId,
        details: [
          { label: 'Team Name', value: entity.teamDetails.teamName },
          { label: 'Institution Name', value: entity.teamDetails.institutionName },
          { label: 'Project Title', value: entity.projectDetails.projectTitle },
          { label: 'Transaction ID', value: entity.paymentDetails.transactionId },
        ],
      });
    }

    return renderProtoPlanetSuccess(res, entity);
  } catch (error) {
    next(error);
  }
};
