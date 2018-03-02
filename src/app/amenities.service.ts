import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {User} from "firebase";
import {Article} from "./article";
import 'rxjs/add/operator/take'
import {Subject} from "rxjs/Subject";

const ARTICLE_PATH = '/articles/';
const USERS_PATH = '/users/';
const USER_TO_LIST = '/userToList/';
const LIST_NAMES = '/list_names/';

@Injectable()
export class AmenitiesService {

  private _userToList: AngularFireList<any>;
  private user: firebase.User;
  private _selectedList = new Subject<string>();

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.authenticationState().subscribe(user => {
      if (user) {
        this.user = user;
        this._userToList = this.database.list<string>(USER_TO_LIST + user.uid);
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

  isAdmin(listName: string): Observable<boolean> {
    return this.database.list(LIST_NAMES + '/' + listName)
      .snapshotChanges()
      .map(changes => changes.find(list => list.payload.val() === this.user.uid))
      .map(adminFound => !!adminFound)
      .take(1);
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
    } else {
      console.log('Cannot move article to user cart. user=[' + this.user + '] - listName=[' + listName + ']');
    }
  }

  getArticlesForCurrentUser(listName: string | String): Observable<Article[]> {
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

  primaryListName(): Observable<String> {
    return this._userToList.snapshotChanges()
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

  listNames(): Observable<any[]> {
    return this._userToList.snapshotChanges();
  }

  private articlesOfList(listName: string): Observable<Article[]> {
    return this.articleOfListRef(listName).snapshotChanges()
      .map(changes => {
        return changes.map(c => new Article(c.payload.key, c.payload.val()))
          .filter(article => article.isAvailable());
      });
  }

  private userArticlesDatabase(listName: string | String): AngularFireList<Article> {
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

  createList(newListName: string) {
    const invitationCode = AmenitiesService.generateId(10);

    this.database.list(LIST_NAMES).set(newListName, {admin: this.user.uid, 'invitation': invitationCode});

    this.addToUserToListMapping(newListName, invitationCode);

    this.addToUsersMapping(newListName);
  }

  private addPrimaryList(name, invitationCode: string) {
    const value = {};
    value[name] = AmenitiesService.listInformation(name, 'primary', invitationCode);
    this.database.list(USER_TO_LIST).set(this.user.uid, value);
  }

  private addSecondaryList(name, invitationCode: string) {
    this._userToList.set(name, AmenitiesService.listInformation(name, 'secondary', invitationCode));
  }

  private static listInformation(name, type: string, invitationCode: string): object {
    return {type: type, 'invitation': invitationCode};
  }

  private userHasNoList = (userList) => !userList || userList.length == 0;

  private addToUserToListMapping(name: string, invitationCode: string) {
    this._userToList
      .snapshotChanges()
      .take(1)
      .subscribe(userList => {
        if (this.userHasNoList(userList)) {
          this.addPrimaryList(name, invitationCode);
        } else {
          this.addSecondaryList(name, invitationCode);
        }
      });
  }

  private addToUsersMapping(name: string) {
    const value = {};
    value[this.user.uid] = {present: 'true'};
    this.database.list(USERS_PATH).set(name, value);
  }

  setSelectedList(listName: string) {
    this._selectedList.next(listName);
  }

  selectedList(): Observable<string> {
    return this._selectedList.asObservable();
  }

  private static dec2hex(dec): string {
    return ('0' + dec.toString(16)).substr(-2);
  }

  private static generateId(len): string {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, AmenitiesService.dec2hex).join('');
  };

}
