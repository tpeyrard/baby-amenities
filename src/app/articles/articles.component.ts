import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {MediaMatcher} from "@angular/cdk/layout";
import {Article} from "../article";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [``]
})
export class ArticlesComponent implements OnInit {

  public articles: Observable<Article[]>;

  constructor(private amenitiesService: AmenitiesService) {  }

  ngOnInit() {
    this.articles = this.amenitiesService.getArticles();
  }

  addToCart(article: Article) {
    this.amenitiesService.moveToUserCart(article);
  }

  removeArticle(id: string) {
    this.amenitiesService.remove(id);
  }
}
