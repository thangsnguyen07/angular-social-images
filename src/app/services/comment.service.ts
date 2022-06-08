import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { User } from '../types/user';
import { CommentType } from '../types/comment';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private afs: AngularFirestore) {}

  async getCommentAuthor(userRef: DocumentReference) {
    const res = await userRef.get();
    return res.data() as User;
  }

  writeComment(content: string, postId: string, userId: string) {
    // console.log(content, postId, userId);

    const commentId: string = this.afs.createId();

    const comment: CommentType = {
      id: commentId,
      content: content,
      postRef: this.afs.collection('posts').doc<Post>(postId).ref,
      userRef: this.afs.collection('users').doc<User>(userId).ref,
      createdAt: Date.now(),
      likes: [],
      replies: [],
    };

    this.afs
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .doc(commentId)
      .set(comment);
  }
}
