import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
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
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule]
})
export class AppModule { }
