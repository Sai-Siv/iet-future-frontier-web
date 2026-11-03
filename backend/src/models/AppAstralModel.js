import { RegistrationModel } from './RegistrationModel.js';
import { createRegistrationId } from '../utils/registrationId.js';

const formatMember = (member, paymentUrl, accommodationPaymentUrl) => ({
  name: member?.name || '',
  email: member?.email || '',
  phone: member?.phone || '',
  yearBranch: member?.yearBranch || '',
  isIETMember: member?.isIETMember ? 'yes' : 'no',
  ietMembershipId: member?.ietMembershipId || '',
  transactionId: member?.transactionId || '',
  paymentUrl: paymentUrl || '',
  accommodation: member?.accommodation || 'no',
  accommodationTransactionId: member?.accommodationTransactionId || '',
  accommodationPaymentUrl: accommodationPaymentUrl || '',
});

export class AppAstralModel extends RegistrationModel {
  static COLLECTION = 'appastral-registrations';

  static formatEntity(formData, urls = {}) {
    const now = new Date().toISOString();
    return {
      registrationId: createRegistrationId('AA'),
      registrationType: 'appastral',

      teamDetails: {
        teamName: formData.teamName,
        institutionName: formData.institutionName,
        cityState: formData.cityState,
      },

      teamMembers: {
        leader: formatMember(formData.member1, urls.member1Payment, urls.member1AccommodationPayment),
        member2: formatMember(formData.member2, urls.member2Payment, urls.member2AccommodationPayment),
        member3: formData.member3?.name
          ? formatMember(formData.member3, urls.member3Payment, urls.member3AccommodationPayment)
          : null,
      },

      termsAccepted: formData.termsAccepted === 'true' || formData.termsAccepted === true,
      submittedAt: now,
      status: 'submitted',
      lastUpdated: now,
    };
  }
}
