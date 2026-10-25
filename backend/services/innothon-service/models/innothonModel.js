import { db } from '../../../shared/config/firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export class InnothonModel {
  static COLLECTION = 'innothon-registrations';

  static formatEntity(formData, screenshotUrl) {
    const registrationId = `INN-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    return {
      registrationId,
      registrationType: 'innothon',

      // Step 1: Team Details
      teamDetails: {
        teamName: formData.teamName,
        institutionName: formData.institutionName,
        cityState: formData.cityState,
        problemStatement: formData.problemStatement
      },

      // Step 2: Team Members
      teamMembers: {
        leader: {
          name: formData.leaderName,
          email: formData.leaderEmail,
          phone: formData.leaderPhone,
          altEmail: formData.leaderAltEmail || '',
          isIETMember: formData.leaderIsIETMember ? 'yes' : 'no',
          ietMembershipId: formData.leaderIetMembershipId || ''
        },
        member2: formData.member2 || {},
        member3: formData.member3 || {},
        member4: formData.member4 || {}
      },

      // Step 3: Additional Information
      additionalInfo: {
        motivationStatement: formData.motivationStatement
      },

      // Step 4: Payment Details
      paymentDetails: {
        feeType: formData.feeType,
        transactionId: formData.transactionId,
        screenshotUrl
      },

      // Metadata
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      lastUpdated: new Date().toISOString()
    };
  }

  static async create(entity) {
    const docRef = doc(db, this.COLLECTION, entity.registrationId);
    await setDoc(docRef, entity);
    return entity;
  }

  static async findById(registrationId) {
    const docSnap = await getDoc(doc(db, this.COLLECTION, registrationId));
    if (!docSnap.exists()) {
      return null;
    }
    return docSnap.data();
  }
}
