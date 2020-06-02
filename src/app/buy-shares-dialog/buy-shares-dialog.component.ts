import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../table-shares/table-shares.component';

@Component({
  selector: 'app-buy-shares-dialog',
  templateUrl: './buy-shares-dialog.component.html',
  styleUrls: ['./buy-shares-dialog.component.scss']
})
export class BuySharesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BuySharesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
