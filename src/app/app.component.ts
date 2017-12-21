import {Component, OnInit, ViewChild} from '@angular/core';
import {AmenitiesService} from "./amenities.service";
import {EditorComponent} from "./editor/editor.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(EditorComponent) editor: EditorComponent;

  title = 'Amenities';
  signedIn = false;
  user = null;
  editableArticleId: number;

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

  create(): void {
    if (this.signedIn) {
      this.editableArticleId = null;
      this.editor.open();
    }
  }
}

