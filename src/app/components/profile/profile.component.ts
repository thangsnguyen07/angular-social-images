import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username!: string;
  isOpenFollowers: boolean = false;
  userSubscription!: Subscription;

  user?: User;
  isMe: boolean = false;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.username = params['username'];

      this.userSubscription = this.authService
        .getUserByUsername(this.username)
        .subscribe(async (users: any[]) => {
          if (users.length > 0) {
            this.user = users[0];

            this.isMe =
              this.user?.uid == this.authService.currentUser?.uid
                ? true
                : false;
          }
        });
    });
  }

  handleFollow() {
    this.followService.followUser(this.authService.currentUser!, this.user!); // user send follow, user receive follow
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toggleOpenFollowers() {
    this.isOpenFollowers = !this.isOpenFollowers;
  }

  faPlus = faPlus;
}
