import { RegistrationModel } from './RegistrationModel.js';
import { createRegistrationId } from '../utils/registrationId.js';
import { buildSection } from '../utils/answers.js';

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

const memberAnswers = (section, member, paymentUrl, accommodationPaymentUrl) => {
  const needsAccommodation = member?.accommodation === 'yes';
  return buildSection(section, [
    ['Full Name', member?.name],
    ['Email ID', member?.email],
    ['Phone Number', member?.phone],
    ['Year & Branch', member?.yearBranch],
    ['Are you an IET Member?', Boolean(member?.isIETMember)],
    member?.isIETMember && ['IET Membership ID', member?.ietMembershipId],
    ['Transaction Reference Number', member?.transactionId],
    ['Upload Transaction Screenshot', paymentUrl],
    ['Accommodation Required?', needsAccommodation],
    needsAccommodation && ['Accommodation Transaction Reference Number', member?.accommodationTransactionId],
    needsAccommodation && ['Upload Accommodation Payment Screenshot', accommodationPaymentUrl],
  ]);
};

export class AppAstralModel extends RegistrationModel {
  static COLLECTION = 'appastral-registrations';

  static formatEntity(formData, urls = {}) {
    const now = new Date().toISOString();
    const termsAccepted = formData.termsAccepted === 'true' || formData.termsAccepted === true;
    return {
      registrationId: createRegistrationId('AA'),
      registrationType: 'appastral',

      answers: [
        ...buildSection('Team Details', [
          ['Team Name', formData.teamName],
          ['Institution Name', formData.institutionName],
          ['City & State', formData.cityState],
        ]),
        ...memberAnswers('Team Leader', formData.member1, urls.member1Payment, urls.member1AccommodationPayment),
        ...memberAnswers('Member 2', formData.member2, urls.member2Payment, urls.member2AccommodationPayment),
        ...(formData.member3?.name
          ? memberAnswers('Member 3', formData.member3, urls.member3Payment, urls.member3AccommodationPayment)
          : []),
        ...buildSection('Declaration', [['I/We agree to the above terms and declarations', termsAccepted]]),
      ],

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

      termsAccepted,
      submittedAt: now,
      status: 'submitted',
      lastUpdated: now,
    };
  }
}
