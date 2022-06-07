import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-liked',
  templateUrl: './post-liked.component.html',
  styleUrls: ['./post-liked.component.scss'],
})
export class PostLikedComponent implements OnInit {
  posts: any[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.posts = this.postService.posts.slice(10, 20);
  }
}
