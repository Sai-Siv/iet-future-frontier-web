import { StartupSphereModel } from '../models/startupSphereModel.js';
import { StartupSphereView } from '../views/startupSphereView.js';
import { uploadToCloudinary } from '../../../shared/utils/cloudinary.js';
import { sendConfirmationEmail } from '../../../shared/utils/emailHelper.js';

export class StartupSphereController {
  static async register(req, res, next) {
    console.log('=== StartupSphere Registration (Microservice) ===');
    try {
      const formData = req.body;
      let screenshotUrl = null;

      // Validate required fields
      const requiredFields = ['teamName', 'institutionName', 'cityState', 'feeType', 'transactionId'];
      const missingFields = requiredFields.filter(f => !formData[f]);
      if (missingFields.length > 0) {
        return StartupSphereView.renderValidationError(res, `Missing required fields: ${missingFields.join(', ')}`);
      }

      // Process Base64 screenshot → upload to Cloudinary
      if (formData.transactionScreenshot && formData.transactionScreenshot.startsWith('data:image')) {
        console.log('Uploading StartupSphere payment screenshot to Cloudinary...');
        const base64Data = formData.transactionScreenshot.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const mimeMatch = formData.transactionScreenshot.match(/^data:(image\/\w+);base64,/);
        const mimetype = mimeMatch ? mimeMatch[1] : 'image/png';
        screenshotUrl = await uploadToCloudinary(buffer, 'innoverse/startupsphere/payments', mimetype);
      }

      // Format Entity via Model
      const registrationData = StartupSphereModel.formatEntity(formData, screenshotUrl);

      // Save to Firestore via Model
      await StartupSphereModel.create(registrationData);
      console.log('StartupSphere registration saved to Firestore:', registrationData.registrationId);

      // Send confirmation email asynchronously
      if (registrationData.teamMembers?.leader?.email) {
        sendConfirmationEmail({
          toEmail: registrationData.teamMembers.leader.email,
          leaderName: registrationData.teamMembers.leader.name,
          eventName: 'StartupSphere (Pitching & Business Plan)',
          registrationId: registrationData.registrationId,
          details: [
            { label: 'Team Name', value: registrationData.teamDetails.teamName },
            { label: 'Institution Name', value: registrationData.teamDetails.institutionName },
            { label: 'Startup Title', value: registrationData.startupDetails.startupTitle || 'N/A' },
            { label: 'Transaction ID', value: registrationData.paymentDetails.transactionId }
          ]
        }).catch(err => console.error('Error sending confirmation email:', err));
      }

      // Render response via View
      return StartupSphereView.renderRegistrationSuccess(res, registrationData);

    } catch (error) {
      console.error('StartupSphere error:', error);
      next(error);
    }
  }
}
