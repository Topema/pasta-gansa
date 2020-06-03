import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FinnhubbClientService} from '../finnhubClientService/finnhubb-client.service';
import {FirestoreService} from '../firestore/firestore.service';
import {LocalStorageService} from '../localStorage/local-storage.service';

@Component({
  selector: 'app-buy-shares-dialog',
  templateUrl: './buy-shares-dialog.component.html',
  styleUrls: ['./buy-shares-dialog.component.scss']
})
export class BuySharesDialogComponent implements OnInit {
  companyInfo: any;
  companyValues: any;
  purchaseDate: any;
  shareNumber: any;
  totalCost: number;
  userId: string;
  private symbol: string;
  userInfo: any;

  constructor(
    public dialogRef: MatDialogRef<BuySharesDialogComponent>,
    private funnhubService: FinnhubbClientService,
    private firestoreService: FirestoreService,
    private localStorageService: LocalStorageService,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userId = this.localStorageService.getUserid();
  }

  searchSymbol(event: any) {
    this.symbol = event.target.value;
    const s = this.funnhubService.getCompanyInfo(this.symbol).subscribe((data: any) => {
      console.log('ok')
      if (data === {}) {
        this.companyInfo = undefined;
      } else {
        this.companyInfo = data;
      }
      s.unsubscribe();
    });

    const s1 = this.funnhubService.getCompanySharesValue(event.target.value).subscribe((data: any) => {
      console.log('ok')
      if (data === {}) {
        this.companyValues = undefined;
        this.refreshTotalCost();
      } else {
        this.companyValues = data;
        this.refreshTotalCost();
      }
      s1.unsubscribe();
    });
  }

  setDate(event: any) {
    this.purchaseDate = event.target.value;
  }

  setShareNumber(event: any) {
    this.shareNumber = event.target.value;
    this.refreshTotalCost();
  }

  refreshTotalCost() {
    if (this.shareNumber > 0 && this.companyValues !== undefined) {
      this.totalCost = this.shareNumber * this.companyValues.c;
    } else {
      this.totalCost = 0;
    }
  }

  purchaseShares() {
    // const date = new Date(this.purchaseDate);
    const currentDate = new Date();
    if (this.companyInfo === undefined) {
      alert('Debes introducir un symbol de compañía válido');
    } else if (this.shareNumber <= 0 || this.shareNumber === undefined) {
      alert('Debes introducir un número de acciones de compañía a comprar');
      // } else if (isNaN(date.getTime()) || date.getTime() < currentDate) {
      //  alert('Debes introducir una fecha válida y posterior a la actual');
    } else {
      const confirmed = confirm('Se ejecutará la compra, no hay pasarela de pago así que invita la casa');
      if (confirmed) {
        const editSubscribe = this.firestoreService.getUser(this.userId).subscribe((user) => {
          let isNew = true;
          this.userInfo = user.payload.data();
          this.userInfo.ownedShares.forEach((ownedShare) => {
            if (ownedShare.symbol === this.symbol) {
              ownedShare.numberOfShares += Number(this.shareNumber);
              ownedShare.purchaseDate = currentDate;
              ownedShare.sellDate = currentDate;
              isNew = false;
              return;
            }
          });
          if (isNew) {
            this.userInfo.ownedShares.push({
              numberOfShares: this.shareNumber,
              purchaseDate: currentDate,
              sellDate: currentDate,
              symbol: this.symbol,
              purchaseCost: this.totalCost,
            });
          }
          this.firestoreService.updateUser(this.userId, this.userInfo);
          editSubscribe.unsubscribe();
        });
        this.dialogRef.close();
      }
    }
  }
}
