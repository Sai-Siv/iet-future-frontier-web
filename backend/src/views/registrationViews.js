import { renderSuccess } from './responseView.js';

// These control exactly what a registrant gets back. Nothing else from the stored
// record is returned, so a response can never leak payment or other members' data.

export const renderAppAstralSuccess = (res, entity) =>
  renderSuccess(res, 'Registration successful', {
    teamName: entity.teamDetails?.teamName,
    submittedAt: entity.submittedAt,
  });

export const renderProtoPlanetSuccess = renderAppAstralSuccess;

export const renderInnothonSuccess = (res, entity) =>
  renderSuccess(res, 'Registration successful', {
    registrationId: entity.registrationId,
    teamName: entity.teamDetails?.teamName,
    leaderName: entity.teamMembers?.leader?.name,
    email: entity.teamMembers?.leader?.email,
    submittedAt: entity.submittedAt,
  });

export const renderAwardsSuccess = (res, entity) =>
  renderSuccess(res, 'Application submitted successfully', { registrationId: entity.registrationId });
