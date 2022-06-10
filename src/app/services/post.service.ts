import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import fileDownload from 'js-file-download';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Post } from '../types/post';
import { User } from '../types/user';
import { AuthService } from './auth.service';
import { FirebaseApp } from '@angular/fire/app';

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

    this._createImageUrl(postData.image).subscribe((result: any) => {
      // create user reference
      const userRef: DocumentReference<any> = this.afs
        .collection('users')
        .doc(this.authService.currentUser?.uid).ref;

      const newPost: Post = {
        id: this.afs.createId(),
        imageId: result.public_id,
        imageUrl: result.secure_url,
        createdAt: Date.now(),
        title: postData.title,
        description: postData.description ?? '',
        userRef: userRef,
      };

      this.postsCollection.doc(newPost.id).set(newPost);
      this.isLoading.next(false);

      this.router.navigateByUrl(`post/${newPost.id}`);
    });
  }

  async deletePost(post: Post) {
    await this.postsCollection.doc(post.id).delete();
    this._deleteImageSource(post.imageId);
  }

  async editPost(postId: string, editData: any) {
    await this.postsCollection.doc(postId).update(editData);
  }

  downloadImage(imageUrl: string, imageName: string): void {
    this.http
      .get(imageUrl, {
        responseType: 'blob',
      })
      .subscribe((res) => {
        fileDownload(res, `${imageName}.jpg`);
      });
  }

  // REACTIONS

  likePost(post: Post, uid: string) {
    const postLikes: DocumentReference<any>[] = post.likes ?? [];

    // create user reference
    const userRef: DocumentReference<any> = this._createUserRef(uid);

    // Check if user is already liked this post
    if (postLikes.some((user) => user.path == userRef.path)) {
      const index = postLikes.map((item) => item.path).indexOf(userRef.path);

      postLikes.splice(index, 1);
    } else {
      // if not
      postLikes.push(userRef);
    }

    this.postsCollection.doc(post.id).update({
      likes: postLikes,
    });
  }

  private _createUserRef(uid: string): DocumentReference<any> {
    return this.afs.collection('users').doc(uid).ref;
  }

  private _createImageUrl(image: File) {
    let formData = new FormData();
    formData.append('image', image);

    return this.http.post(
      'https://imagesio.herokuapp.com/api/image/getUrl',
      formData
    );
  }

  private _deleteImageSource(imageId: string): void {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post(
      'https://imagesio.herokuapp.com/api/image/deleteImage',
      {
        cloudinary_id: imageId,
      },
      { headers: httpHeaders }
    );
  }
}
