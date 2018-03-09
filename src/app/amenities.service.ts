import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {Article} from './article';
import 'rxjs/add/operator/take'
import {Subject} from 'rxjs/Subject';

const ARTICLE_PATH = '/articles/';
const USERS_PATH = '/users/';
const USER_TO_LIST = '/userToList/';
const LIST_NAMES = '/list_names/';

@Injectable()
export class AmenitiesService {

  private _userToList: AngularFireList<any>;
  private user: firebase.User;
  private _selectedList = new Subject<string>();

  private static dec2hex(dec): string {
    return ('0' + dec.toString(16)).substr(-2);
  }

  private static generateId(len): string {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, AmenitiesService.dec2hex).join('');
  };

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
      this.database.list<Article>(ARTICLE_PATH + listName)
        .update(article.key, article.take())
        .then(() => this.userArticlesDatabase(listName).set(article.key, article));
    } else {
      console.log('Cannot move article to user cart. user=[' + this.user + '] - listName=[' + listName + ']');
    }
  }

  getArticlesForCurrentUser(listName: string | String): Observable<Article[]> {
    if (listName) {
      return this.userArticlesDatabase(listName).snapshotChanges()
        .map(changes => changes
          .map(c => new Article(c.payload.key, c.payload.val()))
          .filter(article => article.isNotBought()));
    }
  }

  articleBought(article: Article, listName: string) {
    if (listName) {
      const purchasedArticle = article.purchase();
      const key = purchasedArticle.key;

      this.userArticlesDatabase(listName)
        .update(key, purchasedArticle)
        .then(() => this.articleOfListRef(listName).update(key, purchasedArticle));
    }
  }

  release(article: Article, listName: string) {
    if (listName) {
      const key = article.key;
      article.taken = false;

      this.userArticlesDatabase(listName)
        .remove(key)
        .then(() => this.articleOfListRef(listName).update(key, article));
    }
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
      return this.database.list<Article>(USER_TO_LIST + this.user.uid + '/' + listName + '/articles/');
    }
    console.log('Cannot access user database because user is undefined or null');
  }

  private articleOfListRef(listName: string) {
    if (listName) {
      return this.database.list<Article>(ARTICLE_PATH + listName);
    }
    console.log('Cannot access list of articles listName is undefined or null');
  }

  createList(newListName: string): Promise<void> {
    const invitationCode = AmenitiesService.generateId(10);

    return this.database.list(LIST_NAMES)
      .set(newListName, {admin: this.user.uid, 'invitation': invitationCode})
      .then(() => this.addToUserToListMapping(newListName, invitationCode, true))
      .then(() => this.addToUsersMapping(newListName));
  }

  private addListToUserList(name, listInformation: object): Promise<void> {
    return this._userToList.update(name, listInformation);
  }

  private addToUserToListMapping(name: string, invitationCode: string, isAdmin: boolean): Promise<void> {
    const listInformation = {'isAdmin': isAdmin, 'invitation': invitationCode};
    return this.addListToUserList(name, listInformation);
  }

  private addToUsersMapping(listName: string): Promise<void> {
    const value = {};
    value[this.user.uid] = {present: 'true'};
    return this.database.list(USERS_PATH).update(listName, value);
  }

  setSelectedList(listName: string) {
    this._selectedList.next(listName);
  }

  selectedList(): Observable<string> {
    return this._selectedList.asObservable();
  }

  addCurrentUserWithInvitationCode(invitationCode: string) {
    const NO_INVITATION_CODE = '0000000000';
    this.database.list(LIST_NAMES, ref => ref.orderByChild('invitation').equalTo(invitationCode).limitToFirst(1))
      .snapshotChanges()
      .subscribe(matchingList => {
        const listName = matchingList[0].key;

        this.addToUserToListMapping(listName, NO_INVITATION_CODE, false)
          .then(() => this.addToUsersMapping(listName));
      });

  }
}
