import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
@Injectable()
export class NotificationService {

  constructor(public notifications: NotificationsService) { }

  sendNotification(title: string, content: string) {
    this.notifications.success(
      title,
      content,
      {
          timeOut: 2000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 1000,

      }
    );
   }

}
