import { RegistrationModel } from './RegistrationModel.js';
import { db } from '../config/firebase.js';
import { createRegistrationId } from '../utils/registrationId.js';

export class PatnModel extends RegistrationModel {
  static COLLECTION = 'patn-registrations';

  static async existsByEmail(emailAddress) {
    const registrations = db.collection(this.COLLECTION);
    const current = await registrations.where('participantDetails.emailAddress', '==', emailAddress).limit(1).get();
    if (!current.empty) return true;

    // Older records store the email at the top level.
    const legacy = await registrations.where('emailAddress', '==', emailAddress).limit(1).get();
    return !legacy.empty;
  }

  static formatEntity(body) {
    const now = new Date().toISOString();
    return {
      registrationId: createRegistrationId('PATN'),
      registrationType: 'patn',

      participantDetails: {
        title: body.title,
        fullName: body.fullName,
        department: body.department,
        institutionName: body.institutionName,
        isIETMember: body.isIETMember,
        mobileNumber: body.mobileNumber,
        emailAddress: body.emailAddress,
      },

      presentationDetails: {
        youtubeLink: body.youtubeLink,
      },

      status: 'submitted',
      submittedAt: now,
      lastUpdated: now,
    };
  }
}
