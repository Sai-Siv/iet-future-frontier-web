import { RegistrationModel } from './RegistrationModel.js';
import { createRegistrationId } from '../utils/registrationId.js';
import { buildSection } from '../utils/answers.js';
import { GENERAL_QUESTIONS, PROFESSIONAL_AWARDS, STUDENT_AWARDS } from '../data/awardForm.js';

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

/** Finds the award the applicant chose, within the category they chose. */
export const findAward = (category, awardTitle) =>
  (category === 'Student' ? STUDENT_AWARDS : category === 'Professional' ? PROFESSIONAL_AWARDS : []).find(
    (award) => award.title === awardTitle
  );

export const isFileQuestion = (award, fieldName) =>
  award.questions.some((question) => question.id === fieldName && question.type === 'File Upload');

/**
 * Answers to the questions this applicant was asked. Anything else is left out, such as
 * answers typed for a different award before they changed their choice.
 */
export const buildAwardAnswers = (formData, uploadedFiles, award) => {
  const category = formData[QUESTION_IDS.category];
  const answerTo = (question) =>
    question.type === 'File Upload' ? uploadedFiles[question.id] : formData[question.id];

  return [
    ...buildSection(
      'General Information',
      GENERAL_QUESTIONS.map(
        (question) =>
          (question.id !== QUESTION_IDS.ietMembershipNumber || formData[QUESTION_IDS.isIETMember] === 'Yes') && [
            question.title,
            answerTo(question),
          ]
      )
    ),
    ...buildSection('Award Category', [[`${category} Awards Category`, award.title]]),
    ...buildSection(award.title, award.questions.map((question) => [question.title, answerTo(question)])),
  ];
};

export class AwardsModel extends RegistrationModel {
  static COLLECTION = 'awards';

  static formatEntity(formData, uploadedFiles, award) {
    const now = new Date().toISOString();
    const category = formData[QUESTION_IDS.category];

    return {
      registrationId: createRegistrationId('AWD'),
      registrationType: 'awards',
      isStudent: category === 'Student',
      isProfessional: category === 'Professional',
      awardCategoryTitle: award.title,
      answers: buildAwardAnswers(formData, uploadedFiles, award),

      // Copied to the top level to make records easier to search.
      name: formData[QUESTION_IDS.name],
      email: formData[QUESTION_IDS.email],
      phone: formData[QUESTION_IDS.phone],
      institution: formData[QUESTION_IDS.institution],

      submittedAt: now,
      status: 'submitted',
      lastUpdated: now,
    };
  }
}
