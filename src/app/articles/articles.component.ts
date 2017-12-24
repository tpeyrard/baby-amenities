import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public articles: Observable<any[]>;

  constructor(private amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.articles = this.amenitiesService.getArticles();
  }

  removeArticle(id: string) {
    this.amenitiesService.remove(id);
  }
}
