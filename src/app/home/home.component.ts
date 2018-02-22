import {Observable} from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from '../amenities.service';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

const LIST_NAME_MIN_LENGTH = 5;

@Component({
  selector: 'app-home',
  template: `
    <mat-sidenav-content class="nav-bloc-content">
      <h1 class="mat-headline">Configuration</h1>

      <h2 class="mat-title">Créer une liste</h2>
      <mat-form-field style="width: 30%">
        <mat-label>Nom de la nouvelle liste</mat-label>
        <input matInput #newListInput [(ngModel)]="newListName" placeholder="Nom de la nouvelle liste" required>
        <mat-hint align="start"><strong>Au moins {{listNameMinLength}} caractères</strong> </mat-hint>
        <mat-hint align="end">{{newListInput.value.length}}</mat-hint>
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="newList()" [disabled]="disableButton()">Créer la liste</button>

      <mat-divider class="divider"></mat-divider>

      <h2 class="mat-title">Vos listes</h2>
      <mat-button-toggle-group [(ngModel)]="selectedList">
        <mat-button-toggle *ngFor="let list of listNames | async" [value]="list.name" style="padding: 0 4px;">
          {{list.name}}
        </mat-button-toggle>
      </mat-button-toggle-group>
      <p class="mat-caption">{{selectedList}}{{selectedList ? " est votre liste principale" : "Vous n'avez pas de liste principale"}}</p>

      <mat-divider class="divider"></mat-divider>
      
      <h2 class="mat-title">Inviter quelqu'un à rejoindre votre liste</h2>
      <ng-select [items]="listNames | async"
                 bindLabel="name"
                 placeholder="Sélectionnez une liste"
                 [(ngModel)]="listToInvite">
      </ng-select>
      <p *ngIf="listToInvite">
        <mat-form-field style="width: 350px">
          <input matInput placeholder="Adresse Gmail de la personne à inviter" [formControl]="email" required>
          <mat-error *ngIf="email.invalid">{{getErrorMessage()}}</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" disabled>Envoyer l'invitation</button>
      </p>
    </mat-sidenav-content>
  `,
  styles: []
})

export class HomeComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  public listNames: Observable<object[]>;
  public selectedList: string;
  public listToInvite: object;
  public newListName: string;
  public listNameMinLength = LIST_NAME_MIN_LENGTH;

  constructor(private amenitiesService: AmenitiesService, private router: Router) {
  }

  ngOnInit() {
    this.listNames = this.amenitiesService.listNames()
      .map(changes => changes.map(c => {
        const isPrimaryList = c.payload.val().type === 'primary';
        const listName = c.key;
        if (isPrimaryList) {
          this.selectedList = listName;
        }
        return {'name': listName, 'isPrimary': isPrimaryList}
      }));
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  newList(): void {
    this.amenitiesService.createList(this.newListName);
  }

  disableButton(): boolean {
    return this.newListName ? this.newListName.length < LIST_NAME_MIN_LENGTH : true;
  }
}

