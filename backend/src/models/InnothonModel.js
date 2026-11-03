import { RegistrationModel } from './RegistrationModel.js';
import { createRegistrationId } from '../utils/registrationId.js';
import { buildSection } from '../utils/answers.js';

const memberAnswers = (section, member) =>
  buildSection(section, [
    ['Full Name', member?.name],
    ['Email', member?.email],
    ['Phone Number', member?.phone],
    ['Role in Team', member?.role],
    ['Department/Branch', member?.department],
    ['Year of Study', member?.year],
    ['LinkedIn Profile', member?.linkedin],
    ['IET Student Member', Boolean(member?.isIETMember)],
    member?.isIETMember && ['IET Membership ID', member?.ietMembershipId],
  ]);

export class InnothonModel extends RegistrationModel {
  static COLLECTION = 'innothon-registrations';

  static formatEntity(formData, screenshotUrl) {
    const now = new Date().toISOString();
    return {
      registrationId: createRegistrationId('INN'),
      registrationType: 'innothon',

      answers: [
        ...buildSection('Team Details', [
          ['Team Name', formData.teamName],
          ['Institution/Organization Name', formData.institutionName],
          ['City & State', formData.cityState],
          ['Preferred Problem Statement', formData.problemStatement],
        ]),
        ...buildSection('Team Leader', [
          ['Full Name', formData.leaderName],
          ['Email', formData.leaderEmail],
          ['Phone Number (WhatsApp)', formData.leaderPhone],
          ['Alternate Email', formData.leaderAltEmail],
          ['IET Student Member', Boolean(formData.leaderIsIETMember)],
          formData.leaderIsIETMember && ['IET Membership ID', formData.leaderIetMembershipId],
        ]),
        ...memberAnswers('Member 2', formData.member2),
        ...(formData.member3?.name ? memberAnswers('Member 3', formData.member3) : []),
        ...(formData.member4?.name ? memberAnswers('Member 4', formData.member4) : []),
        ...buildSection('Additional Information', [
          ['Short Motivation Statement', formData.motivationStatement],
          ['I agree to the rules and terms & conditions', Boolean(formData.termsAccepted)],
          ['I consent to photos/videos for publicity', Boolean(formData.consentAccepted)],
        ]),
        ...buildSection('Payment Details', [
          ['Fee Type', formData.feeType],
          ['Transaction Reference Number', formData.transactionId],
          ['Upload Transaction Screenshot', screenshotUrl],
        ]),
      ],

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
