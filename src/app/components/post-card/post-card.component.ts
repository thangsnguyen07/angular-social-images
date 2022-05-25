import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logPost() {
    console.log(this.post.name);
  }

  goToPost(): void {
    this.router.navigateByUrl(`/post/${this.post.id}`);
  }

  heartIcon = faHeart;
}
