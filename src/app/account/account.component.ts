import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {Article} from "../article";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-account',
  template: `
      <div class="nav-content">
        <h2 *ngIf="(userArticles | async)?.length == 0" style="text-align: center">Aucun article sélectionné.</h2>
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
              <button mat-raised-button color="primary" (click)="confirmPurchase(article)">Acheté</button>
              <button mat-button color="warn" (click)='cancel(article)'>Annuler</button>
            </mat-card-actions>
          </mat-card>

        </ng-container>
      </div>
  `,
  styles: [
      ``]
})
export class AccountComponent implements OnInit {
  public userArticles: Observable<Article[]>;

  constructor(private amenitiesService: AmenitiesService) {  }

  ngOnInit() {
    this.userArticles = this.amenitiesService.getArticlesForCurrentUser();
  }

  confirmPurchase(article: Article) {
    this.amenitiesService.articleBought(article);
  }

  cancel(article: Article) {
    this.amenitiesService.release(article);
  }
}
