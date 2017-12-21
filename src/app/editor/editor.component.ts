import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editor',
  styles: [`
    :host {
      display: none;
      position: absolute;
      overflow: hidden;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
    
    #tempText {
      display: flex;
      align-items: center;
      justify-content: center;
    }

  `
  ],
  template: `
    <div id="background" [ngStyle]="backgroundStyle">
      <p id="tempText">
        editor works!
      </p>
      <div class="controls">
        <button mat-button (click)="delete">Delete</button>
        <button mat-button (click)="save">Done</button>
      </div>
    </div>

  `
})
export class EditorComponent implements OnInit {

  private opened: boolean;
  @Input() article: object;

  @Output() articleChange = new EventEmitter<object>();

  private backgroundStyle: object;
  @HostBinding('style.background-color') color: string;
  @HostBinding('style.display') display: string;

  constructor() {
    this.opened = false;
  }

  ngOnInit() {
  }

  open() {
    this.opened = true;
    this.backgroundStyle = {
      'display': 'block',
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': '256px',
      'height': '256px',
      'background-color': 'rgba(62, 66, 181, 0.66)',
      'transition': '.3s background ease',
      'outline': 'none'
    };
    this.color = 'rgba(62, 66, 181, 0.66)';
    this.display = 'block';
    console.log("opened the editor");
  }
}
