import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {BuySharesDialogComponent} from '../buy-shares-dialog/buy-shares-dialog.component';
import {SellSharesDialogComponent} from '../sell-shares-dialog/sell-shares-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  panama: string;
}

export interface DialogData {
  id: string;
  amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', panama: 'xDLol'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', panama: 'xDLol'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', panama: 'xDLol'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', panama: 'xDLol'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', panama: 'xDLol'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', panama: 'xDLol'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', panama: 'xDLol'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', panama: 'xDLol'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', panama: 'xDLol'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', panama: 'xDLol'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', panama: 'xDLol'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', panama: 'xDLol'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', panama: 'xDLol'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', panama: 'xDLol'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', panama: 'xDLol'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', panama: 'xDLol'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', panama: 'xDLol'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', panama: 'xDLol'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', panama: 'xDLol'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', panama: 'xDLol'},
];

@Component({
  selector: 'app-table-shares',
  templateUrl: './table-shares.component.html',
  styleUrls: ['./table-shares.component.scss']
})
export class TableSharesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'panama'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openBuyDialog(): void {
    const dialogRef = this.dialog.open(BuySharesDialogComponent, {
      width: '500px',
      data: {id: '123', amount: '1000€'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openSellDialog(): void {
    const dialogRef = this.dialog.open(SellSharesDialogComponent, {
      width: '500px',
      data: {id: '123', amount: '1000€'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
