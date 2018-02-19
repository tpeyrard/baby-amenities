import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AmenitiesService} from './amenities.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public signedIn = false;
  public user = null;
  public sideNavToggle: boolean;
  public userArticlesCount = 0;
  public listNames: Observable<String[]>;
  public selectedList: string;

  constructor(public amenitiesService: AmenitiesService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.amenitiesService
      .authenticationState()
      .subscribe(user => {
        this.user = user;
        this.signedIn = (user != null);

        this.listNames = this.amenitiesService.listNames()
          .take(1)
          .map(changes => changes.map(c => c.key));

        this.amenitiesService.listNames()
          .map(changes => changes.map(c => c.key))
          .subscribe(lists => lists
            .map(list => this.amenitiesService.getArticlesForCurrentUser(list).take(1)
              .subscribe(articles => {
                return this.userArticlesCount += articles.length; //TODO fix me
              })));

        this.amenitiesService.selectedList().subscribe(listname => {
          return this.selectedList = listname;
        });

      });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
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
}

