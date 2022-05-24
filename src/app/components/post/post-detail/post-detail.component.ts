import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDownload, faLink } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  id!: string;
  post: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.post = this.postService.getPost(this.id);
    });
  }

  downloadIcon = faDownload;
  copyIcon = faLink;
}
