import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public createUser(data: {userName: string, password: string}) {
    return this.firestore.collection('users').add(data);
  }

  public getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

}
