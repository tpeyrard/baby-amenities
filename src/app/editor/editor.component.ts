import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-editor',
  styles: [``],
  template: ``
})
export class EditorComponent implements OnInit {

  @Input() article: object;
  @Output() articleChange = new EventEmitter<object>();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  open(): void {
    let articleName, articleSize;

    let dialogRef = this.dialog.open(DialogOverview, {
      width: '500px',
      height: '500px',
      data: {name: articleName, articleSize: articleSize}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed.');
      articleSize = result;
    });

    console.log("opened the editor");
  }
}

@Component({
  selector: 'dialog-overview',
  template: `
    <h1 mat-dialog-title>Hi {{data.name}}</h1>
    <div mat-dialog-content>
      <p>What's article size?</p>
      <mat-form-field>
        <input matInput tabindex="1" [(ngModel)]="data.articleSize">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data.animal" tabindex="2">Create</button>
      <button mat-button (click)="onNoClick()" tabindex="-1">Cancel</button>
    </div>
  `,
})
export class DialogOverview {

  constructor(public dialogRef: MatDialogRef<DialogOverview>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
