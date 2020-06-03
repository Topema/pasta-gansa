import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinnhubbClientService {
  token: string;

  constructor(private http: HttpClient) {
    this.token = environment.finnhubToken;
  }

  getAllCompanySymbols(){
    return this.http.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=' + this.token);
  }

  getCompanySharesValue(symbol: string){
    return this.http.get('https://finnhub.io/api/v1/quote?symbol=' + symbol.toUpperCase() + '&token=' + this.token);
  }

  getCompanyInfo(symbol: string){
    return this.http.get('https://finnhub.io/api/v1/stock/profile2?symbol=' + symbol.toUpperCase() + '&token=' + this.token);
  }
}
