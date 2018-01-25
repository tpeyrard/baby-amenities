import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {User} from "firebase";
import {Article} from "./article";
import 'rxjs/add/operator/take'

const ARTICLE_PATH = '/articles/';
const USERS_PATH = '/users/';
const USER_TO_LIST = '/userToList/';

@Injectable()
export class AmenitiesService {

  private articlesRef: AngularFireList<Article>;
  private userArticlesRef: AngularFireList<Article>;
  private listNames: AngularFireList<string>;
  private user: firebase.User;

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.articlesRef = this.database.list<Article>(ARTICLE_PATH);

    this.authenticationState().subscribe(user => {
      if (user) {
        this.user = user;
        this.userArticlesRef = this.database.list<Article>(USERS_PATH + user.uid); //TODO remove there

        this.listNames = this.database.list<string>(USER_TO_LIST + user.uid);
      }
    });
  }

  getArticles(listName: string): Observable<Article[]> {
    if (listName) {
      return this.database.list<Article>(ARTICLE_PATH + listName).snapshotChanges()
        .map(changes => {
          return changes.map(c => new Article(c.payload.key, c.payload.val()))
            .filter(article => article.isAvailable());
        });
    }
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
    this.articlesRef.push(article);
  }

  moveToUserCart(listName: string, article: Article) {
    if (this.user && listName) {
      console.log('listName=' + listName);
      this.database.list<Article>(ARTICLE_PATH + listName).update(article.key, article.take());

      this.userArticlesDatabase(listName).set(article.key, article);
    }
  }

  private userArticlesDatabase(listName: string) {
    if (this.user) {
      return this.database.list<Article>(USERS_PATH + listName + "/" + this.user.uid);
    }
  }

  remove(id: string) {
    this.articlesRef.remove(id);
  }

  getArticlesForCurrentUser(listName: string): Observable<Article[]> {
    if (listName) {
      return this.userArticlesDatabase(listName).snapshotChanges()
        .map(changes => changes
          .map(c => new Article(c.payload.key, c.payload.val()))
          .filter(article => article.isNotBought()));
    }
  }

  articleBought(article: Article) {
    const purchasedArticle = article.purchase();
    const key = purchasedArticle.key;

    this.userArticlesRef.update(key, purchasedArticle);
    this.articlesRef.update(key, purchasedArticle);
  }

  release(article: Article) {
    const key = article.key;
    article.taken = false;

    this.userArticlesRef.remove(key);
    this.articlesRef.update(key, article);
  }

  listName(): Observable<String> {
    return this.listNames.snapshotChanges()
      .take(1)
      .map(changes => changes[0].key);
  }
}
