import { Component, OnInit, Renderer2 } from '@angular/core';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isOpenSidebar: boolean = false;
  isOpenNotification: boolean = false;

  notificationClick: boolean = false;
  constructor(private authService: AuthService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.notificationClick) {
        this.isOpenNotification = false;
      }
      this.notificationClick = false;
    });
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  signOut() {
    this.authService.signOut();
  }

  // Notification
  toggleNotification() {
    this.isOpenNotification = !this.isOpenNotification;
  }
  preventCloseOnClick() {
    this.notificationClick = true;
  }

  faBars = faBars;
  faBell = faBell;
}
