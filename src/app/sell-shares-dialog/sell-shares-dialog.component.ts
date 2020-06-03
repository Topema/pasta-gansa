import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TableData} from '../table-shares/table-shares.component';
import {LocalStorageService} from '../localStorage/local-storage.service';
import {FirestoreService} from '../firestore/firestore.service';

@Component({
  selector: 'app-sell-shares-dialog',
  templateUrl: './sell-shares-dialog.component.html',
  styleUrls: ['./sell-shares-dialog.component.scss']
})
export class SellSharesDialogComponent implements OnInit {
  userInfo: any;
  sellDate: any;
  userId: string;
  sellAtPrice: number;

  constructor(
    public dialogRef: MatDialogRef<SellSharesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableData,
    private localStorageService: LocalStorageService,
    private firestoreService: FirestoreService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.userId = this.localStorageService.getUserid();
  }

  setDate(event: any) {
    this.sellDate = event.target.value;
  }

  purchaseShares() {
    const date = new Date(this.sellDate);
    const currentDate = new Date();
    if (isNaN(date.getTime()) || date.getTime() < currentDate.getTime()) {
      alert('Debes introducir una fecha válida y posterior a la actual');
    } else if(this.sellAtPrice < (this.data.minValue * this.data.nshares) || this.sellAtPrice > this.data.maxValue * this.data.nshares) {
      alert('No se acepta que vendas las acciones por encima o por debajo de los límites máximo y mínimo');
    } else {
      const confirmed = confirm('Se ejecutará la venta, no hay pasarela de pago así que nos quedamos con tu pasta :)');
      if (confirmed) {
        const editSubscribe = this.firestoreService.getUser(this.userId).subscribe((user) => {
          let isNew = true;
          this.userInfo = user.payload.data();
          this.userInfo.ownedShares.forEach((ownedShare) => {
            if (ownedShare.symbol === this.data.symbol) {
              ownedShare.sellDate = date;
              ownedShare.sellAtPrice = this.sellAtPrice;
              isNew = false;
              return;
            }
          });
          this.firestoreService.updateUser(this.userId, this.userInfo);
          editSubscribe.unsubscribe();
        });
        this.dialogRef.close();
      }
    }
  }

  setSellPrice(event: any){
    this.sellAtPrice = event.target.value;
  }
}
