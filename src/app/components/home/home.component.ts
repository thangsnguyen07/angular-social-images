import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  subscription?: Subscription;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.subscription = this.postService.posts.subscribe((val) => {
      val.forEach(async (item) => {
        let post: Post = item.payload.doc.data();
        const populatedPost = await this.postService.populatePost(post);
        this.posts.push(populatedPost);
      });
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
