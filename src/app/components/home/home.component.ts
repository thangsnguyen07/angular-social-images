import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/types/post';
import { User } from 'src/app/types/user';

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
    this.subscription = this.postService.posts.subscribe((posts: Post[]) => {
      posts.forEach(async (post: Post) => {
        const populatedPost = await this.postService.populatePost(post);
        this.posts.push(populatedPost);
      });
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  faFlus = faPlus;
}
