import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirestoreService} from '../firestore/firestore.service';
import {LocalStorageService} from '../localStorage/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userNameValue: string;
  passwordValue: string;
  fail: boolean;

  constructor(
    private firestoreService: FirestoreService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fail = false;
    if (this.localStorageService.getUserid() !== ''){
      this.router.navigate(['/miCartera']);
    }
  }

  logUser() {
    this.firestoreService.getUsers().subscribe((userSnapshots) => {
      userSnapshots.forEach((user: any) => {
        const userInfo = {
          id: user.payload.doc.data().id,
          userName: user.payload.doc.data().userName,
          password: user.payload.doc.data().password,
        };
        if (userInfo.userName === this.userNameValue){
          if (userInfo.password === this.passwordValue){
            this.localStorageService.deleteCookie();
            this.localStorageService.logUser(userInfo.id);
            this.router.navigate(['/miCartera']);
          }else{
            this.fail = true;
          }
        }else{
          this.fail = true;
        }
      });
    });
  }

  userNameValueChanges(event: any) {
    this.userNameValue = event.target.value;
  }

  passwordValueChanges( event: any) {
    this.passwordValue = event.target.value;
  }
}
