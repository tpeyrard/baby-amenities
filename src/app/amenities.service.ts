import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {User} from "firebase";


const ARTICLE_PATH = '/';

@Injectable()
export class AmenitiesService {

  private articlesRef: AngularFireList<any>;
  private articles: Observable<any>;

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.articlesRef = this.database.list(ARTICLE_PATH);
    this.articles = this.articlesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getArticles(): Observable<any[]> {
    return this.articles;
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

  add(article: object) {
    this.articlesRef.push(article);
  }

  remove(id: string) {
    this.articlesRef.remove(id);
  }
}
