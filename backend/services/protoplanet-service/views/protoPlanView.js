import { renderSuccess, renderNotFound, renderBadRequest } from '../../../shared/views/responseView.js';

export class ProtoPlanView {
  static renderRegistrationSuccess(res, entity) {
    return renderSuccess(res, 'Registration successful', {
      teamName: entity.teamDetails?.teamName,
      submittedAt: entity.submittedAt
    }, 200);
  }

  static renderStatus(res, entity) {
    if (!entity) {
      return renderNotFound(res, 'Registration not found');
    }
    return renderSuccess(res, 'Status retrieved successfully', {
      registrationId: entity.registrationId,
      teamName: entity.teamDetails?.teamName || entity.teamName,
      status: entity.status,
      submittedAt: entity.submittedAt
    });
  }

  static renderValidationError(res, message) {
    return renderBadRequest(res, message);
  }
}
