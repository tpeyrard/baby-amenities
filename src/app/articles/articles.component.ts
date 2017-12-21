import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles = [];

  constructor(private amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.amenitiesService.getArticles().subscribe(articles => this.articles = articles);
  }

  removeArticle(id: number) {
    if (id > -1) {
      this.articles.splice(id, 1);
    }
  }
}
