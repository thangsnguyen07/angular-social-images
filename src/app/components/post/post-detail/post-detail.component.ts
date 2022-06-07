import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDownload, faHeart, faLink } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  id!: string;
  post?: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.postService.getPost(this.id).subscribe((result) => {
        if (result) {
          this.post = result;
        }
      });
    });

    console.log(this.post);
    // this.posts = this.postService.posts;
    // console.log(this.posts);
  }

  downloadIcon = faDownload;
  copyIcon = faLink;
  heartIcon = faHeart;
}
