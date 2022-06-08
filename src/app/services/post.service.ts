import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, skip, skipUntil } from 'rxjs';

import { Post } from '../types/post';
import { User } from '../types/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private postsCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.postsCollection = this.afs.collection('posts');
  }

  get posts() {
    return this.postsCollection.valueChanges();
  }

  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`).valueChanges();
  }

  async populatePost(post: Post) {
    const response: any = await post.userRef.get();
    const user: DocumentData | undefined = response.data();

    const populatedPost: Post = {
      ...post,
      author: user as User,
    };

    return populatedPost;
  }

  getPostComments(id: string) {
    return this.afs
      .doc<Post>(`posts/${id}`)
      .collection('comments', (ref) => ref.orderBy('createdAt', 'desc'))
      .stateChanges(['added']);
  }

  createPost(postData: any) {
    this.isLoading.next(true);

    this.createImageUrl(postData.image).subscribe((result: any) => {
      // create user reference
      const userRef: DocumentReference<any> = this.afs
        .collection('users')
        .doc(this.authService.currentUser?.uid).ref;

      const newPost: Post = {
        id: this.afs.createId(),
        imageId: result.public_id,
        imageUrl: result.secure_url,
        createdAt: new Date(),
        title: postData.title,
        description: postData.description ?? '',
        userRef: userRef,
      };

      this.postsCollection.doc(newPost.id).set(newPost);
      this.isLoading.next(false);

      this.router.navigateByUrl(`post/${newPost.id}`);
    });
  }

  createImageUrl(image: File) {
    let formData = new FormData();
    formData.append('image', image);

    return this.http.post(
      'https://imagesio.herokuapp.com/api/image/getUrl',
      formData
    );
  }
}
