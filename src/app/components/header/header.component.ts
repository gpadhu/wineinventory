import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { LoadingBarModule } from 'ng2-loading-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public primary: boolean = true;
  constructor(public af: AngularFire,
              public router: Router,
              public notification: NotificationService){}

  logout() {
    this.af.auth.logout();
    this.router.navigate(['/login']);
    this.notification.sendNotification('Logged Out!', 'Successfully logged out.');
  }

}
