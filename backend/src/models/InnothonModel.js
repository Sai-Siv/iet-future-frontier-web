import { RegistrationModel } from './RegistrationModel.js';
import { createRegistrationId } from '../utils/registrationId.js';

export class InnothonModel extends RegistrationModel {
  static COLLECTION = 'innothon-registrations';

  static formatEntity(formData, screenshotUrl) {
    const now = new Date().toISOString();
    return {
      registrationId: createRegistrationId('INN'),
      registrationType: 'innothon',

      teamDetails: {
        teamName: formData.teamName,
        institutionName: formData.institutionName,
        cityState: formData.cityState,
        problemStatement: formData.problemStatement,
      },

      teamMembers: {
        leader: {
          name: formData.leaderName,
          email: formData.leaderEmail,
          phone: formData.leaderPhone,
          altEmail: formData.leaderAltEmail || '',
          isIETMember: formData.leaderIsIETMember ? 'yes' : 'no',
          ietMembershipId: formData.leaderIetMembershipId || '',
        },
        member2: formData.member2 || {},
        member3: formData.member3 || {},
        member4: formData.member4 || {},
      },

      additionalInfo: {
        motivationStatement: formData.motivationStatement,
      },

      paymentDetails: {
        feeType: formData.feeType,
        transactionId: formData.transactionId,
        screenshotUrl,
      },

      submittedAt: now,
      status: 'submitted',
      lastUpdated: now,
    };
  }
}
