import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  template: `
    <mat-sidenav-container class="nav-container">
    <mat-sidenav #sidenav mode="side" [opened]="true" class="sidenav"
                 [fixedInViewport]="false">
      My account settings
    </mat-sidenav>

    <mat-sidenav-content class="nav-content">
      <p>It works</p>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [
    `.nav-content {
    padding: 8px 36px;
    box-sizing: border-box;
  }

  .nav-container {
    position: absolute;
    top: 60px;
    bottom: 60px;
    left: 0;
    right: 0;
  }

  .sidenav {
    display: flex;
    padding: 8px;
    align-items: center;
    justify-content: center;
    width: 200px;
    box-shadow: 3px 0 6px rgba(0, 0, 0, .24);
  }
  `]
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
