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
  public listName: string;

  constructor(public amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.amenitiesService
      .authenticationState()
      .subscribe(user => {
        this.user = user;
        this.signedIn = (user != null)

        this.amenitiesService.listName()
          .subscribe(listName => {
            if (listName) {
              this.listName = (<string>listName);

              this.amenitiesService.getArticlesForCurrentUser(this.listName)
                .subscribe(articles => this.userArticlesCount = articles.length)
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
    this.amenitiesService.add(article);
  }
}

