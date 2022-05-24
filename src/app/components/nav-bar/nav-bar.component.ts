import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isOpenSidebar = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('render');
  }

  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  signOut() {
    this.authService.signOut();
  }

  faBars = faBars;
}
