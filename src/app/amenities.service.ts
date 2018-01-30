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

  private _listNames: AngularFireList<string>;
  private user: firebase.User;

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.authenticationState().subscribe(user => {
      if (user) {
        this.user = user;
        this._listNames = this.database.list<string>(USER_TO_LIST + user.uid);
      }
    });
  }

  getArticles(listName: string): Observable<Article[]> {
    if (listName) {
      return this.articlesOfList(listName);
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

  add(article: Article, listName: string) {
    this.articleOfListRef(listName).push(article);
  }

  remove(listName: string, id: string) {
    this.articleOfListRef(listName).remove(id);
  }

  moveToUserCart(listName: string, article: Article) {
    if (this.user && listName) {
      this.database.list<Article>(ARTICLE_PATH + listName).update(article.key, article.take());

      this.userArticlesDatabase(listName).set(article.key, article);
    }
  }

  getArticlesForCurrentUser(listName: string): Observable<Article[]> {
    if (listName) {
      return this.userArticlesDatabase(listName).snapshotChanges()
        .map(changes => {
          return changes
            .map(c => new Article(c.payload.key, c.payload.val()))
            .filter(article => article.isNotBought());
        });
    }
  }

  articleBought(article: Article, listName: string) {
    if (listName) {
      const purchasedArticle = article.purchase();
      const key = purchasedArticle.key;

      this.userArticlesDatabase(listName).update(key, purchasedArticle);
      this.articleOfListRef(listName).update(key, purchasedArticle);
    }
  }

  release(article: Article, listName: string) {
    if (listName) {
      const key = article.key;
      article.taken = false;

      this.userArticlesDatabase(listName).remove(key);

      this.articleOfListRef(listName).update(key, article);
    }
  }

  listName(): Observable<String> {
    return this._listNames.snapshotChanges()
      .take(1)
      .map(changes => changes
        .find(c => {
          return c.payload.val().type === 'primary';
        }))
      .map(primaryList => {
        if (primaryList) {
          return primaryList.key;
        }
        console.log('No primary list defined for current user.')
      });
  }

  listNames(): Observable<String[]> {
    return this._listNames.snapshotChanges()
      .take(1)
      .map(changes => changes.map(c => c.key));
  }

  private articlesOfList(listName: string): Observable<Article[]> {
    return this.articleOfListRef(listName).snapshotChanges()
      .map(changes => {
        return changes.map(c => new Article(c.payload.key, c.payload.val()))
          .filter(article => article.isAvailable());
      });
  }

  private userArticlesDatabase(listName: string) {
    if (this.user) {
      return this.database.list<Article>(USER_TO_LIST + this.user.uid + "/" + listName + "/articles/");
    }
    console.log('Cannot access user database because user is undefined or null');
  }

  private articleOfListRef(listName: string) {
    if (listName) {
      return this.database.list<Article>(ARTICLE_PATH + listName);
    }
    console.log('Cannot access list of articles listName is undefined or null');
  }

}
