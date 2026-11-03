import { PatnModel } from '../models/PatnModel.js';
import { renderPatnSuccess } from '../views/registrationViews.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import { HttpError } from '../utils/HttpError.js';

export const registerPatn = async (req, res, next) => {
  try {
    if (await PatnModel.existsByEmail(req.body.emailAddress)) {
      throw new HttpError(400, 'This email address is already registered');
    }

    const entity = PatnModel.formatEntity(req.body);
    await PatnModel.create(entity);

    const participant = entity.participantDetails;
    sendConfirmationEmail({
      toEmail: participant.emailAddress,
      leaderName: participant.fullName,
      eventName: 'PATN (Present Around The Network)',
      registrationId: entity.registrationId,
      details: [
        { label: 'Department', value: participant.department },
        { label: 'Institution Name', value: participant.institutionName },
      ],
    });

    return renderPatnSuccess(res, entity);
  } catch (error) {
    next(error);
  }
};
