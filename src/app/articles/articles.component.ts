import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {Article, CAT_TO_IMAGE} from "../article";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [``]
})
export class ArticlesComponent implements OnInit {

  public articles: Observable<Article[]>;

  constructor(private amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.articles = this.amenitiesService.getArticles();
  }

  addToCart(article: Article) {
    this.amenitiesService.moveToUserCart(article);
  }

  removeArticle(id: string) {
    this.amenitiesService.remove(id);
  }

  getImage(article: Article): string {
    return article.image || CAT_TO_IMAGE[article.category] || CAT_TO_IMAGE['jouet']
  }
}
