import { PatnModel } from '../models/patnModel.js';
import { PatnView } from '../views/patnView.js';
import { sendConfirmationEmail } from '../../../shared/utils/emailHelper.js';

export class PatnController {
  /**
   * Register participant
   */
  static async register(req, res, next) {
    try {
      console.log('Received PATN registration data (Microservice):', req.body);

      // Normalize naming differences
      req.body.institutionName = req.body.institutionName || req.body.instituteName;

      // Validate required fields
      const requiredFields = [
        'title',
        'fullName',
        'department',
        'institutionName',
        'isIETMember',
        'mobileNumber',
        'emailAddress',
        'youtubeLink'
      ];

      const missingFields = requiredFields.filter(field => !req.body[field]);
      if (missingFields.length > 0) {
        return PatnView.renderValidationError(res, `Missing required fields: ${missingFields.join(', ')}`);
      }

      // Check if email already registered via Model
      const emailExists = await PatnModel.existsByEmail(req.body.emailAddress);
      if (emailExists) {
        return PatnView.renderValidationError(res, 'This email address is already registered');
      }

      // Prepare entity via Model
      const registrationData = PatnModel.formatEntity(req.body);

      // Save to Firestore via Model
      await PatnModel.create(registrationData);
      console.log('PATN Registration saved successfully in Firestore:', registrationData.registrationId);

      // Send confirmation email asynchronously
      sendConfirmationEmail({
        toEmail: req.body.emailAddress,
        leaderName: req.body.fullName,
        eventName: 'PATN (Present Around The Network)',
        registrationId: registrationData.registrationId,
        details: [
          { label: 'Department', value: req.body.department },
          { label: 'Institution Name', value: req.body.institutionName }
        ]
      }).catch(err => console.error('Error sending confirmation email:', err));

      // Render response via View
      return PatnView.renderCreated(res, registrationData);

    } catch (error) {
      console.error('PATN Registration error:', error);
      next(error);
    }
  }

  /**
   * Get all registrations (admin query)
   */
  static async getAllRegistrations(req, res, next) {
    try {
      const registrations = await PatnModel.findAll();
      return PatnView.renderList(res, registrations);
    } catch (error) {
      console.error('Error fetching PATN registrations:', error);
      next(error);
    }
  }
}
