import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-follower-card',
  templateUrl: './follower-card.component.html',
  styleUrls: ['./follower-card.component.scss'],
})
export class FollowerCardComponent implements OnInit {
  @Output() onNavigate: EventEmitter<void> = new EventEmitter();
  @Input() follower!: User;

  isFollow: boolean = false;
  isMe: boolean = false;
  constructor(private followService: FollowService, private router: Router) {}

  ngOnInit(): void {
    this.isFollow = this.followService.checkFollow(this.follower.uid);
    this.isMe = this.followService.checkFollowSelf(this.follower.uid);
  }

  goToProfile() {
    this.router.navigateByUrl(`profile/${this.follower.username}`);

    // close follower popup
    this.onNavigate.emit();
  }
}
