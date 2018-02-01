import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {ArticlesComponent} from "./articles/articles.component";
import {BasketComponent} from "./basket/basket.component";
import {APP_BASE_HREF} from "@angular/common";
import {AmenitiesService} from "./amenities.service";
import {AngularFireDatabase} from "angularfire2/database";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FirebaseApp} from "angularfire2";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BasketComponent,
        ArticlesComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatCardModule,
        AppRoutingModule,
        FlexLayoutModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        AmenitiesService,
        AngularFireDatabase,
        FirebaseApp
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Amenities'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Amenities');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Amenities');
  }));
});
