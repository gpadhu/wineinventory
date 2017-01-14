import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { LoadingBarService } from 'ng2-loading-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public af: AngularFire,
              public router: Router,
              public notification: NotificationService,
              public loadingbar: LoadingBarService) { }

  login(email: string, password: string) {
    this.loadingbar.start();
    let logon = this.af.auth.login({ email: email, password: password});
    logon.then(() => {
      this.router.navigate(['/store']);
      this.notification.sendNotification('Logged in!', 'Successfully loggedin. Welcome.');
      this.loadingbar.complete();
    }).catch(() => {
      this.loadingbar.stop();
      this.notification.sendNotification('Sorry!', 'Please check in your email and password and try again');
    });
  }

}
