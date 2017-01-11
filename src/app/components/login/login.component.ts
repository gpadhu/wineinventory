import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private showError: boolean = true;
  constructor(public af: AngularFire, public router: Router, public notification: NotificationService) { }

  login(email: string, password: string) {
    let logon = this.af.auth.login({ email: email, password: password});
    logon.then(() => {
      this.router.navigate(['/store']);
      this.notification.sendNotification('Logged in!', 'Successfully loggedin. Welcome.');
    }).catch(() => this.showError = false);
  }

}
