import {Component, OnInit} from '@angular/core';
import {AmenitiesService} from "./amenities.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Amenities';
  signedIn = false;
  user = null;

  constructor(private amenitiesService: AmenitiesService) {
  }

  ngOnInit() {
    this.amenitiesService
      .authenticationState()
      .subscribe(user => {
        this.user = user;
        this.signedIn = (user != null)
      });
  }

  computeLock(): string {
    return this.signedIn ? 'lock_open' : 'lock';
  }

  signIn(): void {
    if (!this.signedIn) {
      this.amenitiesService.login();
    }
  }

  signOut(): void {
    if (this.signedIn) {
      this.amenitiesService.logout();
    }
  }
}
