import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private afs: AngularFirestore) {}

  getKeywords() {
    return this.afs.collection('keywords').stateChanges();
  }
}
