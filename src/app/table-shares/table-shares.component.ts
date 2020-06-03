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
import { timer } from 'rxjs';

export interface TableData {
  logo: string;
  symbol: string;
  name: string;
  cot: number;
  maxValue: number;
  minValue: number;
  lastClosed: number;
  opening: number;
  rentabilidad: string;
  nshares: number;
  fechaVenta: any;
  fechaCompra: any;
  precioVenta: number;
}

@Component({
  selector: 'app-table-shares',
  templateUrl: './table-shares.component.html',
  styleUrls: ['./table-shares.component.scss']
})

export class TableSharesComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'symbol', 'name', 'cot', 'nshares', 'lastClosed', 'opening', 'rentabilidad', 'fechaCompra', 'button'];
  dataSource = new MatTableDataSource<TableData>();
  userId: string;
  ownedShares: any;
  tableData: TableData[] = [];
  symbol: string[] = [];
  total: number;


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private source;
  private subscribe;
  private source2;
  private subscribe2;
  public elapsedTime = 0;

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
    this.source = timer(300000, 300000);
    this.subscribe = this.source.subscribe(val => this.fillTable());

    this.source2 = timer(1000, 1000);
    this.subscribe2 = this.source2.subscribe((val) => {
      this.elapsedTime += 1;
      if (this.elapsedTime >= 300){
        this.elapsedTime = 0;
      }
    });
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

  openSellDialog(element: TableData): void {
    const dialogRef = this.dialog.open(SellSharesDialogComponent, {
      width: '500px',
      data: {
        logo: element.logo,
        symbol: element.symbol,
        name: element.name,
        cot: element.cot,
        maxValue: element.maxValue,
        minValue: element.minValue,
        lastClosed: element.lastClosed,
        opening: element.opening,
        rentabilidad: element.rentabilidad,
        nshares: element.nshares,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fillTable();
    });
  }

  private fillTable() {
    console.log('refrescando Tabla');
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
              var purchaseDate = this.timestamptoDate(share.purchaseDate.seconds);
              var sellDate = this.timestamptoDate(share.sellDate.seconds);
              this.tableData.push({
                logo: data2['logo'],
                symbol: share.symbol,
                name: data2['name'],
                cot: data['c'],
                maxValue: data['h'],
                minValue: data['l'],
                lastClosed: data['pc'],
                opening: data['o'],
                rentabilidad: rentabilidad.toFixed(3),
                nshares: share.numberOfShares,
                fechaVenta: sellDate,
                fechaCompra: purchaseDate,
                precioVenta: share.sellAtPrice
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

  timestamptoDate(date) {
    let d = new Date(date * 1000);
    let result = "";
    if (d.getDay() < 10){
      result += '0';
    }
    result += (1*d.getDay()+1) + '/';
    if (d.getMonth() < 10){
      result += '0';
    }
    result += ( 1 * d.getMonth() + 1) + '/' + d.getFullYear();
    return result;
  }
}
