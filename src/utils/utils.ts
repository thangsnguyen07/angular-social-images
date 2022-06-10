import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';

let afs: AngularFirestore;

export const userIdFromUserRef = (userRef: DocumentReference<any>): string => {
  return userRef.id;
};
