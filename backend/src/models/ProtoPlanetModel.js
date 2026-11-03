import { RegistrationModel } from './RegistrationModel.js';
import { createRegistrationId } from '../utils/registrationId.js';
import { buildSection } from '../utils/answers.js';

const memberAnswers = (section, member) =>
  buildSection(section, [
    ['Full Name', member?.name],
    ['Email ID', member?.email],
    ['Phone Number', member?.phone],
    ['Year & Branch', member?.yearBranch],
    ['IET Student Member', Boolean(member?.isIETMember)],
    member?.isIETMember && ['IET Membership ID', member?.ietMembershipId],
  ]);

export class ProtoPlanetModel extends RegistrationModel {
  static COLLECTION = 'protoplanet-registrations';

  static formatEntity(formData, screenshotUrl) {
    const now = new Date().toISOString();
    const project = formData.projectAbstract || {};
    return {
      registrationId: createRegistrationId('PP'),
      registrationType: 'protoplanet',

      answers: [
        ...buildSection('Team Details', [
          ['Team Name', formData.teamName],
          ['Institution Name', formData.institutionName],
          ['City & State', formData.cityState],
        ]),
        ...memberAnswers('Team Leader', formData.member1),
        ...memberAnswers('Member 2', formData.member2),
        ...(formData.member3?.name ? memberAnswers('Member 3', formData.member3) : []),
        ...buildSection('Project Details', [
          ['Select Your Track', project.track],
          ['Project Title', formData.projectTitle],
          ['Problem Statement', project.problemStatement],
          ['Proposed Solution', project.proposedSolution],
          ['Basic System Architecture', project.systemArchitecture],
          ['Expected Technological and Social Impact', project.technologicalImpact],
        ]),
        ...buildSection('Payment Details', [
          ['Fee Type', formData.feeType],
          ['Transaction Reference Number', formData.transactionId],
          ['Upload Transaction Screenshot', screenshotUrl],
        ]),
        ...buildSection('Declaration', [
          ['I/We agree to the above terms and conditions', formData.termsAccepted === 'true'],
        ]),
      ],

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
        ...project,
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
