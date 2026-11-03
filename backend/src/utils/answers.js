const formatAnswer = (answer) => {
  if (answer === true) return 'Yes';
  if (answer === false) return 'No';
  if (answer === null || answer === undefined) return '';
  if (Array.isArray(answer)) return answer.join(', ');
  if (typeof answer === 'object') return JSON.stringify(answer);
  return String(answer);
};

/**
 * Builds the question and answer entries saved with a registration, worded as on the form.
 * They are stored as a list because several questions share the same wording, and Firestore
 * sorts named fields alphabetically, which would lose the order of the form.
 * Pairs set to null or false are questions the person was not asked, and are left out.
 */
export const buildSection = (section, pairs) =>
  pairs.filter(Boolean).map(([question, answer]) => ({ section, question, answer: formatAnswer(answer) }));
