import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-created',
  templateUrl: './post-created.component.html',
  styleUrls: ['./post-created.component.scss'],
})
export class PostCreatedComponent implements OnInit {
  posts: any[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.posts = this.postService.posts.slice(0, 10);
  }
}
