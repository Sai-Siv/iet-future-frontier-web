import { InnothonModel } from '../models/InnothonModel.js';
import { renderInnothonSuccess } from '../views/registrationViews.js';
import { uploadFile } from '../services/uploadService.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import { HttpError } from '../utils/HttpError.js';
import { IMAGE_TYPES, MAX_FILE_SIZE, matchesFileType } from '../utils/fileTypes.js';

/** This form sends its screenshot as a base64 data URL inside the JSON body. */
const decodeScreenshot = (dataUrl) => {
  const match = typeof dataUrl === 'string' ? dataUrl.match(/^data:(image\/[a-z]+);base64,/) : null;
  if (!match) throw new HttpError(400, 'Payment screenshot is required');

  const [prefix, mimetype] = match;
  if (!IMAGE_TYPES.includes(mimetype)) {
    throw new HttpError(400, 'Only PNG, JPG or JPEG files are allowed.');
  }

  const buffer = Buffer.from(dataUrl.slice(prefix.length), 'base64');
  if (buffer.length > MAX_FILE_SIZE) throw new HttpError(400, 'Each file must be 10 MB or smaller.');
  if (!matchesFileType(buffer, mimetype)) {
    throw new HttpError(400, 'An uploaded file does not match its file type.');
  }
  return buffer;
};

export const registerInnothon = async (req, res, next) => {
  try {
    const screenshot = decodeScreenshot(req.body.transactionScreenshot);
    const screenshotUrl = await uploadFile(screenshot, 'innoverse/innothon/payments');

    const entity = InnothonModel.formatEntity(req.body, screenshotUrl);
    await InnothonModel.create(entity);

    sendConfirmationEmail({
      toEmail: entity.teamMembers.leader.email,
      leaderName: entity.teamMembers.leader.name,
      eventName: 'InnoThon (24-Hour Prototype Hackathon)',
      registrationId: entity.registrationId,
      details: [
        { label: 'Team Name', value: entity.teamDetails.teamName },
        { label: 'Institution Name', value: entity.teamDetails.institutionName },
        { label: 'Problem Statement', value: entity.teamDetails.problemStatement },
        { label: 'Transaction ID', value: entity.paymentDetails.transactionId },
      ],
    });

    return renderInnothonSuccess(res, entity);
  } catch (error) {
    next(error);
  }
};
