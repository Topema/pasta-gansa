import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../localStorage/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-global-container',
  templateUrl: './global-container.component.html',
  styleUrls: ['./global-container.component.scss']
})
export class GlobalContainerComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    if (!this.localStorageService.getUserid()){
      this.router.navigate(['/login']);
    }
  }

  logout(): void{
    this.localStorageService.deleteCookie();
    this.router.navigate(['/login']);
  }

}
