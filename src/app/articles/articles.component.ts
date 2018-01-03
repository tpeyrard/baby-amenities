import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {Article} from "../article";

const CAT_TO_IMAGE = {
  'habits': '/assets/images/jean.jpg',
  'body': '/assets/images/body.jpg',
  'jouet': '/assets/images/velo.jpg',
  'poussette': '/assets/images/poussette.jpg',
  'rangement': '/assets/images/coffre.jpg',
  'maman': '/assets/images/enceinte.jpg',
  'dehors': '/assets/images/bonnet.jpg',
  'naissance': '/assets/images/berceau.jpg',
  'nuit': '/assets/images/lit.jpg',
  'repas': '/assets/images/repas.jpg',
  'chambre': '/assets/images/chambre.jpg'
};

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
