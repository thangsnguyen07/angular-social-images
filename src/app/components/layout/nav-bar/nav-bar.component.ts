import { Component, OnInit, Renderer2 } from '@angular/core';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/types/notification';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isOpenSidebar: boolean = false;
  isOpenNotification: boolean = false;
  notificationClick: boolean = false;

  notificationBadge: number = 0;

  currentUser: any;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.notificationClick) {
        this.isOpenNotification = false;
      }
      this.notificationClick = false;
    });

    this.authService.isAuth.subscribe((status) => {
      if (status == true) {
        this.currentUser = this.authService.currentUser;
      }
    });
  }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((val) => {
      val.forEach((item) => {
        const notification: Notification =
          item.payload.doc.data() as Notification;
        if (!notification.isSeen) {
          this.notificationBadge++;
        }
      });
    });
  }

  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  signOut() {
    this.authService.signOut();
  }

  // Notification
  toggleNotification() {
    this.isOpenNotification = !this.isOpenNotification;

    if (this.isOpenNotification) {
      this.notificationBadge = 0;
    }
  }
  preventCloseOnClick() {
    this.notificationClick = true;
  }

  faBars = faBars;
  faBell = faBell;
}
