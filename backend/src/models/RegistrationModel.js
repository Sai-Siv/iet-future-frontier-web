import { db } from '../config/firebase.js';

/** Base model: every event stores its registrations in its own Firestore collection. */
export class RegistrationModel {
  static COLLECTION = null;

  static async create(entity) {
    // `create` fails rather than overwriting an existing record.
    await db.collection(this.COLLECTION).doc(entity.registrationId).create(entity);
    return entity;
  }
}
