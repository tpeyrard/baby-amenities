import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-editor',
  styles: [`
    :host {
      display: none;
      position: absolute;
      overflow: hidden;
      top: 46px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    :host([opened]) {
      display: block;
    }
  `
  ],
  template: `
    <p>
      editor works!
    </p>
  `
})
export class EditorComponent implements OnInit {

  public opened: boolean;
  public note: object;

  constructor() {
    this.opened = false;
  }

  ngOnInit() {
  }

  open() {
    this.opened = true;
  }
}
