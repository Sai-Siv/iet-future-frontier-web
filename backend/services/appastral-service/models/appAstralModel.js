import { db } from '../../../shared/config/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import crypto from 'crypto';

export class AppAstralModel {
  static COLLECTION = 'appastral-registrations';

  static formatEntity(formData, { screensUrl = null, paymentUrl = null, member1PaymentUrl = null, member2PaymentUrl = null, member3PaymentUrl = null } = {}) {
    const registrationId = `AA-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    return {
      registrationId,
      registrationType: 'appastral',

      // Step 1: Team Details
      teamDetails: {
        teamName: formData.teamName,
        institutionName: formData.institutionName,
        cityState: formData.cityState
      },

      // Step 2: Team Members with Individual Payment & Accommodation Details
      teamMembers: {
        leader: {
          name: formData.member1?.name || '',
          email: formData.member1?.email || '',
          phone: formData.member1?.phone || '',
          yearBranch: formData.member1?.yearBranch || '',
          isIETMember: formData.member1?.isIETMember ? 'yes' : 'no',
          ietMembershipId: formData.member1?.ietMembershipId || '',
          accommodation: formData.member1?.accommodation || 'no',
          transactionId: formData.member1?.transactionId || '',
          paymentUrl: member1PaymentUrl || paymentUrl || ''
        },
        member2: {
          name: formData.member2?.name || '',
          email: formData.member2?.email || '',
          phone: formData.member2?.phone || '',
          yearBranch: formData.member2?.yearBranch || '',
          isIETMember: formData.member2?.isIETMember ? 'yes' : 'no',
          ietMembershipId: formData.member2?.ietMembershipId || '',
          accommodation: formData.member2?.accommodation || 'no',
          transactionId: formData.member2?.transactionId || '',
          paymentUrl: member2PaymentUrl || ''
        },
        member3: formData.member3?.name ? {
          name: formData.member3.name,
          email: formData.member3.email || '',
          phone: formData.member3.phone || '',
          yearBranch: formData.member3.yearBranch || '',
          isIETMember: formData.member3.isIETMember ? 'yes' : 'no',
          ietMembershipId: formData.member3.ietMembershipId || '',
          accommodation: formData.member3.accommodation || 'no',
          transactionId: formData.member3.transactionId || '',
          paymentUrl: member3PaymentUrl || ''
        } : null
      },

      // Prototype / Project Details (optional if provided)
      prototypeDetails: {
        prototypeTool: formData.prototypeTool || '',
        otherTool: formData.otherTool || '',
        prototypeLink: formData.prototypeLink || '',
        appSyncDescription: formData.appSyncDescription || '',
        additionalNotes: formData.additionalNotes || '',
        screensUrl
      },

      // Payment Details summary
      paymentDetails: {
        feeType: formData.feeType || 'per-member',
        transactionId: formData.transactionId || formData.member1?.transactionId || '',
        screenshotUrl: paymentUrl || member1PaymentUrl || ''
      },

      // Metadata
      termsAccepted: formData.termsAccepted === 'true' || formData.termsAccepted === true,
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
