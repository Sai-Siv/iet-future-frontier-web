import { renderSuccess, renderNotFound, renderBadRequest } from '../../../shared/views/responseView.js';

export class InnothonView {
  static renderRegistrationSuccess(res, entity) {
    return renderSuccess(res, 'Registration successful', {
      registrationId: entity.registrationId,
      teamName: entity.teamDetails?.teamName,
      leaderName: entity.teamMembers?.leader?.name,
      email: entity.teamMembers?.leader?.email,
      submittedAt: entity.submittedAt
    });
  }

  static renderStatus(res, entity) {
    if (!entity) {
      return renderNotFound(res, 'Registration not found');
    }
    return renderSuccess(res, 'Registration details retrieved successfully', entity);
  }

  static renderValidationError(res, message) {
    return renderBadRequest(res, message);
  }
}
