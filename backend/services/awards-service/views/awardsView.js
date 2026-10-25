import { renderSuccess } from '../../../shared/views/responseView.js';

export class AwardsView {
  static renderApplicationSuccess(res, entity) {
    return renderSuccess(res, 'Application submitted successfully', {
      registrationId: entity.registrationId
    });
  }
}
