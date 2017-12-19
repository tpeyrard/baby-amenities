import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class AmenitiesService {

  constructor(private database: AngularFireDatabase) {
  }

  getArticles(): Observable<any[]> {
    return this.database.list('/baby-amenities').valueChanges();
  }
}
