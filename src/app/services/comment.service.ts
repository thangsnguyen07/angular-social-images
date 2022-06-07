import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private afs: AngularFirestore) {}

  async getCommentAuthor(userRef: DocumentReference) {
    const res = await userRef.get();
    return res.data() as User;
  }
}
