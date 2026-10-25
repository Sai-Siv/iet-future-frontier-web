import { AwardsModel } from '../models/awardsModel.js';
import { AwardsView } from '../views/awardsView.js';
import { uploadToCloudinary } from '../../../shared/utils/cloudinary.js';
import { sendConfirmationEmail } from '../../../shared/utils/emailHelper.js';

export class AwardsController {
  static async test(req, res) {
    res.json({ message: 'Awards API is working!' });
  }

  static async submitApplication(req, res, next) {
    console.log('=== Awards Application (Microservice) ===');
    try {
      const formData = req.body;
      const files = req.files || [];

      // Parse JSON strings back to objects
      for (const key in formData) {
        try {
          if (typeof formData[key] === 'string' && (formData[key].startsWith('[') || formData[key].startsWith('{'))) {
            formData[key] = JSON.parse(formData[key]);
          }
        } catch (e) {
          // Keep raw string if parsing fails
        }
      }

      // Upload all files concurrently to Cloudinary
      const uploadedFilesMap = {};
      const uploadPromises = files.map(async (file) => {
        console.log(`Uploading file ${file.fieldname} (${file.originalname}) to Cloudinary...`);
        const url = await uploadToCloudinary(file.buffer, 'innoverse/awards/documents', file.mimetype);
        uploadedFilesMap[file.fieldname] = url;
        return url;
      });

      await Promise.all(uploadPromises);

      // Format Entity via Model
      const registrationData = AwardsModel.formatEntity(formData, uploadedFilesMap);

      // Save to Firestore via Model
      await AwardsModel.create(registrationData);
      console.log('Awards registration saved to Firestore:', registrationData.registrationId);

      // Send confirmation email asynchronously
      if (registrationData.email) {
        sendConfirmationEmail(
          registrationData.email,
          registrationData.name,
          registrationData.registrationId,
          'National Innovation Awards'
        ).catch(err => console.error('Failed to send confirmation email:', err));
      }

      // Render response via View
      return AwardsView.renderApplicationSuccess(res, registrationData);

    } catch (error) {
      console.error('Awards Registration Error:', error);
      next(error);
    }
  }
}
