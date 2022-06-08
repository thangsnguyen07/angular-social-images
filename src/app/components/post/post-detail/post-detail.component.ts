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
      this.postService.getPost(this.id).subscribe(async (result) => {
        if (result) {
          const populatedPost: Post = await this.postService.populatePost(
            result
          );
          this.post = populatedPost;
        }
      });
    });
  }

  downloadIcon = faDownload;
  copyIcon = faLink;
  heartIcon = faHeart;
}
