import { AppAstralModel } from '../models/appAstralModel.js';
import { AppAstralView } from '../views/appAstralView.js';
import { uploadToCloudinary } from '../../../shared/utils/cloudinary.js';
import { sendConfirmationEmail } from '../../../shared/utils/emailHelper.js';

export class AppAstralController {
  static async register(req, res, next) {
    console.log('=== AppAstral Registration (Microservice) ===');
    try {
      const formData = req.body;
      let screensUrl = null;
      let paymentUrl = null;

      // Parse JSON strings
      try {
        ['member1', 'member2', 'member3'].forEach(m => {
          if (formData[m] && typeof formData[m] === 'string') {
            formData[m] = JSON.parse(formData[m]);
          }
        });
      } catch (e) {
        return AppAstralView.renderValidationError(res, 'Invalid JSON data in form submission');
      }

      // Validate required fields (Team Details + minimum 2 members)
      const requiredFields = ['teamName', 'institutionName', 'cityState'];
      const missingFields = requiredFields.filter(f => !formData[f]);
      if (missingFields.length > 0) {
        return AppAstralView.renderValidationError(res, `Missing required fields: ${missingFields.join(', ')}`);
      }

      if (!formData.member1?.name || !formData.member2?.name) {
        return AppAstralView.renderValidationError(res, 'Team Leader and Member 2 details are required');
      }

      // Optional upload prototype screens to Cloudinary (if provided)
      const screensFile = req.files?.['prototypeScreens']?.[0];
      if (screensFile) {
        console.log('Uploading AppAstral prototype screens to Cloudinary...');
        screensUrl = await uploadToCloudinary(screensFile.buffer, 'innoverse/appastral/designs', screensFile.mimetype);
      }

      // Upload member payment screenshots to Cloudinary
      let member1PaymentUrl = null;
      let member2PaymentUrl = null;
      let member3PaymentUrl = null;

      const m1File = req.files?.['member1Payment']?.[0];
      if (m1File) {
        console.log('Uploading Member 1 payment screenshot to Cloudinary...');
        member1PaymentUrl = await uploadToCloudinary(m1File.buffer, 'innoverse/appastral/payments', m1File.mimetype);
      }

      const m2File = req.files?.['member2Payment']?.[0];
      if (m2File) {
        console.log('Uploading Member 2 payment screenshot to Cloudinary...');
        member2PaymentUrl = await uploadToCloudinary(m2File.buffer, 'innoverse/appastral/payments', m2File.mimetype);
      }

      const m3File = req.files?.['member3Payment']?.[0];
      if (m3File) {
        console.log('Uploading Member 3 payment screenshot to Cloudinary...');
        member3PaymentUrl = await uploadToCloudinary(m3File.buffer, 'innoverse/appastral/payments', m3File.mimetype);
      }

      // Legacy fallback payment file
      const paymentFile = req.files?.['paymentScreenshot']?.[0];
      if (paymentFile) {
        paymentUrl = await uploadToCloudinary(paymentFile.buffer, 'innoverse/appastral/payments', paymentFile.mimetype);
      }

      // Format Entity via Model
      const registrationData = AppAstralModel.formatEntity(formData, {
        screensUrl,
        paymentUrl,
        member1PaymentUrl,
        member2PaymentUrl,
        member3PaymentUrl
      });

      // Save to Firestore via Model
      await AppAstralModel.create(registrationData);
      console.log('AppAstral registration saved to Firestore:', registrationData.registrationId);

      // Send confirmation email asynchronously
      if (registrationData.teamMembers?.leader?.email) {
        sendConfirmationEmail({
          toEmail: registrationData.teamMembers.leader.email,
          leaderName: registrationData.teamMembers.leader.name,
          eventName: 'AppAstral (UI/UX Design Sprint)',
          registrationId: registrationData.registrationId,
          details: [
            { label: 'Team Name', value: registrationData.teamDetails.teamName },
            { label: 'Institution Name', value: registrationData.teamDetails.institutionName },
            { label: 'Accommodation (Leader)', value: registrationData.teamMembers.leader.accommodation === 'yes' ? 'Yes' : 'No' }
          ]
        }).catch(err => console.error('Error sending confirmation email:', err));
      }

      // Render response via View
      return AppAstralView.renderRegistrationSuccess(res, registrationData);

    } catch (error) {
      console.error('AppAstral error:', error);
      next(error);
    }
  }
}
