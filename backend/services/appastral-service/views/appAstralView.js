import { renderSuccess, renderBadRequest } from '../../../shared/views/responseView.js';

export class AppAstralView {
  static renderRegistrationSuccess(res, entity) {
    return renderSuccess(res, 'Registration successful', {
      teamName: entity.teamDetails?.teamName,
      submittedAt: entity.submittedAt
    });
  }

  static renderValidationError(res, message) {
    return renderBadRequest(res, message);
  }
}
