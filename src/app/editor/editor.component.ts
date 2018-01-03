import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Article, CATEGORIES} from "../article";

@Component({
  selector: 'app-editor',
  styles: [``],
  template: ``
})
export class EditorComponent implements OnInit {

  @Input() article: Article;
  @Output() articleChange = new EventEmitter<Article>();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  open(): void {
    let dialogRef = this.dialog.open(DialogOverview, {
      width: '400px',
      data: new Article()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.article = result;
        this.articleChange.emit(result);
      }
    });
  }
}

@Component({
  selector: 'dialog-overview',
  template: `
    <h1 mat-dialog-title>Add a new article</h1>
    <div mat-dialog-content>
      <mat-form-field style="width: 100%">
        <mat-label>Name</mat-label>
        <input matInput tabindex="1" [(ngModel)]="article.name" placeholder="Name" required>
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Size</mat-label>
        <input matInput tabindex="2" [(ngModel)]="article.size" placeholder="Size">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Value / Price</mat-label>
        <input matInput tabindex="3" [(ngModel)]="article.value" placeholder="Value">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-select tabindex="4" placeholder="Category" [(ngModel)]="article.category" name="food">
          <mat-option *ngFor="let category of categories" [value]="category.value">
            {{category.viewValue}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Image URL</mat-label>
        <input matInput tabindex="5" [(ngModel)]="article.image" placeholder="Image">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Description</mat-label>
        <textarea matInput tabindex="6" [(ngModel)]="article.desc"
                  placeholder="Description" matTextareaAutosize matAutosizeMinRows="2" matAutosizeMaxRows="5">
          
        </textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions fxLayoutAlign="center">
      <button mat-button color="primary" [mat-dialog-close]="article" tabindex="6">Create</button>
      <button mat-button color="warn" (click)="onNoClick()" tabindex="-1">Cancel</button>
    </div>
  `,
})
export class DialogOverview {

  public categories = CATEGORIES;

  constructor(public dialogRef: MatDialogRef<DialogOverview>, @Inject(MAT_DIALOG_DATA) public article: Article) {
  }

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }

  closeDialog(): void {
    this.dialogRef.close(this.article);
  }
}
