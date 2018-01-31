import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {Article, CAT_TO_IMAGE} from "../article";

@Component({
  selector: 'app-account',
  template: `
    <mat-sidenav-content class="nav-content">
      <h2 *ngIf="(userArticles | async)?.length == 0" style="text-align: center">Aucun article sélectionné.</h2>
      <ng-container *ngFor="let article of userArticles | async; odd as isOdd; first as isFirst">
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
    </mat-sidenav-content>
  `,
  styles: [
      ``]
})
export class AccountComponent implements OnInit {
  public userArticles: Observable<Article[]>;
  private listName: string;

  constructor(private amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.amenitiesService.listName()
      .subscribe(listName => {
        if (listName) {
          this.listName = (<string>listName);
          this.userArticles = this.amenitiesService.getArticlesForCurrentUser(this.listName);
        }
      });

  }

  confirmPurchase(article: Article) {
    this.amenitiesService.articleBought(article, this.listName);
  }

  cancel(article: Article) {
    this.amenitiesService.release(article, this.listName);
  }

  getImage(article: Article): string {
    return article.image || CAT_TO_IMAGE[article.category] || CAT_TO_IMAGE['jouet']
  }
}
