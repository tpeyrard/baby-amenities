import {Component, OnInit, ViewChild} from '@angular/core';
import {AmenitiesService} from "./amenities.service";
import {EditorComponent} from "./editor/editor.component";
import {Article} from "./article";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(EditorComponent) editor: EditorComponent;

  signedIn = false;
  user = null;
  public userArticlesCount: number;
  public listNames: string[];
  public selectedList: string;

  constructor(public amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.amenitiesService
      .authenticationState()
      .subscribe(user => {
        this.user = user;
        this.signedIn = (user != null);

        this.amenitiesService.listName()
          .subscribe(listName => {
            if (listName) {
              this.selectedList = (<string>listName);

              this.amenitiesService.getArticlesForCurrentUser(this.selectedList)
                .subscribe(articles => this.userArticlesCount = articles.length)
            }
          });

        this.amenitiesService.listNames()
          .subscribe(listNames => {
            if (listNames) {
              this.listNames = (<string[]>listNames);
            }
          });

      });


  }

  computeLock(): string {
    return this.signedIn ? 'lock_open' : 'lock';
  }

  signInOrOut(): void {
    if (!this.signedIn) {
      this.amenitiesService.login();
    } else {
      this.signOut()
    }
  }

  signOut(): void {
    if (this.signedIn) {
      this.amenitiesService.logout();
    }
  }

  create(): void {
    if (this.signedIn) {
      this.editor.open();
    }
  }

  persist(article: Article) {
    this.amenitiesService.add(article, this.selectedList);
  }
}

