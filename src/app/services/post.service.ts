import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection<any>('posts');
  }

  get posts() {
    return this.postsCollection.valueChanges();
  }

  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`).valueChanges();
  }

  getPostComments(id: string) {
    return this.afs
      .doc<Post>(`posts/${id}`)
      .collection('comments')
      .valueChanges();
  }
}
