import {Observable} from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from '../amenities.service';
import {List} from '../list';
import {Router} from '@angular/router';

const LIST_NAME_MIN_LENGTH = 5;

@Component({
  selector: 'app-home',
  template: `
    <mat-sidenav-content class="nav-bloc-content">
      <h1 class="mat-headline">Configuration</h1>

      <h2 class="mat-title">Créer une liste</h2>
      <mat-form-field class="ba-form-field">
        <mat-label>Nom de la nouvelle liste</mat-label>
        <input matInput #newListInput
               [(ngModel)]="newListName"
               placeholder="Nom de la nouvelle liste"
               required
               (keyup.enter)="newList()">
        <mat-hint align="end">{{newListInput.value.length}}/{{listNameMinLength}} caractères</mat-hint>
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="newList()" [disabled]="disableButton()">Créer la liste</button>

      <div *ngIf="listAlreadyExists && newListName.length != 0" style="color:#F44336"><small>La liste éxiste déjà</small></div>

      <mat-divider class="divider"></mat-divider>

      <h2 class="mat-title">Vos listes</h2>
      <p class="mat-subheading-2" *ngIf="(listNames | async)?.length == 0">Vous ne faites parti d'aucune liste
        actuellement.</p>
      <mat-list dense>
        <mat-list-item *ngFor="let list of listNames | async">
          <h3 mat-line class="mat-subheading-2"><a routerLink="/list/{{list.name}}">{{list.name}}</a></h3>
          <p mat-line *ngIf="list.isAdmin"><span class="mat-caption"> Code d'invitation :</span> <span
            class="mat-body-1">{{list.invitationCode}}</span></p>
        </mat-list-item>
      </mat-list>

      <mat-divider class="divider"></mat-divider>

      <h2 class="mat-title">Rejoindre une liste</h2>

      <mat-form-field class="ba-form-field">
        <mat-label>Entrez le code d'invitation</mat-label>
        <input matInput #joinInput
               [(ngModel)]="code"
               placeholder="Code d'invitation"
               required
               (keyup.enter)="joinList()">
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="joinList()">Rejoindre la liste</button>
    </mat-sidenav-content>
  `,
  styles: []
})

export class HomeComponent implements OnInit {

  public listNames: Observable<List[]>;
  public newListName: string;
  public code: string;
  public listNameMinLength = LIST_NAME_MIN_LENGTH;
  public listAlreadyExists = false;

  constructor(private amenitiesService: AmenitiesService, private router: Router) {
  }

  ngOnInit() {
    this.listNames = this.amenitiesService.listNames()
      .map(lists => lists.map(list => {
        const information = list.payload.val();
        return new List(list.key, information.isAdmin, information.invitation);
      }));
  }

  newList(): void {
    this.amenitiesService.createList(this.newListName)
      .then(() => {
        this.listAlreadyExists = false;
        setTimeout(this.router.navigate(['list/' + this.newListName]), 800)
      })
      .catch(() => {
        this.listAlreadyExists = true;
      });
  }

  disableButton(): boolean {
    return this.newListName ? this.newListName.length < LIST_NAME_MIN_LENGTH : true;
  }

  joinList(): void {
    this.amenitiesService.addCurrentUserWithInvitationCode(this.code);
  }
}

