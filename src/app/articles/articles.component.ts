import {Component, OnInit, ViewChild} from '@angular/core';
import {AmenitiesService} from "../amenities.service";
import {Observable} from "rxjs/Observable";
import {Article, CAT_TO_IMAGE} from "../article";
import {ActivatedRoute, Params} from "@angular/router";
import {EditorComponent} from "../editor/editor.component";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [``]
})
export class ArticlesComponent implements OnInit {
  @ViewChild(EditorComponent) editor: EditorComponent;

  public articles: Observable<Article[]>;
  public isAdmin: boolean;
  private selectedList: string;

  constructor(private amenitiesService: AmenitiesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedList = params['listName'];
      this.articles = this.amenitiesService.getArticles(this.selectedList);
      this.amenitiesService.isAdmin(this.selectedList).subscribe(admin => this.isAdmin = admin); // TODO replace by switchMap
    });
  }

  addToCart(article: Article) {
    if (this.selectedList) {
      this.amenitiesService.moveToUserCart(this.selectedList, article);
    }
  }

  removeArticle(id: string) {
    if (this.selectedList && this.isAdmin) {
      this.amenitiesService.remove(this.selectedList, id);
    }
  }

  create(): void {
    if (this.isAdmin) {
      this.editor.open();
    }
  }

  persist(article: Article) {
    this.amenitiesService.add(article, this.selectedList);
  }

  getImage(article: Article): string {
    return article.image || CAT_TO_IMAGE[article.category] || CAT_TO_IMAGE['jouet']
  }
}
