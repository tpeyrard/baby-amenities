import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {User} from "firebase";
import {Article} from "./article";

const ARTICLE_PATH = '/articles';
const USERS_PATH = '/users/';

@Injectable()
export class AmenitiesService {

  private articlesRef: AngularFireList<Article>;
  private articles: Observable<Article[]>;
  private userArticlesRef: AngularFireList<Article>;

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.articlesRef = this.database.list<Article>(ARTICLE_PATH);
    this.articles = this.articlesRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => new Article(c.payload.key, c.payload.val()))
          .filter(article => {
            return article.taken === undefined || !article.taken;
          });
      });
    this.authenticationState().subscribe(user => {
      this.userArticlesRef = this.database.list<Article>(USERS_PATH + user.uid);
    });
  }

  getArticles(): Observable<Article[]> {
    return this.articles;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  authenticationState(): Observable<User> {
    return this.afAuth.authState;
  }

  add(article: Article) {
    delete article.key;
    this.articlesRef.push(article);
  }

  moveToUserCart(article: Article) {
    this.articlesRef.update(article.key, article.take());

    delete article.key;
    this.userArticlesRef.push(article);
  }

  remove(id: string) {
    this.articlesRef.remove(id);
  }

  getArticlesForCurrentUser(): Observable<Article[]> {
    return this.userArticlesRef.snapshotChanges()
      .map(changes => changes.map(c => new Article(c.payload.key, c.payload.val())));
  }
}
