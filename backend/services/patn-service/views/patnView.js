import { renderSuccess, renderCreated, renderBadRequest } from '../../../shared/views/responseView.js';

export class PatnView {
  static renderCreated(res, entity) {
    return renderCreated(res, 'Registration successful', {
      registrationId: entity.registrationId,
      email: entity.participantDetails?.emailAddress
    });
  }

  static renderList(res, registrations) {
    return renderSuccess(res, 'Registrations retrieved successfully', registrations);
  }

  static renderValidationError(res, message) {
    return renderBadRequest(res, message);
  }
}
