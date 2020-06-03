import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private cookieService: CookieService) { }

  public logUser(userCollection: string) {
    this.cookieService.set('userId', userCollection);
  }

  public getUserid() {
    return this.cookieService.get('userId');
  }

  public deleteCookie() {
    this.cookieService.delete('userId');
    console.log(this.cookieService.get('userId'));
  }
}
