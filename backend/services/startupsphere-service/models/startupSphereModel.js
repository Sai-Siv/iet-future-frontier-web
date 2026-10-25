import { db } from '../../../shared/config/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import crypto from 'crypto';

export class StartupSphereModel {
  static COLLECTION = 'startupsphere-registrations';

  static formatEntity(formData, screenshotUrl) {
    const registrationId = `SS-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    return {
      registrationId,
      registrationType: 'startupsphere',

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

      // Step 3: Startup Details
      startupDetails: {
        track: formData.track || '',
        startupTitle: formData.startupTitle || '',
        problemStatement: formData.problemStatement || '',
        proposedSolution: formData.proposedSolution || '',
        businessModel: formData.businessModel || '',
        marketOpportunity: formData.marketOpportunity || '',
        goToMarketStrategy: formData.goToMarketStrategy || '',
        expectedImpact: formData.expectedImpact || ''
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
}
