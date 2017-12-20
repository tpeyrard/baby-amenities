import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {User} from "firebase";

@Injectable()
export class AmenitiesService {

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  getArticles(): Observable<any[]> {
    return this.database.list('/').valueChanges();
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  authenticationState(): Observable<User>{
    return this.afAuth.authState;
  }
}
