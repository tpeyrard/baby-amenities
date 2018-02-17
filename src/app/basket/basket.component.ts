import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from '../amenities.service';
import {Article, CAT_TO_IMAGE} from "../article";

@Component({
  selector: 'app-basket',
  template: `
    <mat-sidenav-content class="nav-content">
      <ng-container *ngFor="let list of userLists">
        <h2 class="mat-title" style="width: 100%;">Liste {{list.key}} :</h2>
        <h3 class="subheading-2" *ngIf="(userArticles[list.key] | async)?.length == 0" style="text-align: center">
          Aucun article sélectionné.
        </h3>
        <ng-container *ngFor="let article of userArticles[list.key] | async; odd as isOdd; first as isFirst">
          <mat-card [ngClass]="isOdd ? 'card card-odd' : isFirst ? 'card' : 'card card-even'">
            <mat-card-header>
              <mat-icon mat-card-avatar>{{article.category}}</mat-icon>
              <mat-card-title>{{article.name}}</mat-card-title>
              <mat-card-subtitle>{{article.size}} - {{article.value}}</mat-card-subtitle>
            </mat-card-header>
            <div class="img-container">
              <img mat-card-image src="{{getImage(article)}}" alt="Photo of the product">
            </div>
            <mat-card-content class="card-content">
              <p [innerText]="article.desc" class="card-desc"></p>
            </mat-card-content>
            <mat-card-actions class="card-actions" align="end">
              <button mat-button color="primary" (click)="confirmPurchase(article)">Acheté</button>
              <button mat-button color="warn" (click)='cancel(article)'>Annuler</button>
            </mat-card-actions>
          </mat-card>
        </ng-container>
      </ng-container>
    </mat-sidenav-content>
  `,
  styles: [
      ``]
})
export class BasketComponent implements OnInit {
  public userArticles: any = {};
  public userLists: any[];

  constructor(private amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.amenitiesService.listNames()
      .subscribe(lists => {
        this.userLists = lists;
        lists.map(list => {
          return this.userArticles[list.key] = (this.amenitiesService.getArticlesForCurrentUser(list.key));
        });
      });

  }

  confirmPurchase(article: Article, listName = 'listNameToFix') {
    this.amenitiesService.articleBought(article, listName);
  }

  cancel(article: Article, listName = 'listNameToFix') {
    this.amenitiesService.release(article, listName);
  }

  getImage(article: Article): string {
    return article.image || CAT_TO_IMAGE[article.category] || CAT_TO_IMAGE['jouet']
  }
}
