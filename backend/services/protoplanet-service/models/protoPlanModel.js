import { db } from '../../../shared/config/firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import crypto from 'crypto';

export class ProtoPlanModel {
  static COLLECTION = 'protoplanet-registrations';

  /**
   * Generates a new registration document payload
   */
  static formatEntity(formData, screenshotUrl) {
    const registrationId = `PP-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    
    return {
      registrationId,
      registrationType: 'protoplanet',

      // Step 1: Team Details
      teamDetails: {
        teamName: formData.teamName,
        institutionName: formData.institutionName,
        cityState: formData.cityState
      },

      // Step 2: Team Members
      teamMembers: {
        leader: {
          name: formData.member1?.name || '',
          email: formData.member1?.email || '',
          phone: formData.member1?.phone || '',
          yearBranch: formData.member1?.yearBranch || '',
          isIETMember: formData.member1?.isIETMember ? 'yes' : 'no',
          ietMembershipId: formData.member1?.ietMembershipId || ''
        },
        member2: formData.member2 || {},
        member3: formData.member3 || {}
      },

      // Step 3: Project / Proposal Details
      projectDetails: {
        projectTitle: formData.projectTitle,
        ...(formData.projectAbstract || {})
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

  /**
   * Persists a ProtoPlanet registration to Firestore
   */
  static async create(registrationData) {
    const docRef = doc(db, this.COLLECTION, registrationData.registrationId);
    await setDoc(docRef, registrationData);
    return registrationData;
  }

  /**
   * Retrieves a ProtoPlanet registration by ID
   */
  static async findById(registrationId) {
    const docSnap = await getDoc(doc(db, this.COLLECTION, registrationId));
    if (!docSnap.exists()) {
      return null;
    }
    return docSnap.data();
  }
}
