import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SimpleNotificationsComponent } from 'angular2-notifications';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public options = {
  position: ['bottom', 'right'],
  timeOut: 5000,
  lastOnBottom: true
  }
}
