import { InnothonModel } from '../models/innothonModel.js';
import { InnothonView } from '../views/innothonView.js';
import { uploadToCloudinary } from '../../../shared/utils/cloudinary.js';
import { sendConfirmationEmail } from '../../../shared/utils/emailHelper.js';

export class InnothonController {
  static async register(req, res, next) {
    console.log('=== Innothon Registration (Microservice) ===');
    try {
      const formData = req.body;
      let screenshotUrl = null;

      // Validate required fields
      const requiredFields = [
        'teamName', 
        'institutionName', 
        'cityState', 
        'problemStatement', 
        'leaderName', 
        'leaderEmail', 
        'leaderPhone',
        'motivationStatement',
        'feeType', 
        'transactionId'
      ];
      
      const missingFields = requiredFields.filter(f => !formData[f]);
      if (missingFields.length > 0) {
        return InnothonView.renderValidationError(res, `Missing required fields: ${missingFields.join(', ')}`);
      }

      // Process Base64 screenshot → upload to Cloudinary
      if (formData.transactionScreenshot && formData.transactionScreenshot.startsWith('data:image')) {
        console.log('Uploading Innothon payment screenshot to Cloudinary...');
        try {
          const base64Data = formData.transactionScreenshot.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          const mimeMatch = formData.transactionScreenshot.match(/^data:(image\/\w+);base64,/);
          const mimetype = mimeMatch ? mimeMatch[1] : 'image/png';
          screenshotUrl = await uploadToCloudinary(buffer, 'innoverse/innothon/payments', mimetype);
        } catch (err) {
          console.error('Base64 upload failed:', err);
          return res.status(500).json({ success: false, message: 'Failed to save payment receipt' });
        }
      } else {
        return InnothonView.renderValidationError(res, 'Payment screenshot is required');
      }

      // Format Entity via Model
      const registrationData = InnothonModel.formatEntity(formData, screenshotUrl);

      // Save to Firestore via Model
      await InnothonModel.create(registrationData);
      console.log('Innothon registration saved successfully:', registrationData.registrationId);

      // Send confirmation email asynchronously
      if (registrationData.teamMembers?.leader?.email) {
        sendConfirmationEmail({
          toEmail: registrationData.teamMembers.leader.email,
          leaderName: registrationData.teamMembers.leader.name,
          eventName: 'InnoThon (24-Hour Prototype Hackathon)',
          registrationId: registrationData.registrationId,
          details: [
            { label: 'Team Name', value: registrationData.teamDetails.teamName },
            { label: 'Institution Name', value: registrationData.teamDetails.institutionName },
            { label: 'Problem Statement', value: registrationData.teamDetails.problemStatement },
            { label: 'Transaction ID', value: registrationData.paymentDetails.transactionId }
          ]
        }).catch(err => console.error('Error sending confirmation email:', err));
      }

      // Render response via View
      return InnothonView.renderRegistrationSuccess(res, registrationData);

    } catch (error) {
      console.error('Innothon registration error:', error);
      next(error);
    }
  }

  static async getStatus(req, res, next) {
    try {
      const data = await InnothonModel.findById(req.params.registrationId);
      return InnothonView.renderStatus(res, data);
    } catch (error) {
      console.error('Failed to retrieve status:', error);
      next(error);
    }
  }
}
