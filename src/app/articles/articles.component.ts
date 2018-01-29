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
  private listName: string;

  constructor(private amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.amenitiesService.listName()
      .subscribe(listName => {
        if (listName) {
          this.listName = (<string>listName);
          this.articles = this.amenitiesService.getArticles(this.listName);
        }
      });
  }

  addToCart(article: Article) {
    if (this.listName) {
      this.amenitiesService.moveToUserCart(this.listName, article);
    }
  }

  removeArticle(id: string) {
    if (this.listName) {
      this.amenitiesService.remove(this.listName, id);
    }
  }

  getImage(article: Article): string {
    return article.image || CAT_TO_IMAGE[article.category] || CAT_TO_IMAGE['jouet']
  }
}
