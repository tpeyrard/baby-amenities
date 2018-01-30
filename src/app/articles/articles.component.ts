import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {Article, CAT_TO_IMAGE} from "../article";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [``]
})
export class ArticlesComponent implements OnInit {

  public articles: Observable<Article[]>;
  private selectedList: string;

  constructor(private amenitiesService: AmenitiesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedList = params['listName'];
      this.articles = this.amenitiesService.getArticles(this.selectedList);
    });
  }

  addToCart(article: Article) {
    if (this.selectedList) {
      this.amenitiesService.moveToUserCart(this.selectedList, article);
    }
  }

  removeArticle(id: string) {
    if (this.selectedList) {
      this.amenitiesService.remove(this.selectedList, id);
    }
  }

  getImage(article: Article): string {
    return article.image || CAT_TO_IMAGE[article.category] || CAT_TO_IMAGE['jouet']
  }
}
