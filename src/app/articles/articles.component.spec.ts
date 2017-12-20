import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AmenitiesService} from "../amenities.service";
import {FirebaseApp} from "angularfire2";
import {AngularFireDatabase} from "angularfire2/database";

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesComponent ],
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatCardModule
      ],
      providers: [AmenitiesService, AngularFireDatabase, FirebaseApp]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
