import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {Article} from "../article";

@Component({
  selector: 'app-account',
  template: `
    <mat-sidenav-container class="nav-container">
      <mat-sidenav #sidenav mode="side" [opened]="true" class="sidenav" [fixedInViewport]="false">
        <div *ngIf="(userArticles | async)?.length == 0; else articleCount">
          <h2>No article found.</h2>
        </div>
        <ng-template #articleCount>
          <h2>{{(userArticles | async)?.length}} article{{(userArticles | async)?.length > 1 ? 's' : ''}}</h2>
        </ng-template>
      </mat-sidenav>

      <mat-sidenav-content class="nav-content">
        <ng-container *ngFor="let article of userArticles | async">
          <mat-card class="card" tabindex="0">
            <mat-card-header>
              <mat-icon mat-card-avatar>{{article.category}}</mat-icon>
              <mat-card-title>{{article.name}}</mat-card-title>
              <mat-card-subtitle>{{article.size}} - {{article.value}}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content class="card-content">
              <img class="card-image" src="{{article.image}}" alt="Product image">
              <p [innerText]="article.desc" class="card-desc"></p>
            </mat-card-content>
            <mat-card-actions class="card-actions" align="end">
              <button mat-raised-button color="primary" (click)="confirmPurchase(article)" disabled>Acheté</button>
              <button mat-button color="warn" (click)='cancel(article.key)' disabled>Annuler</button>
            </mat-card-actions>
          </mat-card>

        </ng-container>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
      `.nav-content {
      padding: 8px 36px;
      box-sizing: border-box;
    }

    .nav-container {
      position: absolute;
      top: 60px;
      bottom: 60px;
      left: 0;
      right: 0;
    }

    .sidenav {
      display: flex;
      padding: 8px;
      align-items: center;
      justify-content: center;
      width: 200px;
      box-shadow: 3px 0 6px rgba(0, 0, 0, .24);
    }

    @media (max-width: 400px) {
      .nav-content {
        padding: 8px;
      }
    }

    .card {
      margin-bottom: 10px;
    }

    .card-content {
      display: flex;
    }

    .card-desc {
      padding: 4px 8px;
    }

    .card-image {
      object-fit: cover;
      max-height: 200px;
      max-width: 200px;
      min-width: 120px;
    }

    .card-actions {
      display: flex;
      flex-wrap: wrap;
    }
    `]
})
export class AccountComponent implements OnInit {
  private userArticles: Observable<Article[]>;

  constructor(private amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.userArticles = this.amenitiesService.getArticlesForCurrentUser();
  }

}
