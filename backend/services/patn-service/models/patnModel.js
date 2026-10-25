import { db } from '../../../shared/config/firebase.js';
import { collection, query, where, getDocs, doc, setDoc, orderBy } from 'firebase/firestore';

export class PatnModel {
  static COLLECTION = 'patn-registrations';

  /**
   * Check if email already exists
   */
  static async existsByEmail(emailAddress) {
    const patnCollection = collection(db, this.COLLECTION);
    const q = query(patnCollection, where('participantDetails.emailAddress', '==', emailAddress));
    const querySnapshot = await getDocs(q);
    
    // Also check legacy root level field if present
    if (!querySnapshot.empty) return true;
    const legacyQ = query(patnCollection, where('emailAddress', '==', emailAddress));
    const legacySnap = await getDocs(legacyQ);
    return !legacySnap.empty;
  }

  /**
   * Format entity structure
   */
  static formatEntity(body) {
    const registrationId = `PATN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
      registrationId,
      registrationType: 'patn',

      // Step 1: Participant Details
      participantDetails: {
        title: body.title,
        fullName: body.fullName,
        department: body.department,
        institutionName: body.institutionName || body.instituteName,
        isIETMember: body.isIETMember,
        mobileNumber: body.mobileNumber,
        emailAddress: body.emailAddress
      },

      // Step 2: Presentation Details
      presentationDetails: {
        youtubeLink: body.youtubeLink
      },

      // Metadata
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Save registration
   */
  static async create(entity) {
    const docRef = doc(db, this.COLLECTION, entity.registrationId);
    await setDoc(docRef, entity);
    return entity;
  }

  /**
   * Retrieve all registrations (ordered by submittedAt desc)
   */
  static async findAll() {
    const patnCollection = collection(db, this.COLLECTION);
    const q = query(patnCollection, orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const registrations = [];
    querySnapshot.forEach(docSnapshot => {
      registrations.push(docSnapshot.data());
    });
    return registrations;
  }
}
