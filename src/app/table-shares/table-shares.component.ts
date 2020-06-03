import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {BuySharesDialogComponent} from '../buy-shares-dialog/buy-shares-dialog.component';
import {SellSharesDialogComponent} from '../sell-shares-dialog/sell-shares-dialog.component';
import {LocalStorageService} from '../localStorage/local-storage.service';
import {FirestoreService} from '../firestore/firestore.service';
import {FinnhubbClientService} from '../finnhubClientService/finnhubb-client.service';

export interface TableData {
  logo: string;
  symbol: string;
  name: string;
  cot: number;
  maxValue: number;
  minValue: number;
  lastClosed: number;
  opening: number;
  rentabilidad: number;
  nshares: number;
}

@Component({
  selector: 'app-table-shares',
  templateUrl: './table-shares.component.html',
  styleUrls: ['./table-shares.component.scss']
})

export class TableSharesComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'panama'];
  displayedColumns: string[] = ['logo', 'symbol', 'name', 'cot', 'maxValue', 'minValue', 'lastClosed', 'opening', 'rentabilidad'];
  dataSource = new MatTableDataSource<TableData>();
  userId: string;
  ownedShares: any;
  tableData: TableData[] = [];
  symbol: string[] = [];
  total: number;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private firestoreService: FirestoreService,
    private finnhubService: FinnhubbClientService,
  ) {
    this.total = 0;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.userId = this.localStorageService.getUserid();
    this.fillTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openBuyDialog(): void {
    const dialogRef = this.dialog.open(BuySharesDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fillTable();
    });
  }

  openSellDialog(): void {
    const dialogRef = this.dialog.open(SellSharesDialogComponent, {
      width: '500px',
      data: {id: '123', amount: '1000€'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private fillTable() {
    this.firestoreService.getUser(this.userId).subscribe((data) => {
      this.ownedShares = data.payload.data()['ownedShares'];
      this.ownedShares.forEach((share) => {
        const s1 = this.finnhubService.getCompanySharesValue(share.symbol).subscribe(( data ) => {
          const s2 = this.finnhubService.getCompanyInfo(share.symbol).subscribe(( data2 ) => {
            if (!this.symbol.includes(share.symbol)){
              this.symbol.push(share.symbol);
              let rentabilidad = share.numberOfShares * data['c'];
              rentabilidad -= share.purchaseCost;
              this.total += rentabilidad;
              this.tableData.push({
                logo: data2['logo'],
                symbol: share.symbol,
                name: data2['name'],
                cot: data['c'],
                maxValue: data['h'],
                minValue: data['l'],
                lastClosed: data['pc'],
                opening: data['o'],
                rentabilidad: rentabilidad,
                nshares: share.numberOfShares,
              });
              s2.unsubscribe();
              this.dataSource = new MatTableDataSource<TableData>(this.tableData);
            }
            s1.unsubscribe();
          });
        });
      });
    });
  }
}
