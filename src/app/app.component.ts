import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amenities';
  signedIn = false;
  computeLock() : string {
    return this.signedIn ? 'lock' : 'lock_open';
  }

  login(): void {
    this.signedIn = true;
    console.log("Login: " + this.signedIn);
  }
}
