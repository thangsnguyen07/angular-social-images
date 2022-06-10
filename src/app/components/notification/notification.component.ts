import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/types/notification';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notificationsSubscription!: Subscription;

  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.notificationsSubscription = this.notificationService
      .getNotifications()
      .subscribe((val) => {
        val.forEach(async (item) => {
          let notification: Notification =
            item.payload.doc.data() as Notification;

          notification = await this.notificationService.populateNotification(
            notification
          );

          if (!notification.isSeen) {
            this.notificationService.seenNotification(notification.id);
          }

          this.notifications.unshift(notification);
        });
      });
  }

  ngOnDestroy() {
    this.notificationsSubscription.unsubscribe();
  }
}
