import { db } from '../../../shared/config/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import crypto from 'crypto';

export class AwardsModel {
  static COLLECTION = 'awards';

  static formatEntity(formData, uploadedFilesMap) {
    const registrationId = `AWD-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    
    // Combine text fields and file URLs
    const combinedData = { ...formData, ...uploadedFilesMap };

    const registrationData = {
      registrationId,
      registrationType: 'awards',
      isStudent: formData.isStudent === 'true' || formData.isStudent === true,
      isProfessional: formData.isProfessional === 'true' || formData.isProfessional === true,
      awardCategoryTitle: formData.awardCategoryTitle || 'Unknown',
      responses: combinedData,

      // Standard field extraction for searchability
      name: formData['1508358313'] || formData.name || 'Unknown',
      email: formData['6064807'] || formData.email || '',
      phone: formData['952420036'] || formData.phone || '',
      institution: formData['384312110'] || formData.institution || '',

      submittedAt: new Date().toISOString(),
      status: 'submitted',
      lastUpdated: new Date().toISOString()
    };

    delete registrationData.responses.isStudent;
    delete registrationData.responses.isProfessional;
    delete registrationData.responses.awardCategoryTitle;

    return registrationData;
  }

  static async create(entity) {
    const docRef = doc(db, this.COLLECTION, entity.registrationId);
    await setDoc(docRef, entity);
    return entity;
  }
}
