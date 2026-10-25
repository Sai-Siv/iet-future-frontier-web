import { ProtoPlanModel } from '../models/protoPlanModel.js';
import { ProtoPlanView } from '../views/protoPlanView.js';
import { uploadToCloudinary } from '../../../shared/utils/cloudinary.js';
import { sendConfirmationEmail } from '../../../shared/utils/emailHelper.js';

export class ProtoPlanController {
  /**
   * Health/Test endpoint
   */
  static async test(req, res) {
    res.json({ message: 'ProtoPlanet API is working!' });
  }

  /**
   * Handle registration
   */
  static async register(req, res, next) {
    console.log('=== ProtoPlanet Registration (Microservice) ===');
    try {
      const formData = req.body;
      let screenshotUrl = null;

      // Parse JSON strings back to objects
      try {
        if (formData.projectAbstract && typeof formData.projectAbstract === 'string') {
          formData.projectAbstract = JSON.parse(formData.projectAbstract);
        }
        ['member1', 'member2', 'member3'].forEach(m => {
          if (formData[m] && typeof formData[m] === 'string') {
            formData[m] = JSON.parse(formData[m]);
          }
        });
      } catch (e) {
        return ProtoPlanView.renderValidationError(res, 'Invalid JSON data in form submission');
      }

      // Validate required fields
      const requiredFields = ['teamName', 'institutionName', 'cityState', 'projectTitle', 'projectAbstract', 'feeType', 'transactionId'];
      const missingFields = requiredFields.filter(f => !formData[f]);
      if (missingFields.length > 0) {
        return ProtoPlanView.renderValidationError(res, `Missing required fields: ${missingFields.join(', ')}`);
      }

      // Upload screenshot to Cloudinary
      if (req.file) {
        console.log('Uploading payment screenshot to Cloudinary...');
        screenshotUrl = await uploadToCloudinary(req.file.buffer, 'innoverse/protoplanet/payments', req.file.mimetype);
      } else {
        return ProtoPlanView.renderValidationError(res, 'Payment screenshot is required');
      }

      // Format Entity via Model
      const registrationData = ProtoPlanModel.formatEntity(formData, screenshotUrl);

      // Save to Firestore via Model
      await ProtoPlanModel.create(registrationData);
      console.log('ProtoPlanet registration saved:', registrationData.registrationId);

      // Send confirmation email asynchronously
      if (registrationData.teamMembers?.leader?.email) {
        sendConfirmationEmail({
          toEmail: registrationData.teamMembers.leader.email,
          leaderName: registrationData.teamMembers.leader.name,
          eventName: 'ProtoPlanet (Hardware Innovation Sprint)',
          registrationId: registrationData.registrationId,
          details: [
            { label: 'Team Name', value: registrationData.teamDetails.teamName },
            { label: 'Institution Name', value: registrationData.teamDetails.institutionName },
            { label: 'Project Title', value: registrationData.projectDetails.projectTitle },
            { label: 'Transaction ID', value: registrationData.paymentDetails.transactionId }
          ]
        }).catch(err => console.error('Error sending confirmation email:', err));
      }

      // Render response via View
      return ProtoPlanView.renderRegistrationSuccess(res, registrationData);

    } catch (error) {
      console.error('ProtoPlanet error:', error);
      next(error);
    }
  }

  /**
   * Check registration status
   */
  static async getStatus(req, res, next) {
    try {
      const entity = await ProtoPlanModel.findById(req.params.registrationId);
      return ProtoPlanView.renderStatus(res, entity);
    } catch (error) {
      console.error('Failed to check status:', error);
      next(error);
    }
  }
}
