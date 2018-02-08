import {Component, OnInit, ViewChild} from '@angular/core';
import {AmenitiesService} from "./amenities.service";
import {EditorComponent} from "./editor/editor.component";
import {Article} from "./article";
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public signedIn = false;
  public isAdmin: boolean;
  public user = null;
  public sideNavToggle: boolean;
  public userArticlesCount: number;
  public listNames: Observable<String[]>;
  public selectedList: string;

  constructor(public amenitiesService: AmenitiesService, private router: Router) {
    this.isAdmin = true;
  }

  ngOnInit() {
    this.amenitiesService
      .authenticationState()
      .subscribe(user => {
        this.user = user;
        this.signedIn = (user != null);

        this.amenitiesService.listName()
          .subscribe((listName: string) => {
            if (listName) {
              this.selectedList = listName;

              this.amenitiesService.getArticlesForCurrentUser(this.selectedList)
                .subscribe(articles => this.userArticlesCount = articles.length);
            }
          });

        this.listNames = this.amenitiesService.listNames()
          .take(1)
          .map(changes => changes.map(c => c.key));
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

  toggleSidenav(): void {
    this.sideNavToggle = !this.sideNavToggle;
  }

  setSelectedList(list: string){
    this.selectedList = list;
  }
}

