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

  public getUser(documentId: string) {
    return this.firestore.collection('users').doc(documentId).snapshotChanges();
  }

  public getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('users').doc(documentId).set(data);
  }

}
