import { db } from '../../../shared/config/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import crypto from 'crypto';

export class AppAstralModel {
  static COLLECTION = 'appastral-registrations';

  static formatEntity(formData, {
    member1PaymentUrl = null,
    member2PaymentUrl = null,
    member3PaymentUrl = null,
    member1AccommodationPaymentUrl = null,
    member2AccommodationPaymentUrl = null,
    member3AccommodationPaymentUrl = null
  } = {}) {
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
          transactionId: formData.member1?.transactionId || '',
          paymentUrl: member1PaymentUrl || '',
          accommodation: formData.member1?.accommodation || 'no',
          accommodationTransactionId: formData.member1?.accommodationTransactionId || '',
          accommodationPaymentUrl: member1AccommodationPaymentUrl || ''
        },
        member2: {
          name: formData.member2?.name || '',
          email: formData.member2?.email || '',
          phone: formData.member2?.phone || '',
          yearBranch: formData.member2?.yearBranch || '',
          isIETMember: formData.member2?.isIETMember ? 'yes' : 'no',
          ietMembershipId: formData.member2?.ietMembershipId || '',
          transactionId: formData.member2?.transactionId || '',
          paymentUrl: member2PaymentUrl || '',
          accommodation: formData.member2?.accommodation || 'no',
          accommodationTransactionId: formData.member2?.accommodationTransactionId || '',
          accommodationPaymentUrl: member2AccommodationPaymentUrl || ''
        },
        member3: formData.member3?.name ? {
          name: formData.member3.name,
          email: formData.member3.email || '',
          phone: formData.member3.phone || '',
          yearBranch: formData.member3.yearBranch || '',
          isIETMember: formData.member3.isIETMember ? 'yes' : 'no',
          ietMembershipId: formData.member3.ietMembershipId || '',
          transactionId: formData.member3.transactionId || '',
          paymentUrl: member3PaymentUrl || '',
          accommodation: formData.member3.accommodation || 'no',
          accommodationTransactionId: formData.member3.accommodationTransactionId || '',
          accommodationPaymentUrl: member3AccommodationPaymentUrl || ''
        } : null
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
