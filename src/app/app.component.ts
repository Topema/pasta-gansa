import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, query, animateChild, group,
  // ...
} from '@angular/animations';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger( 'container-animations', [
      state('login',
        style({
          height: '60%',
          width: '27%'
        })
      ),
      state('miCartera',
        style({
          height: '95%',
          width: '90%',
        })),
      transition('login => miCartera', [
        style({
          opacity: '0',
        }),
        animate('1s', style({opacity: '1', height: '90%', width: '90%'}))
      ]),
      transition('miCartera => *', [
        style({
          opacity: '0',
        }),
        animate('1s', style({opacity: '1', height: '60%', width: '27%'}))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'PastaGansa';
  displayContent: string;

  animStart(event) {
    this.displayContent = 'none';
  }

  animDone(event) {
    this.displayContent = 'block';
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
