import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.posts.subscribe((val) => (this.posts = val));
  }

  faFlus = faPlus;
}
