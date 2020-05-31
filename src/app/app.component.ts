import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger( 'container-animations', [
        state('login-desktop', style({
          height: '50vh',
        }))
      ]
    )
  ]
})
export class AppComponent {
  title = 'PastaGansa';
}
