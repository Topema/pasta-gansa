import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-sell-shares-dialog',
  templateUrl: './sell-shares-dialog.component.html',
  styleUrls: ['./sell-shares-dialog.component.scss']
})
export class SellSharesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SellSharesDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
