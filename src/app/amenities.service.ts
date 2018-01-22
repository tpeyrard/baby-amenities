import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {User} from "firebase";
import {Article} from "./article";
import 'rxjs/add/operator/take'

const ARTICLE_PATH = '/articles';
const USERS_PATH = '/users/';

@Injectable()
export class AmenitiesService {

  private articlesRef: AngularFireList<Article>;
  private articles: Observable<Article[]>;
  private userArticlesRef: AngularFireList<Article>;
  private listNames: Observable<String>;

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.articlesRef = this.database.list<Article>(ARTICLE_PATH);
    this.articles = this.articlesRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => new Article(c.payload.key, c.payload.val()))
          .filter(article => article.isAvailable());
      });
    this.authenticationState().subscribe(user => {
      if (user) {
        this.userArticlesRef = this.database.list<Article>(USERS_PATH + user.uid);

        this.listNames = this.database.list<String>('userToList',
          ref => ref.orderByKey().equalTo(user.uid))
          .valueChanges()
          //.take(1)
          .map(changes => changes[0]);
      }
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
    this.articlesRef.push(article);
  }

  moveToUserCart(article: Article) {
    this.articlesRef.update(article.key, article.take());

    this.userArticlesRef.set(article.key, article);
  }

  remove(id: string) {
    this.articlesRef.remove(id);
  }

  getArticlesForCurrentUser(): Observable<Article[]> {
    return this.userArticlesRef.snapshotChanges()
      .map(changes => changes
        .map(c => new Article(c.payload.key, c.payload.val()))
        .filter(article => article.isNotBought()));
  }

  listName(): Observable<String> {
    return this.listNames;
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
}
