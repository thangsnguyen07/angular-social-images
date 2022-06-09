import { DocumentReference } from '@angular/fire/compat/firestore';

export const userIdFromUserRef = (userRef: DocumentReference<any>): string => {
  return userRef.id;
};
