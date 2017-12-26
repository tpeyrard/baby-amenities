import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {MediaMatcher} from "@angular/cdk/layout";
import {Article} from "../article";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  public articles: Observable<Article[]>;
  sideNavToggle: boolean;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(private amenitiesService: AmenitiesService, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.articles = this.amenitiesService.getArticles();
    this.sideNavToggle = !this.mobileQuery.matches;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  addToCart(article: Article) {
    this.amenitiesService.moveToUserCart(article);
  }

  removeArticle(id: string) {
    this.amenitiesService.remove(id);
  }

  toggleSidenav(): void {
    this.sideNavToggle = !this.sideNavToggle;
  }
}
