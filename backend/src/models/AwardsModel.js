import { RegistrationModel } from './RegistrationModel.js';
import { createRegistrationId } from '../utils/registrationId.js';

// Award questions are identified by numeric IDs from the application form.
export const QUESTION_IDS = {
  name: '1508358313',
  email: '6064807',
  state: '62587424',
  phone: '952420036',
  institution: '384312110',
  isIETMember: '1622581677',
  ietMembershipNumber: '1608733035',
  category: '1063768476',
};

export class AwardsModel extends RegistrationModel {
  static COLLECTION = 'awards';

  static formatEntity(formData, uploadedFiles) {
    const now = new Date().toISOString();
    const { isStudent, isProfessional, awardCategoryTitle, ...answers } = formData;

    return {
      registrationId: createRegistrationId('AWD'),
      registrationType: 'awards',
      isStudent: isStudent === 'true' || isStudent === true,
      isProfessional: isProfessional === 'true' || isProfessional === true,
      awardCategoryTitle: awardCategoryTitle || 'Unknown',
      responses: { ...answers, ...uploadedFiles },

      // Copied to the top level to make records easier to search.
      name: formData[QUESTION_IDS.name] || 'Unknown',
      email: formData[QUESTION_IDS.email] || '',
      phone: formData[QUESTION_IDS.phone] || '',
      institution: formData[QUESTION_IDS.institution] || '',

      submittedAt: now,
      status: 'submitted',
      lastUpdated: now,
    };
  }
}
