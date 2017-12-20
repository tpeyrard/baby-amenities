import {TestBed, inject} from '@angular/core/testing';

import {AmenitiesService} from './amenities.service';
import {FirebaseApp} from "angularfire2";
import {AngularFireDatabase} from "angularfire2/database";

describe('AmenitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmenitiesService, AngularFireDatabase, FirebaseApp]
    });
  });

  it('should be created', inject([AmenitiesService], (service: AmenitiesService) => {
    expect(service).toBeTruthy();
  }));
});
