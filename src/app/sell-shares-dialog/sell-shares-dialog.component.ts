import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../table-shares/table-shares.component';

@Component({
  selector: 'app-sell-shares-dialog',
  templateUrl: './sell-shares-dialog.component.html',
  styleUrls: ['./sell-shares-dialog.component.scss']
})
export class SellSharesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SellSharesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
