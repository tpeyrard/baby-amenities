import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {EditorComponent} from "../editor/editor.component";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles = [];

  constructor(private amenitiesService: AmenitiesService, private editor: EditorComponent) {
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

  create(): void {
    this.amenitiesService.authenticationState().subscribe(user => {
      if (user != null) {
        this.editor.open();
      }
    });
  }
}
