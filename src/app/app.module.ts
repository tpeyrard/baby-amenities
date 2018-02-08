import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatOptionModule,
  MatRadioModule,
  MatSelectModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexLayoutModule} from "@angular/flex-layout";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BasketComponent} from './basket/basket.component';
import {ArticlesComponent} from './articles/articles.component';
import {AmenitiesService} from './amenities.service';
import {DialogOverview, EditorComponent} from './editor/editor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MediaMatcher} from "@angular/cdk/layout";
import {HomeComponent} from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    ArticlesComponent,
    EditorComponent,
    DialogOverview,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    NgSelectModule
  ],
  entryComponents: [DialogOverview],
  providers: [AmenitiesService, MediaMatcher],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
