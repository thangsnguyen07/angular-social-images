import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _currentUser?: User | null;

  public commentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null); // temporary

  constructor(
    public afAuth: AngularFireAuth,
    public afFirestore: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.getUserInfo(user.uid).subscribe((userInfo: any) => {
          this._setAuth(true);
          this.setUser(userInfo);

          this.commentUser.next(userInfo); // temporary
        });
      } else {
        this.setUser(null);
        this._setAuth(false);
      }
    });
  }

  setUser(userInfo: User | null) {
    this._currentUser = userInfo;
  }

  get currentUser() {
    return this._currentUser;
  }

  getUserInfo(uid: string) {
    return this.afFirestore.collection('users').doc(uid).valueChanges();
  }

  signUp(signUpData: any) {
    this.afAuth
      .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
      .then((response) => {
        this._addUser(response.user);
        this.router.navigateByUrl('/');
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  signIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigateByUrl('/');
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigateByUrl('/sign-in');
  }

  private _setAuth(value: boolean) {
    this.isAuth.next(value);
  }

  private _addUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afFirestore.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      username: user.username,
      avatar: user.photoURL,
      emailVerified: user.emailVerified,
    };

    userRef.set(userData, {
      merge: true,
    });
  }
}
