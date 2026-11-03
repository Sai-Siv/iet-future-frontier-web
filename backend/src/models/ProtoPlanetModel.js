import { RegistrationModel } from './RegistrationModel.js';
import { createRegistrationId } from '../utils/registrationId.js';

export class ProtoPlanetModel extends RegistrationModel {
  static COLLECTION = 'protoplanet-registrations';

  static formatEntity(formData, screenshotUrl) {
    const now = new Date().toISOString();
    return {
      registrationId: createRegistrationId('PP'),
      registrationType: 'protoplanet',

      teamDetails: {
        teamName: formData.teamName,
        institutionName: formData.institutionName,
        cityState: formData.cityState,
      },

      teamMembers: {
        leader: {
          name: formData.member1?.name || '',
          email: formData.member1?.email || '',
          phone: formData.member1?.phone || '',
          yearBranch: formData.member1?.yearBranch || '',
          isIETMember: formData.member1?.isIETMember ? 'yes' : 'no',
          ietMembershipId: formData.member1?.ietMembershipId || '',
        },
        member2: formData.member2 || {},
        member3: formData.member3 || {},
      },

      projectDetails: {
        ...(formData.projectAbstract || {}),
        projectTitle: formData.projectTitle,
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
